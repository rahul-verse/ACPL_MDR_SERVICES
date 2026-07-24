import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background px-5 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-[420px] w-full" />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    </main>
  );
}
