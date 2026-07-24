import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Mail,
  Phone,
  Shield,
  Activity,
  ShieldAlert,
  Radio,
  Terminal,
  Cpu,
  FileText,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  benefits,
  features,
  heroSignals,
  stats,
  workflow,
} from "@/data/mdr";
import { siteConfig } from "@/config/site";
import dynamic from "next/dynamic";

const FaqSearch = dynamic(
  () => import("@/components/marketing/faq-search").then((m) => m.FaqSearch),
  {
    loading: () => (
      <section id="faq" className="relative px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 max-w-md">
            <div className="h-12 rounded bg-slate-100/60 dark:bg-white/[0.03]" />
          </div>
        </div>
      </section>
    ),
  },
);

const ContactForm = dynamic(
  () => import("@/components/marketing/contact-form").then((m) => m.ContactForm),
  { loading: () => <div className="h-80" /> },
);

export function MdrPage() {
  return (
    <main id="main-content" className="relative overflow-hidden bg-background">
      <div aria-hidden className="cyber-grid pointer-events-none fixed inset-0 opacity-80" />
      <div aria-hidden className="noise pointer-events-none fixed inset-0 opacity-[0.035]" />
      <Hero />
      <PartnerMarquee />
      <ServicesBento />
      <FeaturesMatrix />
      <Benefits />
      <Workflow />
      <DifferentiatorMatrix />
      <Statistics />
      <FaqSearch />
      <Contact />
      <FooterCTA />
      <Footer />
    </main>
  );
}

function Hero() {
  const threatSignals = [
    {
      title: "Credential Access Anomaly",
      vector: "Azure AD / Okta OAuth Token Theft",
      severity: "CRITICAL 98/100",
      status: "AUTO-CONTAINED",
      action: "Revoked OAuth Grant & Isolated Host",
      time: "0.4s ago",
    },
    {
      title: "Ransomware Process Injection",
      vector: "Win32/LSASS Memory Tampering",
      severity: "HIGH 91/100",
      status: "ISOLATED",
      action: "Host Network Adapter Disconnected",
      time: "2.1s ago",
    },
    {
      title: "Cloud Data Exfiltration Vector",
      vector: "AWS S3 Privilege Escalation",
      severity: "HIGH 89/100",
      status: "BLOCKED",
      action: "IAM Policy Reverted & Alerted SOC",
      time: "4.8s ago",
    },
  ];

  const currentSignal = threatSignals[0];

  return (
    <section className="relative min-h-[94vh] px-5 pb-16 pt-28 md:pt-36">
      <div className="absolute inset-x-0 top-16 h-[34rem] bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(99,102,241,0.24),transparent_44rem)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-3xl animate-fade-up">
          <h1 className="mt-6 text-4xl font-black leading-[1.04] tracking-tighter text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            Autonomous Cyber Defense. <br />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-emerald-400 bg-clip-text text-transparent">
              Human Expertise.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            ACPL Systems combines 24x7 India SOC threat hunters, automated telemetry correlation, and response-ready containment to isolate adversaries in real time.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#contact"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border-0 bg-indigo-600 px-6 text-base font-bold text-white shadow-sm transition-colors hover:bg-indigo-500 dark:shadow-glow-indigo"
            >
              Talk to ACPL MDR Team
              <ArrowRight aria-hidden className="h-5 w-5" />
            </Link>
            <Link
              href="#workflow"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-6 text-base font-bold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
            >
              Explore SOC Pipeline
              <ChevronRight aria-hidden className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
            {heroSignals.map((signal) => (
              <div
                key={signal.label}
                className="glass-panel-abnormal rounded-xl p-4 transition-all hover:border-indigo-500/40"
              >
                <signal.icon aria-hidden className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{signal.label}</p>
                <p className="text-sm font-bold capitalize text-slate-900 dark:text-white">{signal.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Tab Interactive SOC Command Visualizer Card */}
        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div aria-hidden className="absolute -inset-6 rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="glass-panel-abnormal relative rounded-2xl p-6 shadow-panel backdrop-blur-2xl">
            <div aria-hidden className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400 via-cyan-400 to-transparent" />
            
            {/* Visualizer Header Tabs */}
            <div className="flex items-center justify-between border-b border-slate-300 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-600/40 bg-blue-50 text-blue-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <Terminal className="h-4 w-4" />
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">ACPL Command Visualizer</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/40 bg-emerald-50 px-2.5 py-1 text-[11px] font-mono font-bold text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                <Radio className="h-3 w-3 animate-pulse text-emerald-600" />
                LIVE SOC
              </span>
            </div>

            {/* View Switching Tabs */}
            <div className="mt-4 flex rounded-xl border border-slate-300 bg-slate-100 dark:border-white/10 dark:bg-[#030712] p-1 text-xs font-semibold">
              <span
                className={cn(
                  "flex-1 rounded-lg py-2 transition-all font-bold",
                  "bg-blue-600 text-white shadow-sm dark:shadow-glow-indigo"
                )}
              >
                Threat Stream
              </span>
              <span
                className={cn(
                  "flex-1 rounded-lg py-2 transition-all font-bold",
                  "text-slate-700 dark:text-slate-400"
                )}
              >
                ATT&CK Matrix
              </span>
              <span
                className={cn(
                  "flex-1 rounded-lg py-2 transition-all font-bold",
                  "text-slate-700 dark:text-slate-400"
                )}
              >
                SOC Playbook
              </span>
            </div>

            {/* TAB 1: THREAT STREAM */}
            <div className="mt-4">
              <div className="mt-4 animate-in fade-in">
                <div className="grid grid-cols-3 gap-2">
                  {threatSignals.map((sig, idx) => (
                    <div
                      key={sig.title}
                      className={cn(
                        "rounded-lg border p-2.5 text-left transition-all text-xs font-medium",
                        idx === 0
                          ? "border-blue-600 bg-blue-50 text-blue-900 dark:border-indigo-400 dark:bg-indigo-500/20 dark:text-white shadow-sm dark:shadow-glow-indigo"
                          : "border-slate-300 bg-slate-50 text-slate-800 hover:border-slate-400 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-400 dark:hover:border-white/20 dark:hover:text-slate-200"
                      )}
                    >
                      <p className="font-mono text-[10px] font-bold text-blue-700 dark:text-indigo-300">SIGNAL 0{idx + 1}</p>
                      <p className="mt-1 font-bold truncate text-slate-900 dark:text-slate-100">{sig.title}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-slate-300 bg-slate-50 p-4 font-mono text-xs dark:border-white/10 dark:bg-[#030712]/90">
                  <div className="flex items-center justify-between border-b border-slate-300 dark:border-white/10 pb-2.5">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      {currentSignal.title}
                    </span>
                    <span className="rounded bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-700 border border-red-300 dark:border-red-500/30 dark:bg-red-500/20 dark:text-red-300">
                      {currentSignal.severity}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 text-slate-800 dark:text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold">Vector:</span>
                      <span className="text-blue-700 dark:text-cyan-300 font-bold">{currentSignal.vector}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold">Action:</span>
                      <span className="text-emerald-800 dark:text-emerald-400 font-bold">{currentSignal.action}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold">Status:</span>
                      <span className="text-indigo-800 dark:text-indigo-300 font-bold">{currentSignal.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: "Signal Accuracy", value: "99.98%" },
                { label: "Containment SLA", value: "< 15 Mins" },
                { label: "ATT&CK Mapping", value: "100% Full" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-slate-300 bg-slate-50 p-3 text-center dark:border-white/10 dark:bg-white/[0.03]">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold">{item.label}</p>
                  <p className="mt-1 text-xs font-black text-slate-900 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerMarquee() {
  const partners = [
    "Microsoft 365 Defender",
    "AWS Security Hub",
    "Azure Sentinel",
    "CrowdStrike Falcon",
    "SentinelOne Singularity",
    "Palo Alto Cortex XDR",
    "Splunk Enterprise",
    "Okta Identity Security",
  ];

  return (
    <section className="relative border-y border-slate-200 bg-slate-100/70 dark:border-white/10 dark:bg-[#030712]/60 py-8">
      <div className="mx-auto max-w-7xl px-5 text-center">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 font-bold">
          Native Telemetry Fit Across Enterprise Security Ecosystems
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {partners.map((partner) => (
            <span
              key={partner}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 transition-colors hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-white"
            >
              <Check aria-hidden className="h-3.5 w-3.5 text-indigo-600 dark:text-cyan-400" />
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Linear Bento Grid Layout for Services */
function ServicesBento() {
  return (
    <Section
      id="services"
      eyebrow="Linear Bento Architecture"
      title="Detection & Response Mapped to Enterprise Risk."
      description="Full-spectrum SOC operations: continuous endpoint & cloud telemetry analysis, proactive threat hunting, and rapid active containment."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {/* Spotlight Featured Card (Spans 2 columns on desktop) */}
        <div className="glass-panel-abnormal glass-panel-hover rounded-2xl p-8 md:col-span-2 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 shadow-sm dark:shadow-glow-indigo">
              <Activity className="h-6 w-6" />
            </span>
          </div>
          <h3 className="mt-6 text-2xl font-extrabold text-slate-900 dark:text-white">
            24x7 Continuous Threat Detection & Autonomous SOC Response
          </h3>
          <p className="mt-3 text-base leading-7 text-slate-700 dark:text-slate-300 max-w-2xl">
            Real-time correlation across millions of daily telemetry events. ACPL SOC analysts validate genuine threat signals within 5 minutes and enforce host isolation within 15 minutes.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200 dark:border-white/10 pt-6">
            <div>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">SOC Location</p>
              <p className="mt-1 font-bold text-slate-900 dark:text-white">India 24x7 Dedicated</p>
            </div>
            <div>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">Response SLA</p>
              <p className="mt-1 font-bold text-emerald-700 dark:text-emerald-400">&lt; 15 Minutes</p>
            </div>
            <div>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">Signal Accuracy</p>
              <p className="mt-1 font-bold text-indigo-700 dark:text-cyan-300">99.98% Validated</p>
            </div>
          </div>
        </div>

        {/* Secondary Bento Card 1 */}
        <div className="glass-panel-abnormal glass-panel-hover rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
              <ShieldAlert className="h-6 w-6" />
            </span>
            <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">Proactive Threat Hunting</h3>
            <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
              Adversary eviction operations using custom YARA rules, memory forensics, and MITRE ATT&CK framework mapping.
            </p>
          </div>
          <Link href="#contact" className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
            <span>Explore Hunting</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Secondary Bento Card 2 */}
        <div className="glass-panel-abnormal glass-panel-hover rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              <Cpu className="h-6 w-6" />
            </span>
            <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">Cloud & Identity Protection</h3>
            <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
              Continuous monitoring of AWS, Azure, GCP, and Okta sessions to neutralize privilege escalation vectors.
            </p>
          </div>
          <Link href="#contact" className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
            <span>Cloud Telemetry</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Secondary Bento Card 3 (Spans 2 columns) */}
        <div className="glass-panel-abnormal glass-panel-hover rounded-2xl p-8 md:col-span-2 flex flex-col justify-between">
          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300">
              <FileText className="h-6 w-6" />
            </span>
            <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">Incident Response & Executive Reporting</h3>
            <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300 max-w-xl">
              Comprehensive post-incident RCA, compliance artifact generation, and executive board presentations formatted for CISOs and audit committees.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400"><Check className="h-3.5 w-3.5" /> Board Ready</span>
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400"><Check className="h-3.5 w-3.5" /> ISO 27001 Artifacts</span>
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400"><Check className="h-3.5 w-3.5" /> Forensic Memory Dumps</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

function FeaturesMatrix() {
  return (
    <Section
      id="features"
      eyebrow="Integration Matrix"
      title="Built Around Your Existing Security Ecosystem."
      description="Zero friction onboarding. ACPL MDR integrates seamlessly with your EDR, SIEM, Cloud, Identity, and Firewall telemetry."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.label}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all dark:border-white/10 dark:bg-[#060a14]/80 glass-panel-hover"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
              <feature.icon aria-hidden className="h-5 w-5" />
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{feature.label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Benefits() {
  return (
    <Section
      id="benefits"
      eyebrow="Measurable Impact"
      title="Sharper Signals. Zero False Alarms. Rapid Containment."
      description="Engineered for measurable reduction in mean time to detect (MTTD) and mean time to respond (MTTR)."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <MotionPanel key={benefit.title} className="glass-panel-abnormal glass-panel-hover relative overflow-hidden">
            <span className="text-5xl font-black tracking-tight text-gradient-indigo">
              {benefit.metric}
            </span>
            <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">{benefit.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">{benefit.description}</p>
            <div aria-hidden className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-indigo-500/10 blur-3xl" />
          </MotionPanel>
        ))}
      </div>
    </Section>
  );
}

function Workflow() {
  return (
    <Section
      id="workflow"
      eyebrow="SOC Lifecycle"
      title="Disciplined Operational Response Pipeline."
      description="From raw telemetry ingestion to active threat containment and adversary eviction."
    >
      <div className="relative grid gap-5 lg:grid-cols-4">
        {workflow.map((step, index) => {
          const isActive = index === 0;
          return (
            <div
              key={step.title}
              className={cn(
                "rounded-2xl border p-6 transition-all duration-300 backdrop-blur-xl glass-panel-abnormal",
                isActive
                  ? "border-indigo-600 bg-indigo-50/80 dark:border-indigo-400 dark:bg-indigo-950/30 shadow-sm dark:shadow-glow-indigo"
                  : "border-slate-200 bg-white dark:border-white/10 dark:bg-[#060a14]/70 hover:border-slate-300 dark:hover:border-white/20",
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl border transition-colors",
                    isActive
                      ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-600 dark:text-indigo-200"
                      : "border-slate-200 bg-slate-100 text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300",
                  )}
                >
                  <step.icon aria-hidden className="h-6 w-6" />
                </span>
                <span className="font-mono text-xs font-bold text-indigo-600 dark:text-amber-400">STAGE 0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">{step.description}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* Differentiator Matrix: ACPL 24x7 India SOC vs Generic Automated Alert Tools */
function DifferentiatorMatrix() {
  const rows = [
    {
      feature: "SOC Operating Model",
      acpl: "24x7 Dedicated Senior India SOC Analysts",
      generic: "Automated Bot Email Alerts Only",
    },
    {
      feature: "Response SLA",
      acpl: "< 15 Minutes Active Host Containment",
      generic: "4 to 24 Hours Unverified Notification",
    },
    {
      feature: "Signal Noise Reduction",
      acpl: "99.98% Validated (Zero Alert Fatigue)",
      generic: "Thousands of Unfiltered False Positives",
    },
    {
      feature: "Stack Flexibility",
      acpl: "Integrates with Microsoft, CrowdStrike, AWS, Splunk",
      generic: "Locked into Proprietary Vendor EDR",
    },
  ];

  return (
    <Section
      id="why-acpl"
      eyebrow="Competitive Matrix"
      title="ACPL Enterprise SOC vs. Generic Automated Alert Tools."
      description="Comparing hands-on engineering depth and SLA guarantees against generic SaaS alert tools."
    >
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/90 p-6 dark:border-white/10 dark:bg-[#060a14]/80 glass-panel-abnormal">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="pb-4 font-bold">Operational Metric</th>
              <th className="pb-4 font-bold text-indigo-600 dark:text-indigo-300">ACPL MDR (24x7 India SOC)</th>
              <th className="pb-4 font-bold text-slate-500 dark:text-slate-400">Generic Alert Software</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-white/10">
            {rows.map((row) => (
              <tr key={row.feature} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                <td className="py-4 font-bold text-slate-900 dark:text-white">{row.feature}</td>
                <td className="py-4 font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  {row.acpl}
                </td>
                <td className="py-4 text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <XCircle className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
                  {row.generic}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function Statistics() {
  return (
    <section className="relative px-5 py-16">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-slate-300 bg-white p-8 shadow-md dark:border-indigo-500/30 dark:bg-gradient-to-r dark:from-indigo-950/40 dark:via-[#060a14]/90 dark:to-cyan-950/40 dark:shadow-panel backdrop-blur-2xl md:p-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} aria-label={`${stat.value} ${stat.label}`} className="text-center sm:text-left">
              <span className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">{stat.value}</span>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-indigo-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative px-5 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="mt-6 max-w-2xl text-4xl font-black leading-tight text-slate-900 dark:text-white md:text-5xl">
            Bring ACPL into your security operations center.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-700 dark:text-slate-300">
            Connect with an ACPL MDR specialist to review your current telemetry gaps, EDR coverage, and incident response readiness.
          </p>
          
          {/* ISO / SOC2 Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
              ISO 27001 Certified
            </span>
            <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-mono font-bold text-indigo-700 dark:text-cyan-300">
              SOC 2 Type II Compliant
            </span>
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-mono font-bold text-blue-700 dark:text-indigo-300">
              CERT-In Empanelled
            </span>
          </div>

          <div className="mt-10 grid gap-4">
            <Link
              className="flex items-center gap-3.5 text-sm font-bold text-slate-800 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-300 transition-colors"
              href={`mailto:${siteConfig.links.email}`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-indigo-600 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-indigo-300">
                <Mail aria-hidden className="h-5 w-5" />
              </span>
              {siteConfig.links.email}
            </Link>
            <Link
              className="flex items-center gap-3.5 text-sm font-bold text-slate-800 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-300 transition-colors"
              href={`tel:${siteConfig.links.phone.replace(/\s/g, "")}`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-indigo-600 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-indigo-300">
                <Phone aria-hidden className="h-5 w-5" />
              </span>
              {siteConfig.links.phone}
            </Link>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function FooterCTA() {
  return (
    <section className="relative px-5 py-12">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-300 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-8 shadow-xl dark:border-indigo-500/30 md:p-12">
        <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">
              Ready to neutralize cyber threats before impact?
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-300">
              Schedule a technical telemetry assessment with senior ACPL India SOC engineers today.
            </p>
          </div>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-colors duration-200 hover:bg-blue-500"
            >
              Request MDR Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-[#030712] px-5 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-slate-600 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
            <Shield aria-hidden className="h-5 w-5" />
          </span>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">{siteConfig.company} Managed Detection and Response</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Enterprise Cybersecurity Platform • 24x7 India SOC</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {["Security Operations", "24x7 Threat Hunting", "Active Containment", "ISO 27001 Certified"].map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <Check aria-hidden className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative px-5 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-cyan-400">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function MotionPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-white/10 bg-[#060a14]/80 p-6 shadow-panel backdrop-blur-xl transition-all duration-300",
        className,
      )}
    >
      {children}
    </article>
  );
}
