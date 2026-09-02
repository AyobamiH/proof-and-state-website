import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/principles/$slug")({
  beforeLoad: () => {
    throw redirect({ to: "/trust", replace: true });
  },
});
