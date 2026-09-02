import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/architecture/authority-model")({
  beforeLoad: () => {
    throw redirect({ to: "/trust", replace: true });
  },
});
