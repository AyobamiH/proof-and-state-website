#!/usr/bin/env python3
"""Owned toolchain acceptance: dependency absence, preserved contracts, exact public bundles."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import time
from urllib.request import urlopen, Request

ROOT = Path(__file__).resolve().parents[1]
BASELINE = json.loads((ROOT / 'tools/toolchain-baseline.json').read_text())
MARKERS = ('@lovable.dev/', '__lovable', '__LOVABLE', 'x-lovable-', 'lovable:', 'LOVABLE_', '/__l5e/', 'server-ssr-error', 'server-fn-error')

def check(ok, message):
    if not ok:
        raise AssertionError(message)

def digest(data):
    return hashlib.sha256(data).hexdigest()

def clean(text, path):
    for marker in MARKERS:
        check(marker not in text, f'{path}: remaining vendor executable marker {marker}')

def verify_source():
    check(not (ROOT / '.lovable').exists(), 'Editor workspace remains')
    for path in ('package.json', 'bun.lock', 'bunfig.toml', 'vite.config.ts'):
        clean((ROOT / path).read_text(), path)
    check('minimumReleaseAge = 86400' in (ROOT/'bunfig.toml').read_text(), 'Supply-chain guard lost')
    check('minimumReleaseAgeExcludes' not in (ROOT/'bunfig.toml').read_text(), 'Age bypass remains')
    for folder in ('src', 'tools'):
        for p in (ROOT/folder).rglob('*'):
            if p.suffix in ('.ts','.tsx','.js','.mjs'):
                clean(p.read_text(), str(p))
    for path, expected in BASELINE['protected_source_sha256'].items():
        check(digest((ROOT/path).read_bytes()) == expected, f'{path}: preserved contract changed')
    package = json.loads((ROOT/'package.json').read_text())
    check(package['name'] == 'proof-and-state-website', 'Wrong project identity')
    installed = ROOT/'node_modules/@lovable.dev'
    check(not installed.exists() or not list(installed.iterdir()), 'Vendor package still installed')

def verify_build():
    generated = json.loads((ROOT/'.output/server/wrangler.json').read_text())
    check(generated == BASELINE['generated_wrangler'], 'Generated deployment contract drifted')
    count = 0
    for p in (ROOT/'.output').rglob('*'):
        if p.suffix in ('.js','.mjs','.css','.html'):
            text = p.read_text()
            clean(text,str(p))
            check('PS_PRIVATE_ENV_MUST_NOT_LEAK' not in text, f'{p}: private environment leaked')
            check('toolchain-acceptance-fixture' not in text, f'{p}: test fixture leaked')
            count += 1
    check(count > 0, 'No bundles verified')
    return count

def verify_public(origin):
    check(origin == 'https://proofandstate.com', 'Unexpected production origin')
    rows=[]
    for p in sorted((ROOT/'.output/public/assets').iterdir()):
        if p.suffix not in ('.js','.css'): continue
        path='/assets/'+p.name
        with urlopen(Request(origin+path, headers={'Accept-Encoding':'identity','User-Agent':'ProofState-ToolchainAcceptance/1.0'}),timeout=20) as r:
            data = r.read(2_000_001)
            check(r.status == 200 and len(data)<=2_000_000, f'{path}: invalid response')
            check(digest(data)==digest(p.read_bytes()), f'{path}: deployed bytes differ')
            clean(data.decode(),path)
            rows.append({'path':path,'sha256':digest(data),'bytes':len(data)})
    check(rows, 'No public bundles')
    return rows

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--built',action='store_true');p.add_argument('--origin');p.add_argument('--report',type=Path)
    a=p.parse_args()
    result={'commit':os.getenv('GITHUB_SHA'),'observed_at':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())}
    try:
        verify_source();result['source']='passed'
        if a.built: result['built_bundle_count']=verify_build()
        if a.origin: result['public_bundles']=verify_public(a.origin)
        result['status']='passed'
    except Exception as e:
        result.update(status='failed',error=str(e))
    if a.report:
        a.report.parent.mkdir(parents=True,exist_ok=True);a.report.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2))
    return result['status']!='passed'
if __name__=='__main__': raise SystemExit(main())
