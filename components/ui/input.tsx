
import * as React from "react";
import { cn } from "./utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn("w-full rounded-xl border px-3 py-2 text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900", className)} {...props} />
  )
);
Input.displayName = "Input";
