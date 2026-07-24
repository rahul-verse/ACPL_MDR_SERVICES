"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastMessage, "id">) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { ...toast, id };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      dismissToast(id);
    }, 5000);
  }, [dismissToast]);

  const success = useCallback(
    (title: string, description?: string) => showToast({ type: "success", title, description }),
    [showToast]
  );
  const error = useCallback(
    (title: string, description?: string) => showToast({ type: "error", title, description }),
    [showToast]
  );
  const info = useCallback(
    (title: string, description?: string) => showToast({ type: "info", title, description }),
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, success, error, info }}>
      {children}
      {/* Toast Render Portal Container */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-5 right-5 z-[100] flex max-w-md flex-col gap-3 pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            className={`pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-panel backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${
              toast.type === "success"
                ? "border-emerald-500/30 bg-[#061e19]/90 text-emerald-100"
                : toast.type === "error"
                ? "border-red-500/30 bg-[#21090c]/90 text-red-100"
                : "border-cyan-500/30 bg-[#071927]/90 text-cyan-100"
            }`}
          >
            {toast.type === "success" && (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
            )}
            {toast.type === "error" && (
              <AlertCircle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
            )}
            {toast.type === "info" && (
              <Info className="h-5 w-5 shrink-0 text-cyan-400 mt-0.5" />
            )}

            <div className="flex-1">
              <h4 className="text-sm font-semibold leading-5">{toast.title}</h4>
              {toast.description ? (
                <p className="mt-1 text-xs opacity-90 leading-4">{toast.description}</p>
              ) : null}
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="shrink-0 text-slate-400 hover:text-white transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
