import { Bot, CloudSun, DatabaseZap, Lightbulb, Radar, ShieldAlert, Workflow, Wrench } from "lucide-react";

export const capabilities = [
  "Artificial Intelligence",
  "GIS & Geospatial Intelligence",
  "Digital Twins",
  "Infrastructure Analytics",
  "Climate Intelligence",
  "Remote Monitoring",
  "SaaS Platforms",
  "Data Engineering",
  "Enterprise Software",
];

export const processSteps = [
  {
    title: "Data collection",
    short: "Data",
    icon: DatabaseZap,
    description: "Collect trusted multi-source data streams from field systems and public agencies.",
    points: ["IoT sensors", "Government datasets", "Satellite and weather APIs"],
  },
  {
    title: "AI processing",
    short: "AI",
    icon: Bot,
    description: "Run machine-learning pipelines that structure, classify, and prioritise risk signals.",
    points: ["Machine learning models", "Risk classification", "Pattern detection"],
  },
  {
    title: "Insights generation",
    short: "Insights",
    icon: Lightbulb,
    description: "Convert complex datasets into strategic intelligence for leadership and operations teams.",
    points: ["KPI dashboards", "Risk alerts", "Predictive analytics"],
  },
  {
    title: "Decision support",
    short: "Action",
    icon: Workflow,
    description: "Activate guided response workflows with recommendations, alerts, and execution visibility.",
    points: ["Real-time alerts", "Recommendations", "Operational workflows"],
  },
];

export const useCases = [
  { title: "Infrastructure monitoring", description: "Track structural risk and maintenance priorities across critical assets.", icon: Wrench },
  { title: "Climate risk analysis", description: "Identify location-level climate threats and early warning requirements.", icon: ShieldAlert },
  { title: "Energy optimisation", description: "Surface demand and generation insights to improve energy efficiency outcomes.", icon: CloudSun },
  { title: "Sustainability reporting", description: "Generate investor-ready sustainability metrics with auditable data trails.", icon: Radar },
];

export const corporateFacts = [
  { label: "Company name", value: "RESILIENCE TECHNOLOGIES LABS (SMC-PRIVATE) LIMITED" },
  { label: "Status", value: "Officially incorporated under the Companies Act, 2017." },
  { label: "Regulator", value: "Registered with the Securities and Exchange Commission of Pakistan (SECP)." },
  { label: "Corporate Unique Identification (CUI)", value: "0343147" },
  { label: "Company type", value: "SMC-Private Limited (Limited by Shares)" },
  { label: "Incorporation date", value: "30 June 2026" },
];

export const contact = {
  email: "shanu1998end@gmail.com",
  emailHref: "https://mail.google.com/mail/?view=cm&fs=1&to=shanu1998end@gmail.com",
  phone: "+92 340 3318127",
  phoneHref: "tel:+923403318127",
  founderLinkedIn: "https://www.linkedin.com/in/shahnawaz-2b9025130",
  companyLinkedIn: "https://www.linkedin.com/in/solutions-three-sixty-degree-a32913405/",
  github: "https://github.com/shanu222",
  instagram: "https://www.instagram.com/resilience_technologies_labs?igsh=MTMxM243ODBwbGFlNQ%3D%3D&utm_source=qr",
};
