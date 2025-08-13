
import * as React from "react";
import { cn } from "./utils";

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "secondary" | "outline" }>(
  ({ className, variant="default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-2xl px-3 py-2 text-sm shadow-sm";
    const styles =
      variant==="secondary" ? "bg-gray-200 dark:bg-gray-700"
      : variant==="outline" ? "border border-gray-300 dark:border-gray-600"
      : "bg-gray-900 text-white dark:bg-white dark:text-black";
    return <button ref={ref} className={cn(base, styles, className)} {...props} />;
  }
);
Button.displayName = "Button";
