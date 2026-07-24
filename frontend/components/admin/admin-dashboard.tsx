"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Loader2,
  LogOut,
  RefreshCw,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusPill } from "@/components/ui/status-pill";
import { useToast } from "@/components/ui/toast";
import { ENQUIRY_STATUS_OPTIONS, ENQUIRY_STATUSES } from "@/lib/constants";
import { apiFetch, ApiError } from "@/services/api-client";
import { formatDate } from "@/utils/format-date";
import { adminLoginSchema, type AdminLoginInput } from "@/lib/validation";
import type { Enquiry, EnquiryStatus, PaginatedEnquiries } from "@/types/admin";

export function AdminDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    setToken(window.localStorage.getItem("acpl_admin_token"));
    setBooted(true);
  }, []);

  if (!booted) {
    return <AdminSkeleton />;
  }

  if (!token) {
    return <LoginPanel onAuthenticated={setToken} />;
  }

  return <EnquiryManager token={token} onLogout={() => setToken(null)} />;
}

function LoginPanel({
  onAuthenticated,
}: {
  onAuthenticated: (token: string) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const { success, error: toastError } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
  });

  async function onSubmit(values: AdminLoginInput) {
    setError(null);

    try {
      const payload = await apiFetch<{ token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
      });
      window.localStorage.setItem("acpl_admin_token", payload.token);
      success("Authentication Successful", "Welcome to ACPL MDR SOC Command Center.");
      onAuthenticated(payload.token);
    } catch (caught) {
      const errMsg =
        caught instanceof ApiError
          ? caught.message
          : "Invalid admin credentials or backend server unavailable.";
      setError(errMsg);
      toastError("Login Failed", errMsg);
    }
  }

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-background px-5 py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="glass-panel-abnormal w-full max-w-md rounded-2xl p-8 shadow-panel backdrop-blur-2xl"
        noValidate
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 shadow-glow-indigo">
          <ShieldCheck aria-hidden className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-2xl font-black text-white">ACPL SOC Login</h1>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Authenticate to access security operations, threat telemetry, and client enquiries.
        </p>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Admin Email
            </Label>
            <Input
              id="admin-email"
              type="email"
              placeholder="admin@acpl.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "admin-email-error" : undefined}
              className={errors.email ? "border-red-400 focus-visible:ring-red-400" : "border-white/12 bg-[#030712] focus-visible:ring-indigo-400"}
              {...register("email")}
            />
            {errors.email ? (
              <p id="admin-email-error" className="text-xs text-red-400 font-medium">
                {errors.email.message}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Password
            </Label>
            <Input
              id="admin-password"
              type="password"
              placeholder="••••••••••••"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "admin-password-error" : undefined}
              className={errors.password ? "border-red-400 focus-visible:ring-red-400" : "border-white/12 bg-[#030712] focus-visible:ring-indigo-400"}
              {...register("password")}
            />
            {errors.password ? (
              <p id="admin-password-error" className="text-xs text-red-400 font-medium">
                {errors.password.message}
              </p>
            ) : null}
          </div>
        </div>
        {error ? (
          <p className="mt-4 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        ) : null}
        <Button className="mt-6 w-full shadow-glow-indigo font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white border-0" size="lg" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : null}
          Sign In to SOC
        </Button>
      </form>
    </main>
  );
}

function EnquiryManager({
  token,
  onLogout,
}: {
  token: string;
  onLogout: () => void;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | EnquiryStatus>("all");
  const [page, setPage] = useState(1);
  const [payload, setPayload] = useState<PaginatedEnquiries | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const { success: toastSuccess, error: toastError } = useToast();

  const params = useMemo(() => {
    const search = new URLSearchParams({
      page: String(page),
      limit: "8",
    });
    if (query) search.set("search", query);
    if (status !== "all") search.set("status", status);
    return search.toString();
  }, [page, query, status]);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFetch<PaginatedEnquiries>(`/admin/enquiries?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayload(result);
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 401) {
        window.localStorage.removeItem("acpl_admin_token");
        onLogout();
        return;
      }
      const msg = caught instanceof ApiError ? caught.message : "Unable to fetch MDR enquiries.";
      setError(msg);
      toastError("Error Loading Enquiries", msg);
    } finally {
      setLoading(false);
    }
  }, [onLogout, params, token, toastError]);

  useEffect(() => {
    const timer = window.setTimeout(fetchEnquiries, query ? 250 : 0);
    return () => window.clearTimeout(timer);
  }, [fetchEnquiries, query]);

  async function updateStatus(id: string, nextStatus: EnquiryStatus) {
    setUpdating(id);
    try {
      await apiFetch<{ data: Enquiry }>(`/admin/enquiries/${id}/status`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: nextStatus }),
      });
      toastSuccess("Status Updated", `Enquiry marked as ${nextStatus}.`);
      await fetchEnquiries();
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry((prev) => prev ? { ...prev, status: nextStatus } : null);
      }
    } catch (caught) {
      const msg = caught instanceof ApiError ? caught.message : "Unable to update status.";
      setError(msg);
      toastError("Update Failed", msg);
    } finally {
      setUpdating(null);
    }
  }

  function logout() {
    window.localStorage.removeItem("acpl_admin_token");
    toastSuccess("Signed Out", "You have been logged out safely.");
    onLogout();
  }

  function exportCSV() {
    if (!payload || payload.data.length === 0) return;
    const headers = ["ID", "Name", "Email", "Company", "Phone", "Service", "Message", "Status", "CreatedAt"];
    const rows = payload.data.map((e) => [
      e._id,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.email.replace(/"/g, '""')}"`,
      `"${e.company.replace(/"/g, '""')}"`,
      `"${(e.phone || "").replace(/"/g, '""')}"`,
      `"${e.service.replace(/"/g, '""')}"`,
      `"${e.message.replace(/"/g, '""')}"`,
      e.status,
      e.createdAt,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `acpl_mdr_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toastSuccess("Export Complete", "Enquiries CSV downloaded.");
  }

  return (
    <main id="main-content" className="min-h-screen bg-background px-5 py-8 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-slate-300 dark:border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700 dark:text-cyan-400 font-mono">
              ACPL MDR Operations Center
            </p>
            <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white md:text-4xl">
              Enquiry Command Center
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={exportCSV} disabled={!payload || payload.data.length === 0}>
              <Download aria-hidden className="h-4 w-4 text-blue-700 dark:text-cyan-300" />
              Export CSV
            </Button>
            <Button variant="secondary" onClick={fetchEnquiries} disabled={loading}>
              <RefreshCw aria-hidden className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="ghost" onClick={logout} className="text-slate-800 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
              <LogOut aria-hidden className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
          <label className="relative block">
            <span className="sr-only">Search enquiries</span>
            <Search aria-hidden className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
            <Input
              className="pl-10 border-slate-300 bg-white text-slate-900 font-medium dark:border-white/12 dark:bg-[#060a14]/80 dark:text-white focus-visible:ring-blue-600"
              placeholder="Search by name, company, email, or service priority..."
              value={query}
              onChange={(event) => {
                setPage(1);
                setQuery(event.target.value);
              }}
            />
          </label>
          <select
            aria-label="Filter by status"
            className="h-11 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold dark:border-white/12 dark:bg-[#060a14] dark:text-white px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 shadow-sm"
            value={status}
            onChange={(event) => {
              setPage(1);
              setStatus(event.target.value as "all" | EnquiryStatus);
            }}
          >
            {ENQUIRY_STATUS_OPTIONS.map((item) => (
              <option key={item} value={item} className="bg-white text-slate-900 dark:bg-[#060a14] dark:text-white">
                {item === "all" ? "All Statuses" : item.replace("-", " ")}
              </option>
            ))}
          </select>
        </section>

        {error ? (
          <p className="mt-4 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-800 dark:text-red-200">
            {error}
          </p>
        ) : null}

        <section aria-label="Enquiry summary" className="mt-6 grid gap-4 sm:grid-cols-3">
          <SummaryCard label="Total Enquiries" value={payload?.meta.total ?? 0} />
          <SummaryCard label="Current Page" value={payload?.meta.page ?? page} />
          <SummaryCard
            label="Active Filter"
            value={status === "all" ? "All Statuses" : status.replace("-", " ")}
            capitalize
          />
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-300 bg-white dark:border-white/10 dark:bg-[#060a14]/80 shadow-md backdrop-blur-2xl">
          {loading ? (
            <AdminTableSkeleton />
          ) : payload && payload.data.length > 0 ? (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[980px] text-left text-sm">
                  <caption className="sr-only">
                    MDR enquiries with contact information, service interest, status, and received date
                  </caption>
                  <thead className="border-b-2 border-slate-300 bg-slate-100 text-xs uppercase tracking-[0.16em] text-slate-800 font-extrabold dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-400">
                    <tr>
                      <th className="px-5 py-4 font-extrabold">Contact</th>
                      <th className="px-5 py-4 font-extrabold">Company</th>
                      <th className="px-5 py-4 font-extrabold">Service</th>
                      <th className="px-5 py-4 font-extrabold">Message</th>
                      <th className="px-5 py-4 font-extrabold">Status</th>
                      <th className="px-5 py-4 font-extrabold">Received</th>
                      <th className="px-5 py-4 font-extrabold text-right">Inspect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {payload.data.map((enquiry) => (
                      <EnquiryRow
                        key={enquiry._id}
                        enquiry={enquiry}
                        updating={updating === enquiry._id}
                        onStatusChange={updateStatus}
                        onInspect={() => setSelectedEnquiry(enquiry)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid gap-4 p-4 lg:hidden">
                {payload.data.map((enquiry) => (
                  <EnquiryCard
                    key={enquiry._id}
                    enquiry={enquiry}
                    updating={updating === enquiry._id}
                    onStatusChange={updateStatus}
                    onInspect={() => setSelectedEnquiry(enquiry)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="p-12 text-center">
              <p className="text-lg font-bold text-white">No enquiries found</p>
              <p className="mt-2 text-sm text-slate-300">
                Adjust search query or status filter to see other MDR requests.
              </p>
            </div>
          )}
        </section>

        {payload ? (
          <div className="mt-6 flex flex-col gap-4 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing page {payload.meta.page} of {Math.max(payload.meta.pages, 1)} ({payload.meta.total} total enquiries)
            </span>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
              >
                <ChevronLeft aria-hidden className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={page >= payload.meta.pages}
                onClick={() => setPage((value) => value + 1)}
              >
                Next
                <ChevronRight aria-hidden className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Enquiry Inspection Modal */}
      {selectedEnquiry ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-cyan-400/30 dark:bg-[#060a14] dark:shadow-panel backdrop-blur-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-cyan-400 uppercase">Enquiry Inspection</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedEnquiry.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{selectedEnquiry.company}</p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/[0.03]">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Email</p>
                  <p className="font-bold text-slate-900 dark:text-white">{selectedEnquiry.email}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Phone</p>
                  <p className="font-bold text-slate-900 dark:text-white">{selectedEnquiry.phone || "Not provided"}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Service Interest</p>
                <p className="font-bold text-indigo-600 dark:text-cyan-300">{selectedEnquiry.service}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Security Priorities / Message</p>
                <div className="mt-1 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-800 dark:border-white/10 dark:bg-black/40 dark:text-slate-200">
                  {selectedEnquiry.message}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 dark:border-white/10 pt-4">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Received Date</p>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{formatDate(selectedEnquiry.createdAt)}</p>
                </div>
                <StatusControl
                  enquiry={selectedEnquiry}
                  updating={updating === selectedEnquiry._id}
                  onStatusChange={updateStatus}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function EnquiryRow({
  enquiry,
  updating,
  onStatusChange,
  onInspect,
}: {
  enquiry: Enquiry;
  updating: boolean;
  onStatusChange: (id: string, status: EnquiryStatus) => void;
  onInspect: () => void;
}) {
  return (
    <tr className="align-top text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.02] border-b border-slate-300 dark:border-white/10">
      <td className="px-5 py-5">
        <p className="font-bold text-slate-900 dark:text-white">{enquiry.name}</p>
        <p className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-400">{enquiry.email}</p>
        {enquiry.phone ? <p className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-400">{enquiry.phone}</p> : null}
      </td>
      <td className="px-5 py-5 font-bold text-slate-900 dark:text-slate-200">{enquiry.company}</td>
      <td className="px-5 py-5 font-bold text-blue-700 dark:text-cyan-300">{enquiry.service}</td>
      <td className="max-w-xs px-5 py-5 text-slate-800 dark:text-slate-300 font-medium truncate">{enquiry.message}</td>
      <td className="px-5 py-5">
        <StatusControl enquiry={enquiry} updating={updating} onStatusChange={onStatusChange} />
      </td>
      <td className="px-5 py-5 text-slate-600 dark:text-slate-400 text-xs font-medium">{formatDate(enquiry.createdAt)}</td>
      <td className="px-5 py-5 text-right">
        <Button variant="ghost" size="sm" onClick={onInspect} className="text-slate-800 dark:text-slate-300 hover:text-blue-700 dark:hover:text-white">
          <Eye className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
}

function EnquiryCard({
  enquiry,
  updating,
  onStatusChange,
  onInspect,
}: {
  enquiry: Enquiry;
  updating: boolean;
  onStatusChange: (id: string, status: EnquiryStatus) => void;
  onInspect: () => void;
}) {
  return (
    <article className="rounded-xl border border-slate-300 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#060a14]/70">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-bold text-slate-900 dark:text-white">{enquiry.name}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{enquiry.company}</p>
        </div>
        <StatusPill status={enquiry.status} />
      </div>
      <p className="mt-3 text-xs font-bold text-blue-700 dark:text-cyan-300">{enquiry.service}</p>
      <p className="mt-2 text-xs leading-5 text-slate-800 dark:text-slate-300 font-medium line-clamp-2">{enquiry.message}</p>
      <div className="mt-4 flex items-center justify-between border-t border-slate-300 dark:border-white/10 pt-3">
        <Button variant="ghost" size="sm" onClick={onInspect} className="gap-1 text-xs font-bold text-slate-800 dark:text-slate-300">
          <Eye className="h-3.5 w-3.5" />
          Inspect
        </Button>
        <StatusControl enquiry={enquiry} updating={updating} onStatusChange={onStatusChange} />
      </div>
    </article>
  );
}

function StatusControl({
  enquiry,
  updating,
  onStatusChange,
}: {
  enquiry: Enquiry;
  updating: boolean;
  onStatusChange: (id: string, status: EnquiryStatus) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <select
        aria-label={`Update status for ${enquiry.name}`}
        value={enquiry.status}
        disabled={updating}
        onChange={(event) => onStatusChange(enquiry._id, event.target.value as EnquiryStatus)}
        className="h-8 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold dark:border-white/12 dark:bg-[#030712] dark:text-white px-2.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:opacity-50 shadow-sm"
      >
        {ENQUIRY_STATUSES.map((item) => (
          <option key={item} value={item} className="bg-white text-slate-900 dark:bg-[#060a14] dark:text-white">
            {item.replace("-", " ")}
          </option>
        ))}
      </select>
      {updating ? <Loader2 aria-hidden className="h-4 w-4 animate-spin text-blue-700 dark:text-cyan-300" /> : null}
    </div>
  );
}

function AdminSkeleton() {
  return (
    <main id="main-content" className="min-h-screen bg-background px-5 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Skeleton className="h-12 w-72" />
        <Skeleton className="h-11 w-full" />
        <AdminTableSkeleton />
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  capitalize = false,
}: {
  label: string;
  value: string | number;
  capitalize?: boolean;
}) {
  return (
    <div className="glass-panel-abnormal rounded-xl p-5 shadow-sm backdrop-blur-2xl border border-slate-300 bg-white">
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-400">{label}</p>
      <p className={`mt-2 text-3xl font-black text-slate-900 dark:text-white ${capitalize ? "capitalize" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function AdminTableSkeleton() {
  return (
    <div className="space-y-4 p-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-16 w-full" />
      ))}
    </div>
  );
}
