"use client";

import { useCallback, useEffect, useState } from "react";

type Result<T> =
  | { key: string; status: "success"; data: T }
  | { key: string; status: "error"; error: unknown };

/**
 * Runs `fetcher` whenever `key` changes (or `retry()` is called).
 * The loading state is derived, so no state is set synchronously inside the effect.
 */
export function useAsync<T>(key: string, fetcher: (signal: AbortSignal) => Promise<T>) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result<T> | null>(null);
  const fullKey = `${key}#${attempt}`;

  useEffect(() => {
    const controller = new AbortController();
    fetcher(controller.signal)
      .then((data) => setResult({ key: fullKey, status: "success", data }))
      .catch((error) => {
        if (controller.signal.aborted) return;
        setResult({ key: fullKey, status: "error", error });
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullKey]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  const current = result && result.key === fullKey ? result : null;

  return {
    loading: current === null,
    data: current?.status === "success" ? current.data : null,
    error: current?.status === "error" ? current.error : null,
    retry,
  };
}