import { describe, expect, test, mock } from "bun:test";
import { createRuntimeReporter, reportRuntimeError } from "../src/lib/runtime-diagnostics";
import { proofStateDiagnostics } from "../tools/vite-diagnostics";

const events: unknown[] = [];
let response: Response | Error = new Response("ok");
mock.module("@tanstack/react-start/server-entry", () => ({
  default: { fetch: async () => { if (response instanceof Error) throw response; return response; } },
}));
const server = (await import("../src/server")).default;

describe("owned browser diagnostics", () => {
  test("emits safe owned classification without serialising the error", () => {
    const report = createRuntimeReporter(e => events.push(e));
    const secret = new Error("password=private; https://example.test/?token=private");
    expect(report(secret, "react-caught")).toBe(true);
    expect(JSON.stringify(events.at(-1))).not.toContain("private");
    expect(events.at(-1)).toEqual({service:"proof-and-state-website",kind:"react-caught"});
  });
  test("retains Response status without its URL or body", () => {
    createRuntimeReporter(e => events.push(e))(new Response("private", {status:403}), "route-boundary");
    expect(events.at(-1)).toEqual({service:"proof-and-state-website",kind:"route-boundary",status:403});
  });
  test("deduplicates the same error across callbacks", () => {
    const report = createRuntimeReporter(() => {}); const error = new Error();
    expect(report(error,"react-caught")).toBe(true);
    expect(report(error,"route-boundary")).toBe(false);
  });
  test("bounds floods and resets the window", () => {
    let now = 0; const report = createRuntimeReporter(() => {}, () => now);
    for (let i=0;i<20;i++) expect(report("error","window-error")).toBe(true);
    expect(report("error","window-error")).toBe(false);
    now = 60_000; expect(report("error","window-error")).toBe(true);
  });
  test("hostile error getters are not read", () => {
    const error = {get message(){throw new Error("getter");},get stack(){throw new Error("getter");}};
    expect(createRuntimeReporter(()=>{})(error,"react-uncaught")).toBe(true);
  });
  test("sink failures cannot break the application", () => {
    expect(createRuntimeReporter(()=>{throw new Error("sink");})(new Error(),"react-recoverable")).toBe(false);
  });
  test("server-side invocation is a no-op", () => {
    expect(()=>reportRuntimeError(new Error(),"route-boundary")).not.toThrow();
  });
  test("uses standard plugin hooks, not dependency transforms", () => {
    const plugin = proofStateDiagnostics();
    expect(plugin.name).toBe("proof-state:diagnostics");
    expect(plugin.transform).toBeUndefined();
  });
});

describe("retained server behavior", () => {
  test("www preserves path and query in a canonical 308", async () => {
    const r = await server.fetch(new Request("https://www.proofandstate.com/products?q=hello"),{},{});
    expect(r.status).toBe(308);
    expect(r.headers.get("location")).toBe("https://proofandstate.com/products?q=hello");
  });
  test("ordinary responses pass through unchanged", async () => {
    response = new Response("ordinary",{status:200});
    expect(await server.fetch(new Request("https://proofandstate.com"),{},{})).toBe(response);
  });
  test("404s are preserved rather than normalised to 500", async () => {
    response = new Response("missing",{status:404});
    expect(await server.fetch(new Request("https://proofandstate.com/missing"),{},{})).toBe(response);
  });
  test("known swallowed h3 errors become safe HTML 500", async () => {
    response = Response.json({unhandled:true,message:"HTTPError"},{status:500});
    const r = await server.fetch(new Request("https://proofandstate.com"),{},{});
    expect(r.status).toBe(500);expect(r.headers.get("content-type")).toContain("text/html");
    expect(await r.text()).toContain("This page didn't load");
  });
  test("unrelated JSON errors retain their contract", async () => {
    response = Response.json({message:"different"},{status:502});
    expect(await server.fetch(new Request("https://proofandstate.com"),{},{})).toBe(response);
  });
  test("thrown errors do not expose their message in the response", async () => {
    response = new Error("DO_NOT_SEND_TO_BROWSER");
    const r = await server.fetch(new Request("https://proofandstate.com"),{},{});
    expect(r.status).toBe(500);expect(await r.text()).not.toContain("DO_NOT_SEND_TO_BROWSER");
  });
});
