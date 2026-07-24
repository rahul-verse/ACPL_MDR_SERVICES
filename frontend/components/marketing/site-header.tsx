"use client";

import { LogIn, Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { navItems } from "@/data/mdr";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ui/theme-provider";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-300 bg-white/95 dark:border-white/10 dark:bg-[#030712]/80 backdrop-blur-2xl transition-colors duration-300 shadow-sm dark:shadow-none">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
      >
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group" aria-label="ACPL MDR home">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:border-red-400/60 dark:border-white/10 dark:bg-white/10">
              <Image
                src="/acpl-logo.svg"
                alt="ACPL Systems logo"
                width={44}
                height={44}
                priority
                className="h-9 w-9 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                {siteConfig.company}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-red-600 dark:text-red-300 font-mono font-bold">
                Cybersecurity MDR
              </span>
            </div>
          </Link>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="rounded-lg px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-100 hover:text-red-600 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-red-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
            className="rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.08]"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5 text-amber-400" />
            ) : (
              <Moon className="h-5 w-5 text-red-600" />
            )}
          </Button>

          <Link
            href="/admin"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-xs font-bold text-slate-900 shadow-sm transition-colors hover:bg-slate-100 dark:border-white/12 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
          >
            <LogIn aria-hidden className="h-3.5 w-3.5" />
            Admin Login
          </Link>

          <Button
            size="sm"
            className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm border-0"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Talk to MDR
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
            className="rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.08]"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5 text-amber-400" />
            ) : (
              <Moon className="h-5 w-5 text-red-600" />
            )}
          </Button>

          <Button
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            size="icon"
            variant="secondary"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden className="h-5 w-5 text-slate-900 dark:text-white" /> : <Menu aria-hidden className="h-5 w-5 text-slate-900 dark:text-white" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "grid border-t border-slate-200 bg-white/95 dark:border-white/10 dark:bg-[#030712]/95 px-5 transition-all duration-300 md:hidden",
          open ? "grid-rows-[1fr] py-4 opacity-100" : "grid-rows-[0fr] py-0 opacity-0 pointer-events-none",
        )}
      >
        <div className="overflow-hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            <div className="mb-2 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>24x7 India Security Operations Center Active</span>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100 hover:text-red-600 dark:text-slate-200 dark:hover:bg-white/[0.06] dark:hover:text-red-300"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="rounded-md px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/[0.06] dark:hover:text-red-300"
              onClick={() => setOpen(false)}
            >
              SOC Login
            </Link>
            <Button
              className="mt-2 w-full justify-center bg-red-600 hover:bg-red-500 text-white font-bold"
              size="sm"
              onClick={() => {
                setOpen(false);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Talk to MDR
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
