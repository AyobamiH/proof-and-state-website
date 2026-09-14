import html
import importlib.util
import json
from pathlib import Path
import struct
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("branding", ROOT / "scripts/verify_branding.py")
b = importlib.util.module_from_spec(spec)
spec.loader.exec_module(b)


def good_head(path="/"):
    tags = ['<html><head>', f'<link rel="canonical" href="{b.CONTRACT["origin"]}{path}">']
    for link in b.CONTRACT["head_links"]:
        tags.append('<link ' + ' '.join(f'{k}="{html.escape(v, quote=True)}"' for k, v in link.items()) + '>')
    for key, value in {**b.CONTRACT["image_meta"], 'og:url': b.CONTRACT["origin"] + path}.items():
        attr = "name" if key.startswith("twitter:") else "property"
        tags.append(f'<meta {attr}="{key}" content="{html.escape(value, quote=True)}">')
    tags.append('<script type="application/ld+json">' + json.dumps({"@graph": [
        {"@type": "Organization", "logo": b.CONTRACT["origin"] + "/brand/v1/proof-and-state-mark.svg"}
    ]}) + '</script></head><body>Proof &amp; State</body></html>')
    return ''.join(tags)


class BrandingTests(unittest.TestCase):
    def setUp(self):
        self.item = next(x for x in b.CONTRACT["assets"] if x["path"] == "/brand/v1/icon-96.png")
        self.data = (ROOT / "public" / self.item["path"].lstrip('/')).read_bytes()
        self.headers = {"content-type": "image/png", "cache-control": "public, max-age=31536000, immutable",
                        "x-content-type-options": "nosniff"}

    def test_approved_png(self):
        self.assertEqual(b.verify_asset(self.item, self.data, self.headers)["git_blob_sha"], self.item["git_blob_sha"])

    def test_rejects_stale_or_changed_pixels(self):
        changed = bytearray(self.data)
        changed[-1] ^= 1
        with self.assertRaisesRegex(AssertionError, "unapproved/stale"):
            b.verify_asset(self.item, bytes(changed), self.headers)

    def test_rejects_html_fallback_even_when_status_would_be_200(self):
        with self.assertRaises(AssertionError):
            b.verify_asset(self.item, b"<html>Not found</html>", self.headers)

    def test_rejects_wrong_content_type_even_with_correct_bytes(self):
        with self.assertRaisesRegex(AssertionError, "MIME"):
            b.verify_asset(self.item, self.data, {**self.headers, "content-type": "text/html"})

    def test_rejects_wrong_dimensions_even_with_updated_digest(self):
        data = self.data[:16] + struct.pack('>II', 64, 64) + self.data[24:]
        with self.assertRaisesRegex(AssertionError, "dimensions"):
            b.verify_asset({**self.item, "git_blob_sha": b.git_hash(data)}, data)

    def test_requires_nosniff(self):
        with self.assertRaisesRegex(AssertionError, "nosniff"):
            b.verify_asset(self.item, self.data, {**self.headers, "x-content-type-options": ""})

    def test_legacy_alias_revalidates(self):
        b.verify_cache({"cache-control": "public, max-age=0, must-revalidate"}, False)

    def test_rejects_immutable_legacy_alias(self):
        with self.assertRaises(AssertionError):
            b.verify_cache(self.headers, False)

    def test_rejects_conflicting_cache_headers(self):
        with self.assertRaises(AssertionError):
            b.verify_cache({"cache-control": "public, max-age=0, max-age=31536000, immutable"}, True)

    def test_rejects_overlapping_headers_rules(self):
        with self.assertRaises(AssertionError):
            b.read_headers('/brand/v1/a.png', '/brand/*\n  Cache-Control: max-age=0\n/brand/v1/*\n  Cache-Control: immutable\n')

    def test_all_declared_assets_have_correct_cache_rules(self):
        rules = (ROOT / "public/_headers").read_text()
        for item in b.CONTRACT["assets"]:
            with self.subTest(path=item["path"]):
                headers = b.read_headers(item["path"], rules)
                b.verify_cache(headers, item["immutable"])
                self.assertEqual(headers['x-content-type-options'], 'nosniff')

    def test_ssr_head_and_html_escaped_alt(self):
        for path in b.CONTRACT["routes"]:
            b.verify_head(good_head(path), path)

    def test_rejects_stale_head(self):
        with self.assertRaises(AssertionError):
            b.verify_head(good_head().replace('/brand/v1/favicon-32.png', '/favicon.ico'), '/')

    def test_rejects_icons_only_present_after_javascript(self):
        with self.assertRaises(AssertionError):
            b.verify_head(good_head().replace('<head>', '<body>').replace('</head>', '</body>'), '/')

    def test_rejects_duplicate_icon(self):
        with self.assertRaises(AssertionError):
            b.verify_head(good_head().replace('</head>', '<link rel="icon" href="/lovable.ico"></head>'), '/')

    def test_rejects_missing_share_metadata(self):
        with self.assertRaises(AssertionError):
            b.verify_head(good_head().replace('property="og:image"', 'property="unused"'), '/')

    def test_rejects_wrong_canonical(self):
        with self.assertRaisesRegex(AssertionError, "canonical"):
            b.verify_head(good_head().replace('rel="canonical" href="https://proofandstate.com/"',
                                            'rel="canonical" href="https://www.proofandstate.com/"'), '/')

    def test_manifest(self):
        b.verify_manifest((ROOT / "public/site.webmanifest").read_bytes())

    def test_rejects_unbranded_manifest_icon(self):
        manifest = json.loads((ROOT / "public/site.webmanifest").read_text())
        manifest['icons'][0]['src'] = '/lovable.png'
        with self.assertRaises(AssertionError):
            b.verify_manifest(json.dumps(manifest))

    def test_every_metadata_asset_is_in_contract(self):
        paths = {x['path'] for x in b.CONTRACT['assets']}
        for link in b.CONTRACT['head_links']:
            self.assertIn(link['href'], paths)
        self.assertIn(b.CONTRACT['image_meta']['og:image'].removeprefix(b.CONTRACT['origin']), paths)


if __name__ == '__main__':
    unittest.main()
