import { cn } from "@/lib/utils";
import type { EnquiryStatus } from "@/types/admin";

const variants: Record<EnquiryStatus, string> = {
  new: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
  qualified: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  "in-review": "border-amber-300/30 bg-amber-300/10 text-amber-100",
  closed: "border-slate-300/20 bg-slate-300/10 text-slate-200",
};

export function StatusPill({ status }: { status: EnquiryStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize",
        variants[status],
      )}
    >
      {status.replace("-", " ")}
    </span>
  );
}
