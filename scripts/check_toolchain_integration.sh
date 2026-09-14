#!/usr/bin/env bash
# Isolated local fixtures: no changes to the shipping source or build output.
set -euo pipefail
root="$PWD"
mkdir -p "$root/branding-evidence"
fixture="$(mktemp -d)"
pid=""
trap 'if [ -n "$pid" ]; then kill "$pid" 2>/dev/null || true; fi; rm -rf "$fixture"' EXIT
git archive HEAD | tar -x -C "$fixture"
ln -s "$root/node_modules" "$fixture/node_modules"
cd "$fixture"
mkdir -p src/server
printf 'export const guarded = "PS_PRIVATE_ENV_MUST_NOT_LEAK";\n' > src/server/protected.ts
printf '\nimport { guarded } from "./server/protected"; console.info(guarded);\n' >> src/client.tsx
if bun run build > "$root/branding-evidence/import-guard.log" 2>&1; then
  echo 'Import protection failed to reject a server-only client import' >&2; exit 1
fi
grep -Eiq 'import.?protection|denied import|not allowed|cannot be imported' "$root/branding-evidence/import-guard.log"
echo 'PASS: server-only client import rejected'
git -C "$root" show HEAD:src/client.tsx > src/client.tsx
printf '\nconsole.info(import.meta.env.VITE_PS_PUBLIC_TEST, import.meta.env.PS_PRIVATE_TEST);\n' >> src/client.tsx
rm -rf src/server
cat > src/routes/toolchain-acceptance-fixture.tsx <<'TS'
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useState } from 'react';
const echo = createServerFn({method:'POST'}).handler(async ()=>'server-ok');
const fail = createServerFn({method:'POST'}).handler(async ()=>{throw new Error('Controlled server function failure');});
export const Route = createFileRoute('/toolchain-acceptance-fixture')({component:Fixture});
function Fixture(){
 const [outcome,setOutcome]=useState('ready');
 return <div><button onClick={()=>echo().then(setOutcome)}>Exercise server function</button><button onClick={()=>fail().catch(()=>setOutcome('caught-error'))}>Exercise failing function</button><output data-testid="outcome">{outcome}</output></div>;
}
TS
VITE_PS_PUBLIC_TEST=PS_PUBLIC_ENV_EXPECTED PS_PRIVATE_TEST=PS_PRIVATE_ENV_MUST_NOT_LEAK bun run build > "$root/branding-evidence/env-build.log" 2>&1
python3 - <<'PY'
from pathlib import Path
client=''.join(p.read_text() for p in Path('.output/public').rglob('*.js'))
alljs=client+''.join(p.read_text() for p in Path('.output/server').rglob('*.mjs'))
assert 'PS_PUBLIC_ENV_EXPECTED' in client, 'Public env canary not compiled'
assert 'PS_PRIVATE_ENV_MUST_NOT_LEAK' not in alljs, 'Private env canary leaked'
print('PASS: explicit public env available; explicit private env withheld')
PY
npx --yes wrangler@4.127.0 dev --local --config .output/server/wrangler.json --ip 127.0.0.1 --port 8791 > "$root/branding-evidence/fixture-worker.log" 2>&1 &
pid=$!
for i in $(seq 1 60); do
 if curl -fsS http://127.0.0.1:8791/ > /dev/null; then break; fi
 if ! kill -0 "$pid" 2>/dev/null || [ "$i" -eq 60 ]; then cat "$root/branding-evidence/fixture-worker.log";exit 1;fi
 sleep 2
done
python3 "$root/scripts/browser_acceptance.py" --origin http://127.0.0.1:8791 --fixture --report "$root/branding-evidence/fixture-browser.json"
