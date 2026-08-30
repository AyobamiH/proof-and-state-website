import { createFileRoute, redirect } from "@tanstack/react-router";

/** DoneState's canonical product narrative lives at /donestate. */
export const Route = createFileRoute("/products/donestate")({
  beforeLoad: () => {
    throw redirect({ to: "/donestate", statusCode: 301 });
  },
});
