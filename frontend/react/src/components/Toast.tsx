// src/components/Toast.tsx
import { useState, useCallback, useEffect } from "react";
import type { Toast, ToastType } from "../types";

function ToastItem({ id, message, type = "info", onRemove }: Toast & { onRemove: (id: number) => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onRemove(id), 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [id, onRemove]);

  const icons: Record<ToastType, JSX.Element> = {
    success: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#22c55e" opacity="0.15"/><path d="M9 12l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    error:   <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ef4444" opacity="0.15"/><path d="M15 9l-6 6M9 9l6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/></svg>,
    info:    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#a78bfa" opacity="0.15"/><path d="M12 8v4M12 16h.01" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/></svg>,
    warning: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/></svg>,
  };

  const styles: Record<ToastType, string> = {
    success: "border-green-500/30 bg-green-500/10",
    error:   "border-red-500/30 bg-red-500/10",
    info:    "border-violet-500/30 bg-violet-500/10",
    warning: "border-amber-500/30 bg-amber-500/10",
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border glass text-sm font-medium text-white/90 min-w-[260px] max-w-[340px] ${styles[type]} ${exiting ? "toast-exit" : "toast-enter"}`}>
      {icons[type]}
      <span className="flex-1">{message}</span>
      <button onClick={() => { setExiting(true); setTimeout(() => onRemove(id), 300); }}
        className="text-white/40 hover:text-white/80 transition-colors ml-1">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: number) => void }) {
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map((t) => <ToastItem key={t.id} {...t} onRemove={removeToast} />)}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
