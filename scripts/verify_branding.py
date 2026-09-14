#!/usr/bin/env python3
"""Verify approved source bytes, built assets and public SSR identity. No dependencies.

An HTTP 200 or a correct filename alone is never proof of a correct image.
The checked-in contract pins Git blob identities; reports also include SHA-256.
"""
import argparse
import fnmatch
import hashlib
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import struct
import sys
import time
from urllib.error import HTTPError
from urllib.parse import urljoin, urlparse
from urllib.request import Request, build_opener, HTTPRedirectHandler
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
CONTRACT = json.loads((ROOT / "scripts/branding-contract.json").read_text())
MAX_BYTES = 2 * 1024 * 1024


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def git_hash(data):
    return hashlib.sha1(b"blob " + str(len(data)).encode() + b"\0" + data).hexdigest()


def verify_cache(headers, immutable):
    tokens = {x.strip().lower() for x in headers.get("cache-control", "").split(",")}
    expected = {"public", "max-age=31536000", "immutable"} if immutable else {
        "public", "max-age=0", "must-revalidate"
    }
    require(expected <= tokens, f"Incorrect cache policy: {tokens}")
    require(not ({"no-store", "private"} & tokens), "Conflicting cache policy")
    ages = {x for x in tokens if x.startswith("max-age=")}
    require(len(ages) == 1, "Conflicting max-age directives")
    require(immutable or "immutable" not in tokens, "Mutable alias is immutable")


def verify_manifest(data):
    manifest = json.loads(data)
    require(manifest["name"] == "Proof & State", "Wrong manifest brand")
    require(manifest["id"] == "/" and manifest["scope"] == "/", "Wrong manifest scope")
    require(manifest["display"] == "browser", "Do not imply an offline/PWA product")
    expected = [
        {"src": f"/brand/v1/icon-{size}.png", "sizes": f"{size}x{size}",
         "type": "image/png", "purpose": "any"} for size in (192, 512)
    ]
    require(manifest["icons"] == expected, "Wrong or missing manifest icons")


def verify_asset(item, data, headers=None):
    path = item["path"]
    require(git_hash(data) == item["git_blob_sha"], f"{path}: unapproved/stale asset bytes")
    kind = item["format"]
    if kind == "png":
        require(data[:8] == b"\x89PNG\r\n\x1a\n" and data[12:16] == b"IHDR", f"{path}: not PNG")
        require(list(struct.unpack(">II", data[16:24])) == item["size"], f"{path}: wrong dimensions")
    elif kind == "ico":
        require(data[:4] == b"\0\0\1\0", f"{path}: not ICO")
        count = struct.unpack_from("<H", data, 4)[0]
        require(0 < count <= 16 and len(data) >= 6 + count * 16, "Invalid ICO directory")
        sizes = []
        for index in range(count):
            offset = 6 + 16 * index
            width, height = data[offset] or 256, data[offset + 1] or 256
            length, start = struct.unpack_from("<II", data, offset + 8)
            require(start >= 6 + count * 16 and start + length <= len(data), "Invalid ICO frame")
            sizes.append([width, height])
        require(sorted(sizes) == sorted(item["sizes"]), "Wrong ICO sizes")
    elif kind == "svg":
        svg = ET.fromstring(data)
        require(svg.tag == "{http://www.w3.org/2000/svg}svg", "Not an SVG document")
        require(svg.attrib.get("viewBox") == "0 0 96 96", "Wrong mark geometry")
    elif kind == "manifest":
        verify_manifest(data)
    if headers is not None:
        mime = headers.get("content-type", "").split(";")[0].lower()
        require(mime in item["mime"], f"{path}: wrong MIME type {mime}")
        require(headers.get("x-content-type-options") == "nosniff", f"{path}: missing nosniff")
        verify_cache(headers, item["immutable"])
    return {"path": path, "bytes": len(data), "git_blob_sha": git_hash(data),
            "sha256": hashlib.sha256(data).hexdigest()}


class Head(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.in_head = False
        self.links = []
        self.meta = {}
        self.json_ld = []
        self.script = None
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "head":
            self.in_head = True
        if not self.in_head:
            return
        if tag == "link":
            self.links.append(attrs)
        if tag == "meta":
            key = attrs.get("property", attrs.get("name", ""))
            self.meta.setdefault(key, []).append(attrs.get("content", ""))
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.script = ""

    def handle_data(self, text):
        if self.script is not None:
            self.script += text

    def handle_endtag(self, tag):
        if tag == "script" and self.script is not None:
            self.json_ld.append(json.loads(self.script))
            self.script = None
        if tag == "head":
            self.in_head = False


def verify_head(html, path):
    head = Head(html)
    identity = [link for link in head.links
                if "icon" in link.get("rel", "") or link.get("rel") == "manifest"]
    require(len(identity) == len(CONTRACT["head_links"]), "Missing or duplicate SSR identity links")
    for expected in CONTRACT["head_links"]:
        require(sum(all(link.get(k) == v for k, v in expected.items()) for link in identity) == 1,
                f"Missing/incorrect SSR link: {expected}")
    canonical = [x.get("href") for x in head.links if x.get("rel") == "canonical"]
    require(canonical == [CONTRACT["origin"] + path], "Wrong canonical URL")
    for key, value in CONTRACT["image_meta"].items():
        require(head.meta.get(key) == [value], f"Missing/duplicate SSR {key}")
    require(head.meta.get("og:url") == canonical, "Wrong og:url")
    nodes = []
    for document in head.json_ld:
        nodes.extend(document.get("@graph", [document]))
    organizations = [x for x in nodes if x.get("@type") == "Organization"]
    require(len(organizations) == 1, "Missing/duplicate organization")
    require(organizations[0].get("logo") == CONTRACT["origin"] +
            "/brand/v1/proof-and-state-mark.svg", "Wrong organization logo")
    return {"path": path, "identity_links": identity, "image": head.meta["og:image"][0]}


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def get(url, agent="ProofAndState-BrandAcceptance/1.0"):
    request = Request(url, headers={"User-Agent": agent, "Accept-Encoding": "identity"})
    try:
        response = build_opener(NoRedirect).open(request, timeout=15)
    except HTTPError as error:
        response = error
    with response:
        body = response.read(MAX_BYTES + 1)
        require(len(body) <= MAX_BYTES, "Response exceeds acceptance size limit")
        return response.status, {k.lower(): v for k, v in response.headers.items()}, body


def read_headers(path, headers_file):
    result = {}
    matches = False
    for line in headers_file.splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if not line[0].isspace():
            matches = fnmatch.fnmatchcase(path, line.strip())
        elif matches:
            key, value = line.strip().split(":", 1)
            key = key.lower()
            require(key not in result, f"Overlapping _headers rules for {path}: {key}")
            result[key] = value.strip()
    return result


def verify_local(directory):
    headers = (directory / "_headers").read_text()
    rows = []
    for item in CONTRACT["assets"]:
        data = (directory / item["path"].lstrip("/")).read_bytes()
        row = verify_asset(item, data)
        expected_headers = read_headers(item["path"], headers)
        verify_cache(expected_headers, item["immutable"])
        require(expected_headers.get("x-content-type-options") == "nosniff", "Missing asset nosniff rule")
        rows.append(row)
    return rows


def verify_origin(origin, www=False):
    result = {"origin": origin, "pages": [], "assets": []}
    agents = ["ProofAndState-BrandAcceptance/1.0", "Googlebot/2.1 (+http://www.google.com/bot.html)"]
    for path in CONTRACT["routes"]:
        for agent in agents:
            status, headers, body = get(origin + path, agent)
            require(status == 200 and "text/html" in headers.get("content-type", ""),
                    f"{path}: not an HTTP 200 HTML page ({status})")
            result["pages"].append({**verify_head(body.decode(), path), "agent": agent})
    hosts = [origin]
    if www:
        require(origin == CONTRACT["origin"], "www checks are only valid for production")
        alternate = "https://www.proofandstate.com"
        for path in CONTRACT["routes"]:
            status, headers, _ = get(alternate + path)
            require(status == 308 and headers.get("location") == origin + path,
                    f"www{path}: incorrect canonical redirect")
        hosts.append(alternate)
    for host in hosts:
        for item in CONTRACT["assets"]:
            url = host + item["path"]
            status, headers, body = get(url)
            if host != origin and status in (301, 308):
                require(headers.get("location") == origin + item["path"], "Unexpected asset redirect")
                status, headers, body = get(headers["location"])
            require(status == 200, f"{url}: HTTP {status}")
            row = verify_asset(item, body, headers)
            result["assets"].append({**row, "url": url, "status": status,
                "content_type": headers.get("content-type"), "cache_control": headers.get("cache-control"),
                "etag": headers.get("etag"), "cf_ray": headers.get("cf-ray")})
    return result


def observe(origin):
    """Read-only baseline, deliberately not labelled acceptance or cache-provider proof."""
    status, headers, body = get(origin + "/")
    head = Head(body.decode())
    rows = []
    paths = {"/favicon.ico"}
    paths.update(x["href"] for x in head.links if "icon" in x.get("rel", "") and x.get("href", "").startswith("/"))
    for path in sorted(paths):
        code, info, data = get(urljoin(origin, path))
        rows.append({"path": path, "status": code, "git_blob_sha": git_hash(data),
                     "sha256": hashlib.sha256(data).hexdigest(), "bytes": len(data),
                     "content_type": info.get("content-type"), "cache_control": info.get("cache-control")})
    return {"kind": "observation_not_acceptance", "status": status, "links": head.links, "assets": rows}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--assets", type=Path)
    parser.add_argument("--origin")
    parser.add_argument("--www", action="store_true")
    parser.add_argument("--observe", action="store_true")
    parser.add_argument("--attempts", type=int, default=1)
    parser.add_argument("--report", type=Path)
    args = parser.parse_args()
    require(args.assets or args.origin, "Provide --assets and/or --origin")
    require(1 <= args.attempts <= 12, "Use 1-12 bounded attempts")
    if args.origin:
        parsed = urlparse(args.origin)
        require(parsed.scheme in ("https", "http") and parsed.hostname and not parsed.username and
                not parsed.password and parsed.path in ("", "/") and not parsed.query and not parsed.fragment,
                "Origin must be a bare HTTP(S) origin without credentials")
        args.origin = args.origin.rstrip("/")
    report = {"revision": CONTRACT["revision"], "commit": os.getenv("GITHUB_SHA"),
              "observed_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())}
    try:
        if args.observe:
            require(args.origin, "Observation requires --origin")
            report["observation"] = observe(args.origin)
        else:
            if args.assets:
                report["local_assets"] = verify_local(args.assets)
            if args.origin:
                for attempt in range(1, args.attempts + 1):
                    try:
                        report["runtime"] = verify_origin(args.origin, args.www)
                        break
                    except Exception as error:
                        if attempt == args.attempts:
                            raise
                        print(f"Acceptance attempt {attempt} failed: {error}; retry in 10s", file=sys.stderr)
                        time.sleep(10)
            report["status"] = "passed"
    except Exception as error:
        report.update(status="failed", error=str(error))
    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))
    return 1 if report.get("status") == "failed" else 0


if __name__ == "__main__":
    sys.exit(main())
