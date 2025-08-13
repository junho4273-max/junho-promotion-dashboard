
"use client";
import { pushToast } from "./toast";
export function useToast() {
  return { toast: pushToast };
}
