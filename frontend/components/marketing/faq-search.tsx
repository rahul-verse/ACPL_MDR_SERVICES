"use client";

import { useMemo, useState } from "react";
import { ChevronRight, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { faqs } from "@/data/mdr";

export function FaqSearch() {
  const [search, setSearch] = useState("");

  const filteredFaqs = useMemo(() => {
    if (!search.trim()) return faqs;
    const term = search.toLowerCase();
    return faqs.filter(
      (f) => f.question.toLowerCase().includes(term) || f.answer.toLowerCase().includes(term),
    );
  }, [search]);

  return (
    <section
      id="faq"
      className="relative px-5 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 max-w-md">
          <label className="relative block">
            <span className="sr-only">Search FAQ questions</span>
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search FAQ by keyword (e.g. EDR, SLA, onboarding)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </label>
        </div>

        <div className="grid gap-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-white/10 bg-[#060a14]/70 p-5 transition-all hover:border-indigo-500/40 glass-panel-hover"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md text-left text-base font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
                  {item.question}
                  <span className="rounded-lg border border-white/10 bg-white/[0.06] p-1.5 text-indigo-300 transition-transform group-open:rotate-90">
                    <ChevronRight aria-hidden className="h-4 w-4" />
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">{item.answer}</p>
              </details>
            ))
          ) : (
            <p className="py-6 text-center text-sm text-slate-400">
              No FAQ results found matching &quot;{search}&quot;. Contact our team directly for custom answers.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
