import { StartClient } from "@tanstack/react-start/client";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { installRuntimeDiagnostics, reportRuntimeError } from "./lib/runtime-diagnostics";

const disposeDiagnostics = installRuntimeDiagnostics();
if (import.meta.hot) import.meta.hot.dispose(disposeDiagnostics);

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>,
    {
      onCaughtError: (error) => reportRuntimeError(error, "react-caught"),
      onUncaughtError: (error) => reportRuntimeError(error, "react-uncaught"),
      onRecoverableError: (error) => reportRuntimeError(error, "react-recoverable"),
    },
  );
});
