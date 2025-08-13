
"use client";
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "./utils";

export const Select = SelectPrimitive.Root;
export const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Trigger ref={ref} className={cn("inline-flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm border-gray-300 dark:border-gray-600", className)} {...props} />
  )
);
SelectTrigger.displayName = "SelectTrigger";
export const SelectValue = SelectPrimitive.Value;
export const SelectContent = SelectPrimitive.Content;
export const SelectItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Item ref={ref} className={cn("rounded px-3 py-2 text-sm outline-none hover:bg-gray-100 dark:hover:bg-gray-800", className)} {...props} />
  )
);
SelectItem.displayName = "SelectItem";
