"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { services } from "@/data/mdr";
import { apiFetch, ApiError } from "@/services/api-client";
import { contactSchema, type ContactInput } from "@/lib/validation";

type SubmitState = "idle" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const { success, error: toastError } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      service: services[0].title,
      message: "",
    },
  });

  const messageValue = watch("message", "");

  async function onSubmit(values: ContactInput) {
    setState("idle");
    setFeedback("");

    try {
      await apiFetch<{ message: string; data: { id: string; status: string } }>("/contact", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const successMsg = "Assessment request received. An ACPL security specialist will contact you shortly.";
      setState("success");
      setFeedback(successMsg);
      success("Request Submitted", successMsg);

      reset({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: services[0].title,
        message: "",
      });
    } catch (caughtError) {
      const errMsg =
        caughtError instanceof ApiError
          ? caughtError.message
          : "Could not submit assessment request. Please check API server connection.";

      setState("error");
      setFeedback(errMsg);
      toastError("Submission Failed", errMsg);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-panel-abnormal rounded-2xl p-6 shadow-panel backdrop-blur-2xl md:p-8"
      noValidate
    >
      <div className="mb-6 flex items-start gap-4 border-b border-slate-200 dark:border-white/10 pb-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-300 shadow-sm">
          <ShieldCheck aria-hidden className="h-6 w-6" />
        </span>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Request MDR Assessment</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Share your environment priorities for a tailored telemetry & coverage strategy.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Full Name *" error={errors.name?.message}>
          <Input
            id="contact-name"
            placeholder="e.g. Rahul Sharma"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={errors.name ? "border-red-400 focus-visible:ring-red-400" : "border-slate-300 bg-white text-slate-900 dark:border-white/12 dark:bg-[#030712] dark:text-white focus-visible:ring-red-400"}
            {...register("name")}
          />
        </Field>

        <Field id="contact-email" label="Business Email *" error={errors.email?.message}>
          <Input
            id="contact-email"
            type="email"
            placeholder="name@company.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={errors.email ? "border-red-400 focus-visible:ring-red-400" : "border-slate-300 bg-white text-slate-900 dark:border-white/12 dark:bg-[#030712] dark:text-white focus-visible:ring-red-400"}
            {...register("email")}
          />
        </Field>

        <Field id="contact-company" label="Company Name *" error={errors.company?.message}>
          <Input
            id="contact-company"
            placeholder="e.g. Acme Enterprise Solutions"
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "contact-company-error" : undefined}
            className={errors.company ? "border-red-400 focus-visible:ring-red-400" : "border-slate-300 bg-white text-slate-900 dark:border-white/12 dark:bg-[#030712] dark:text-white focus-visible:ring-red-400"}
            {...register("company")}
          />
        </Field>

        <Field id="contact-phone" label="Phone Number *" error={errors.phone?.message}>
          <Input
            id="contact-phone"
            type="tel"
            placeholder="+91 98765 43210"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            className={errors.phone ? "border-red-400 focus-visible:ring-red-400" : "border-slate-300 bg-white text-slate-900 dark:border-white/12 dark:bg-[#030712] dark:text-white focus-visible:ring-red-400"}
            {...register("phone")}
          />
        </Field>

        <Field id="contact-service" label="Service Interest *" error={errors.service?.message}>
          <select
            id="contact-service"
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "contact-service-error" : undefined}
            className={`flex h-11 w-full rounded-md border bg-white text-slate-900 dark:bg-[#030712] dark:text-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 ${
              errors.service ? "border-red-400 focus-visible:ring-red-400" : "border-slate-300 dark:border-white/12 focus-visible:ring-red-400"
            }`}
            {...register("service")}
          >
            {services.map((service) => (
              <option key={service.title} value={service.title} className="bg-white text-slate-900 dark:bg-[#060a14] dark:text-white">
                {service.title}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field
            id="contact-message"
            label="Security Priorities *"
            error={errors.message?.message}
            extra={
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {messageValue.length}/1200 chars
              </span>
            }
          >
            <Textarea
              id="contact-message"
              placeholder="Detail your operational goals, e.g., 24x7 SOC coverage, Microsoft Defender integration, AWS cloud threat response, custom SLA..."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className={`min-h-[110px] bg-white text-slate-900 dark:bg-[#030712] dark:text-white ${errors.message ? "border-red-400 focus-visible:ring-red-400" : "border-slate-300 dark:border-white/12 focus-visible:ring-red-400"}`}
              {...register("message")}
            />
          </Field>
        </div>
      </div>

      {state === "success" ? (
        <div className="mt-5 flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-800 dark:text-emerald-200">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>{feedback}</span>
        </div>
      ) : null}

      {state === "error" ? (
        <div className="mt-5 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-800 dark:text-red-200">
          {feedback}
        </div>
      ) : null}

      <Button
        type="submit"
        className="mt-6 w-full gap-2 font-bold bg-red-600 hover:bg-red-500 text-white shadow-sm border-0"
        size="lg"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
            Submitting Request...
          </>
        ) : (
          <>
            Request Consultation
            <ArrowRight aria-hidden className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  extra,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  extra?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {label}
        </Label>
        {extra}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-500 dark:text-red-400 animate-in fade-in">
          {error}
        </p>
      ) : null}
    </div>
  );
}
