
"use client";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <Button variant="outline" onClick={()=>setTheme(isDark ? "light" : "dark")} aria-label="테마 전환">
      {isDark ? <Sun size={16}/> : <Moon size={16}/>} <span className="ml-1 text-sm">모드</span>
    </Button>
  );
}
