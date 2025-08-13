
import * as React from "react";
import { cn } from "./utils";

export function Table(props: React.TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn("w-full text-sm", props.className)} {...props} />;
}
export function THead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="bg-gray-50 dark:bg-gray-800/50" {...props} />;
}
export function TBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}
export function TR(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className="border-b last:border-0 border-gray-200 dark:border-gray-800" {...props} />;
}
export function TH(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className="px-3 py-2 text-left font-medium" {...props} />;
}
export function TD(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className="px-3 py-2" {...props} />;
}
