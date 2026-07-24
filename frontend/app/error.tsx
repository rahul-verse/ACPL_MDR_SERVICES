"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <section className="max-w-lg rounded-lg border border-white/10 bg-white/[0.055] p-8 text-center shadow-panel backdrop-blur-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
          Recovery mode
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          We could not render this view.
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          {error.message || "An unexpected application error occurred."}
        </p>
        <Button className="mt-6" onClick={reset}>
          <RotateCcw aria-hidden className="h-4 w-4" />
          Retry
        </Button>
      </section>
    </main>
  );
}
