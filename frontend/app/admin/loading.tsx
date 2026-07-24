import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <main className="min-h-screen bg-background px-5 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Skeleton className="h-12 w-72" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-[460px] w-full" />
      </div>
    </main>
  );
}
