export type RuntimeErrorKind =
  | "route-boundary"
  | "react-caught"
  | "react-uncaught"
  | "react-recoverable"
  | "window-error"
  | "unhandled-rejection";

export type RuntimeDiagnostic = Readonly<{
  service: "proof-and-state-website";
  kind: RuntimeErrorKind;
  status?: number;
}>;

/** Local observability only. No collector, cookies, storage or network transmission. */
export function createRuntimeReporter(
  emit: (event: RuntimeDiagnostic) => void,
  now: () => number = Date.now,
) {
  let seen = new WeakSet<object>();
  let windowStart = now();
  let count = 0;
  return (error: unknown, kind: RuntimeErrorKind): boolean => {
    try {
      if (now() - windowStart >= 60_000) {
        windowStart = now();
        count = 0;
        seen = new WeakSet<object>();
      }
      if (count >= 20) return false;
      if (typeof error === "object" && error !== null) {
        if (seen.has(error)) return false;
        seen.add(error);
      }
      count++;
      const status = error instanceof Response ? error.status : undefined;
      emit(Object.freeze({
        service: "proof-and-state-website",
        kind,
        ...(status === undefined ? {} : { status }),
      }));
      return true;
    } catch {
      return false;
    }
  };
}

const report = createRuntimeReporter((event) => {
  console.error("[proof-state:runtime-error]", event);
  window.dispatchEvent(new CustomEvent("proof-state:runtime-error", { detail: event }));
});

export function reportRuntimeError(error: unknown, kind: RuntimeErrorKind) {
  if (typeof window === "undefined") return;
  if (report(error, kind) && import.meta.env.DEV) {
    // Detailed debugging stays in the development console, not the event payload.
    console.error(error);
  }
}

export function installRuntimeDiagnostics(target: Window = window): () => void {
  const onError = (event: ErrorEvent) => reportRuntimeError(event.error, "window-error");
  const onRejection = (event: PromiseRejectionEvent) =>
    reportRuntimeError(event.reason, "unhandled-rejection");
  target.addEventListener("error", onError);
  target.addEventListener("unhandledrejection", onRejection);
  return () => {
    target.removeEventListener("error", onError);
    target.removeEventListener("unhandledrejection", onRejection);
  };
}
