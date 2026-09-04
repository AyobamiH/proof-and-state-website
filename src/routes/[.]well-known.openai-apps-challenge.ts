import { createFileRoute } from "@tanstack/react-router";

const OPENAI_APPS_CHALLENGE = "dyzqQZjvdCzpFL-0z9JSvD_g2ksUhr_cKBocMfn53YE";

export const Route = createFileRoute("/.well-known/openai-apps-challenge")({
  server: {
    handlers: {
      GET: () =>
        new Response(OPENAI_APPS_CHALLENGE, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store",
          },
        }),
    },
  },
});
