import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/developers/quickstart")({
  beforeLoad: () => {
    throw redirect({ to: "/open-source", replace: true });
  },
});
