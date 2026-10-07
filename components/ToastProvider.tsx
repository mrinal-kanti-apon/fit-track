"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";

type ToastKind = "success" | "info" | "warning";
interface ToastItem {
  id: number;
  message: string;
  kind: ToastKind;
}

const ToastContext = createContext<(message: string, kind?: ToastKind) => void>(() => {});
export const useToast = () => useContext(ToastContext);

const ICONS = { success: CheckCircle2, info: Info, warning: AlertTriangle } as const;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: number) => {
    setItems((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message: string, kind: ToastKind = "success") => {
      const id = ++counter.current;
      setItems((list) => [...list.slice(-2), { id, message, kind }]);
      window.setTimeout(() => dismiss(id), 2800);
    },
    [dismiss],
  );

  const value = useMemo(() => push, [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="toast toast-bottom toast-center z-[100] w-full max-w-sm px-4 sm:toast-end sm:w-auto sm:px-0"
        role="status"
        aria-live="polite"
      >
        {items.map((t) => {
          const Icon = ICONS[t.kind];
          const tone =
            t.kind === "success"
              ? "text-lime"
              : t.kind === "warning"
                ? "text-warning"
                : "text-info";
          return (
            <div
              key={t.id}
              className="alert animate-rise gap-3 rounded-xl border border-line bg-[#171b24] px-4 py-3 text-sm text-base-content shadow-2xl shadow-black/60"
            >
              <Icon className={`size-5 shrink-0 ${tone}`} aria-hidden />
              <span className="flex-1 font-medium">{t.message}</span>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="rounded-md p-1 text-base-content/50 transition hover:bg-white/10 hover:text-white"
                aria-label="Dismiss notification"
              >
                <X className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}