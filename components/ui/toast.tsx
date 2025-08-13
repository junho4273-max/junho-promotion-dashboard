
"use client";
import * as React from "react";
import { createPortal } from "react-dom";
export type Toast = { id: number; title: string; description?: string; variant?: "default"|"destructive" };
let addToast: ((t: Omit<Toast, "id">) => void) | null = null;

export function Toaster() {
  const [items, setItems] = React.useState<Toast[]>([]);
  React.useEffect(()=>{ addToast = (t) => setItems(s=>[...s, { id: Date.now(), ...t }]); },[]);
  return createPortal(
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {items.map(t=>(
        <div key={t.id} className={`rounded-xl border px-3 py-2 text-sm shadow bg-white dark:bg-gray-900 ${t.variant==="destructive" ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`}>
          <div className="font-semibold">{t.title}</div>
          {t.description && <div className="opacity-80">{t.description}</div>}
        </div>
      ))}
    </div>, document.body
  );
}
export function pushToast(t: Omit<Toast, "id">) { addToast?.(t); }
