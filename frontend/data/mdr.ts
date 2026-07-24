import {
  Activity,
  AlarmClockCheck,
  Binary,
  Bot,
  BrainCircuit,
  Building2,
  CheckCircle2,
  CircleGauge,
  CloudCog,
  FileSearch,
  Fingerprint,
  Gauge,
  Globe2,
  Headphones,
  Layers3,
  LockKeyhole,
  Radar,
  ShieldCheck,
  ShieldEllipsis,
  Siren,
  Sparkles,
  TerminalSquare,
  Workflow,
  Zap,
} from "lucide-react";

export const navItems = [
  { label: "Services", href: "#services" },
  { label: "Workflow", href: "#workflow" },
  { label: "Outcomes", href: "#benefits" },
  { label: "FAQ", href: "#faq" },
];

export const services = [
  {
    title: "24x7 Managed Detection",
    description:
      "Continuous alert triage, correlation, and escalation across endpoint, identity, cloud, network, and SaaS telemetry.",
    icon: Radar,
  },
  {
    title: "Threat Hunting",
    description:
      "Hypothesis-driven hunts mapped to MITRE ATT&CK, campaign behavior, and environment-specific risk.",
    icon: FileSearch,
  },
  {
    title: "Incident Response",
    description:
      "Containment-ready response runbooks, forensic evidence capture, executive briefings, and recovery guidance.",
    icon: Siren,
  },
  {
    title: "Security Platform Management",
    description:
      "Expert tuning for SIEM, XDR, EDR, SOAR, firewall, email, cloud, and vulnerability platforms.",
    icon: CloudCog,
  },
  {
    title: "Managed SIEM",
    description:
      "Centralized log management, normalization, tuning, and alert engineering for modern security operations.",
    icon: ShieldCheck,
  },
  {
    title: "Endpoint Detection & Response (EDR)",
    description:
      "Advanced endpoint telemetry monitoring, behavioral analytics, and rapid containment capabilities.",
    icon: ShieldEllipsis,
  },
  {
    title: "Cloud Security Monitoring",
    description:
      "Detection and response for Azure, AWS, and GCP identity, workload, and configuration risks.",
    icon: Globe2,
  },
  {
    title: "Microsoft Defender Management",
    description:
      "Security configuration, alert tuning, incident response support, and platform optimization for Defender.",
    icon: ShieldCheck,
  },
  {
    title: "Vulnerability Management",
    description:
      "Risk-based vulnerability assessment, prioritization, and remediation tracking across your estate.",
    icon: CircleGauge,
  },
  {
    title: "Security Operations Center (SOC)",
    description:
      "24x7 analyst-led monitoring, validation, escalation, and reporting for enterprise environments.",
    icon: Activity,
  },
  {
    title: "Security Awareness Training",
    description:
      "Phishing simulations, training content, and user-risk reduction programs for staff resilience.",
    icon: BrainCircuit,
  },
  {
    title: "Email Security",
    description:
      "Protection against phishing, impersonation, malware, and business email compromise.",
    icon: Layers3,
  },
  {
    title: "Identity & Access Management (IAM)",
    description:
      "Identity governance, access reviews, MFA-hardening, and suspicious sign-in monitoring.",
    icon: Fingerprint,
  },
  {
    title: "Compliance & Risk Assessment",
    description:
      "Control mapping, policy alignment, audit readiness, and executive risk reporting support.",
    icon: Gauge,
  },
  {
    title: "Digital Forensics",
    description:
      "Evidence collection, timeline reconstruction, root cause analysis, and incident support services.",
    icon: FileSearch,
  },
];

export const features = [
  { label: "ATT&CK aligned detections", icon: Binary },
  { label: "Cloud and identity analytics", icon: Fingerprint },
  { label: "Zero-trust response playbooks", icon: LockKeyhole },
  { label: "Executive risk reporting", icon: CircleGauge },
  { label: "Automation-ready triage", icon: Bot },
  { label: "Compliance evidence trails", icon: Layers3 },
];

export const benefits = [
  {
    title: "Reduce alert fatigue",
    description:
      "Normalize telemetry, suppress duplicates, and escalate only validated incidents with clear context.",
    metric: "62%",
  },
  {
    title: "Improve response speed",
    description:
      "Pre-approved containment actions and escalation paths help teams move decisively when minutes matter.",
    metric: "<15m",
  },
  {
    title: "Raise control maturity",
    description:
      "Monthly posture reviews translate adversary behavior into measurable hardening priorities.",
    metric: "24x7",
  },
];

export const workflow = [
  {
    title: "Onboard Telemetry",
    description:
      "Connect signal sources, validate ingestion quality, and document the crown-jewel asset map.",
    icon: Workflow,
  },
  {
    title: "Tune Detection Logic",
    description:
      "Baseline business activity, calibrate detections, and align severity to your operating model.",
    icon: Gauge,
  },
  {
    title: "Hunt and Investigate",
    description:
      "Run daily investigations and proactive hunts across identity, endpoint, network, and cloud.",
    icon: BrainCircuit,
  },
  {
    title: "Respond and Improve",
    description:
      "Execute runbooks, deliver lessons learned, and continuously mature resilience controls.",
    icon: CheckCircle2,
  },
];

export const differentiators = [
  {
    title: "Enterprise-first delivery",
    description:
      "Built for regulated, distributed, and hybrid environments where governance and evidence matter.",
    icon: Building2,
  },
  {
    title: "Analyst-led intelligence",
    description:
      "Senior responders review high-impact signals and map attacker behavior to business exposure.",
    icon: ShieldEllipsis,
  },
  {
    title: "Vendor-neutral operations",
    description:
      "ACPL works across your current security stack instead of forcing a rip-and-replace motion.",
    icon: Sparkles,
  },
  {
    title: "Local accountability",
    description:
      "Dedicated escalation paths, service governance, and review cadences for Indian and global teams.",
    icon: Headphones,
  },
];

export const stats = [
  { value: "24x7", label: "security monitoring" },
  { value: "15+", label: "enterprise security practices" },
  { value: "99.9%", label: "target platform availability" },
  { value: "40+", label: "integrations supported" },
];

export const faqs = [
  {
    question: "How quickly can ACPL onboard MDR?",
    answer:
      "Most environments start with telemetry discovery, access setup, and critical use-case tuning in the first two weeks, followed by phased maturity improvements.",
  },
  {
    question: "Do we need to replace our existing SIEM or EDR?",
    answer:
      "No. ACPL is vendor-neutral and can operate across your existing stack while recommending improvements where coverage gaps exist.",
  },
  {
    question: "What happens during a confirmed incident?",
    answer:
      "ACPL validates scope, severity, impact, affected assets, containment options, and communication paths before driving the agreed incident runbook.",
  },
  {
    question: "Can the service support compliance reporting?",
    answer:
      "Yes. Reports can include alert handling, response timelines, control gaps, investigation evidence, and executive-ready risk summaries.",
  },
];

export const heroSignals = [
  { label: "Identity drift", value: "contained", icon: ShieldCheck },
  { label: "Endpoint burst", value: "triaged", icon: Activity },
  { label: "Cloud anomaly", value: "investigating", icon: Globe2 },
  { label: "Response SLA", value: "live", icon: AlarmClockCheck },
  { label: "Playbooks", value: "armed", icon: TerminalSquare },
  { label: "Containment", value: "ready", icon: Zap },
];
