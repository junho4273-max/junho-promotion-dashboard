
"use client";

import { create } from "zustand";
import type { Row } from "@/lib/data";
import demo from "@/data/sample.json";

type S = {
  rows: Row[];
  lastUpdated: Date | null;
  updateRows: (r: Row[]) => void;
};

export const useDataStore = create<S>((set) => ({
  rows: demo as any,
  lastUpdated: null,
  updateRows: (r) => set({ rows: r, lastUpdated: new Date() })
}));
