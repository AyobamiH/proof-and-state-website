#!/usr/bin/env python3
"""Intentional brand-release export only. Never run automatically during build/deploy.

Install CairoSVG==2.8.2 and Pillow==11.3.0 in an isolated environment.
Review the exported PNGs and contract together. Normal builds use committed bytes.
"""
import argparse
import hashlib
import io
import json
from pathlib import Path
import shutil

import cairosvg
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
OUT = PUBLIC / 'brand/v1'


def blob(data):
    return hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--update-contract', action='store_true')
    args = parser.parse_args()
    if not args.update_contract:
        parser.error('An intentional identity export requires --update-contract')
    approved = {
        'favicon.ico': '804abc66102d6bd869b404df0abfa7a49223f8d1',
        'brand/proof-and-state-mark.svg': 'f494c6b4805bde2200ae6c28690bf47d59b8e530',
        'brand/proof-and-state-favicon-32.png': '9e335854a179b946194cc6633bbd366d98b406a5',
        'brand/proof-and-state-apple-touch-icon.png': '550db9f6311173a44a3690279d0e1104c76ca203',
    }
    for path, expected in approved.items():
        if blob((PUBLIC / path).read_bytes()) != expected:
            raise ValueError(f'Approved source changed: {path}; review before exporting')
    OUT.mkdir(parents=True, exist_ok=True)
    copies = {
        'favicon.ico': 'brand/v1/favicon.ico',
        'brand/proof-and-state-mark.svg': 'brand/v1/proof-and-state-mark.svg',
        'brand/proof-and-state-favicon-32.png': 'brand/v1/favicon-32.png',
        'brand/proof-and-state-apple-touch-icon.png': 'brand/v1/apple-touch-icon.png',
    }
    for source, dest in copies.items():
        shutil.copyfile(PUBLIC / source, PUBLIC / dest)
    for name in ('apple-touch-icon.png', 'apple-touch-icon-precomposed.png'):
        shutil.copyfile(PUBLIC / 'brand/proof-and-state-apple-touch-icon.png', PUBLIC / name)
    svg = (OUT / 'proof-and-state-mark.svg').read_bytes()
    for size in (96, 192, 512):
        data = cairosvg.svg2png(bytestring=svg, output_width=size, output_height=size)
        im = Image.open(io.BytesIO(data))
        im.quantize(colors=128, method=Image.Quantize.FASTOCTREE).save(OUT / f'icon-{size}.png', optimize=True)
    data = cairosvg.svg2png(bytestring=(OUT / 'share-source.svg').read_bytes())
    im = Image.open(io.BytesIO(data)).convert('RGB')
    im.quantize(colors=128, method=Image.Quantize.MEDIANCUT).save(OUT / 'share.png', optimize=True)
    origin = 'https://proofandstate.com'
    alt = 'Proof & State: evidence for AI-assisted software delivery'
    contract = {
        'schema_version': 1, 'revision': 'proof-state-v1', 'origin': origin,
        'routes': ['/', '/status', '/products'],
        'head_links': [
            {'rel': 'shortcut icon', 'href': '/brand/v1/favicon.ico', 'type': 'image/x-icon'},
            {'rel': 'icon', 'href': '/brand/v1/favicon-32.png', 'type': 'image/png', 'sizes': '32x32'},
            {'rel': 'icon', 'href': '/brand/v1/icon-96.png', 'type': 'image/png', 'sizes': '96x96'},
            {'rel': 'icon', 'href': '/brand/v1/proof-and-state-mark.svg', 'type': 'image/svg+xml', 'sizes': 'any'},
            {'rel': 'apple-touch-icon', 'href': '/brand/v1/apple-touch-icon.png', 'sizes': '180x180'},
            {'rel': 'manifest', 'href': '/site.webmanifest'},
        ],
        'image_meta': {
            'og:image': origin + '/brand/v1/share.png', 'og:image:width': '1200', 'og:image:height': '630',
            'og:image:type': 'image/png', 'og:image:alt': alt,
            'twitter:image': origin + '/brand/v1/share.png', 'twitter:image:alt': alt,
            'twitter:card': 'summary_large_image',
        },
        'assets': [],
    }
    entries = [(p, 'ico' if p.endswith('.ico') else 'svg' if p.endswith('.svg') else 'png') for p in approved]
    entries += [(p, 'ico' if p.endswith('.ico') else 'svg' if p.endswith('.svg') else 'png') for p in copies.values()]
    entries += [(f'brand/v1/icon-{s}.png', 'png') for s in (96, 192, 512)]
    entries += [('brand/v1/share.png', 'png'), ('apple-touch-icon.png', 'png'),
                ('apple-touch-icon-precomposed.png', 'png'), ('site.webmanifest', 'manifest')]
    for path, kind in entries:
        data = (PUBLIC / path).read_bytes()
        item = {'path': '/' + path, 'git_blob_sha': blob(data), 'format': kind,
                'mime': {'ico': ['image/x-icon', 'image/vnd.microsoft.icon'], 'png': ['image/png'],
                         'svg': ['image/svg+xml'], 'manifest': ['application/manifest+json']}[kind],
                'immutable': path.startswith('brand/v1/')}
        if kind == 'png':
            item['size'] = list(Image.open(io.BytesIO(data)).size)
        if kind == 'ico':
            item['sizes'] = [[s, s] for s in (16, 32, 48, 64)]
        contract['assets'].append(item)
    (ROOT / 'scripts/branding-contract.json').write_text(json.dumps(contract, indent=2) + '\n')
    print(json.dumps(contract, indent=2))


if __name__ == '__main__':
    main()
