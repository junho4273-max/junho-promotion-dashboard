
"use client";
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "./utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export function DialogContent({ className, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/30" />
      <DialogPrimitive.Content className={cn("fixed left-1/2 top-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-white p-4 shadow-lg dark:bg-gray-900 dark:border-gray-700", className)} {...props} />
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="mb-2" {...props} />;
}
export function DialogTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className="text-lg font-semibold" {...props} />;
}
