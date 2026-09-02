import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/architecture/")({
  beforeLoad: () => {
    throw redirect({ to: "/trust", replace: true });
  },
});
