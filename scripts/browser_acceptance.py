#!/usr/bin/env python3
"""Browser readback; optional local-only server-function fixtures. Never publishes."""
import argparse
import json
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

p=argparse.ArgumentParser()
p.add_argument('--origin',default='http://127.0.0.1:8787')
p.add_argument('--fixture',action='store_true')
p.add_argument('--hmr-source',type=Path)
p.add_argument('--report',type=Path,required=True)
a=p.parse_args()
if a.fixture and a.origin != 'http://127.0.0.1:8791':
    raise SystemExit('Fixtures are local-only')
if a.hmr_source and a.origin != 'http://127.0.0.1:8792':
    raise SystemExit('HMR test writes are local-only')
a.report.parent.mkdir(parents=True,exist_ok=True)
rows=[]
with sync_playwright() as pw:
    browser=pw.chromium.launch()
    for mobile in (False,True):
        context=browser.new_context(viewport={'width':390 if mobile else 1440,'height':844 if mobile else 1000},reduced_motion='reduce')
        page=context.new_page();errors=[];requests=[]
        page.on('pageerror',lambda e: errors.append(str(e)))
        page.on('request',lambda r: requests.append(r.url))
        page.add_init_script("window.__psTestEvents=[];window.addEventListener('proof-state:runtime-error', e=>window.__psTestEvents.push(e.detail));")
        r=page.goto(a.origin+'/',wait_until='networkidle');assert r.status==200
        expect(page.get_by_role('heading',name='Let AI move faster without losing review.')).to_be_visible()
        page.get_by_role('button',name='Switch to dark theme').click()
        expect(page.locator('html')).to_have_class('dark')
        page.reload(wait_until='networkidle')
        expect(page.get_by_role('button',name='Switch to light theme')).to_be_visible()
        if mobile:
            page.get_by_role('button',name='Open menu').click()
            expect(page.get_by_role('button',name='Close menu')).to_be_visible()
            page.get_by_role('button',name='Close menu').click()
        page.get_by_role('link',name='Explore products',exact=True).click()
        expect(page).to_have_url(a.origin+'/products')
        for route in ('/status','/products/opstruth','/donestate'):
            assert page.goto(a.origin+route,wait_until='networkidle').status==200
            assert not page.evaluate('window.__psTestEvents'), 'Unexpected application/hydration diagnostics'
        page.evaluate("window.dispatchEvent(new ErrorEvent('error',{error:new Error('PS_PRIVATE_DIAGNOSTIC')}))")
        signals=page.evaluate('window.__psTestEvents')
        assert any(e['kind']=='window-error' for e in signals)
        assert 'PS_PRIVATE_DIAGNOSTIC' not in json.dumps(signals)
        assert not errors, errors
        assert not any('lovable' in u.lower() or '/__l5e/' in u for u in requests), requests
        page.screenshot(path=str(a.report.parent/('mobile.png' if mobile else 'desktop.png')),full_page=True)
        rows.append({'viewport':'mobile' if mobile else 'desktop','hydration_navigation_theme':'passed','vendor_requests':0,'page_errors':0,'diagnostic_listener':'passed'})
        context.close()
    if a.hmr_source:
        page=browser.new_page(viewport={'width':1440,'height':1000})
        page.goto(a.origin+'/',wait_until='networkidle')
        text=a.hmr_source.read_text()
        try:
            a.hmr_source.write_text(text.replace('Explore the system','Owned HMR verified'))
            expect(page.get_by_role('link',name='Owned HMR verified',exact=True)).to_be_visible(timeout=15000)
            rows.append({'native_dev_hmr':'passed'})
        finally:
            a.hmr_source.write_text(text)
    if a.fixture:
        page=browser.new_page()
        page.goto(a.origin+'/toolchain-acceptance-fixture',wait_until='networkidle')
        with page.expect_request(lambda r:r.method=='POST' and '_serverFn' in r.url) as pending:
            page.get_by_role('button',name='Exercise server function').click()
        expect(page.get_by_test_id('outcome')).to_have_text('server-ok')
        req=pending.value
        attack=page.request.post(req.url,headers={'Origin':'https://invalid.example','Sec-Fetch-Site':'cross-site','Content-Type':req.headers.get('content-type','application/json')},data=req.post_data or '')
        assert attack.status==403, f'CSRF status {attack.status}'
        page.get_by_role('button',name='Exercise failing function').click()
        expect(page.get_by_test_id('outcome')).to_have_text('caught-error')
        rows.append({'server_function':'passed','server_function_failure':'caught','cross_origin_post_status':attack.status})
    browser.close()
a.report.write_text(json.dumps({'status':'passed','origin':a.origin,'checks':rows},indent=2)+'\n')
print(json.dumps({'status':'passed','checks':rows}))
