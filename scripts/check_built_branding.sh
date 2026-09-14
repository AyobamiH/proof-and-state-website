#!/usr/bin/env bash
# Exercise the exact generated Cloudflare Worker, with no production secrets.
set -euo pipefail
mkdir -p branding-evidence
python3 scripts/verify_branding.py --assets .output/public --report branding-evidence/build.json
npx --yes wrangler@4.127.0 dev --local --config .output/server/wrangler.json \
  --ip 127.0.0.1 --port 8787 > branding-evidence/worker.log 2>&1 &
worker_pid=$!
trap 'kill "$worker_pid" 2>/dev/null || true' EXIT
for attempt in $(seq 1 60); do
  if curl --max-time 2 --fail --silent http://127.0.0.1:8787/ > /dev/null; then
    break
  fi
  if ! kill -0 "$worker_pid" 2>/dev/null || [ "$attempt" -eq 60 ]; then
    cat branding-evidence/worker.log
    exit 1
  fi
  sleep 2
done
python3 scripts/verify_branding.py --origin http://127.0.0.1:8787 \
  --report branding-evidence/worker.json
