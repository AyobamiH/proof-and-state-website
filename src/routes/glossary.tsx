import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/glossary")({
  beforeLoad: () => {
    throw redirect({ to: "/products", replace: true });
  },
});
