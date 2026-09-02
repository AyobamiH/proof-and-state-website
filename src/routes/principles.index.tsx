import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/principles/")({
  beforeLoad: () => {
    throw redirect({ to: "/trust", replace: true });
  },
});
