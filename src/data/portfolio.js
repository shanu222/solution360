/**
 * RTL Enterprise Product Portfolio
 * Scalable domain taxonomy for 100+ products.
 * Hierarchy: Deployment Platform → Business Domain → Application
 */

export const STATUS = {
  LIVE: "Live",
  DEVELOPMENT: "Development",
  INTERNAL: "Internal",
  ARCHIVED: "Archived",
  PLANNED: "Planned",
};

/** Top-level deployment platforms (Web / Play / App Store). */
export const deploymentPlatforms = [
  {
    id: "web",
    slug: "web-applications",
    name: "Web Applications",
    shortName: "Web",
    description: "Browser-based products and enterprise web platforms available online.",
    icon: "Globe",
    badgeLabel: "Web",
    badgeEmoji: "🌐",
    ctaLabel: "Visit Website",
    accent: "from-cyan-500/20 via-sky-400/10 to-blue-500/20",
    glow: "rgba(6,182,212,0.35)",
    border: "border-cyan-300/50 dark:border-cyan-400/30",
  },
  {
    id: "android",
    slug: "google-play-store",
    name: "Google Play Store",
    shortName: "Android",
    description: "Android applications published on the Google Play Store.",
    icon: "Smartphone",
    badgeLabel: "Android",
    badgeEmoji: "📱",
    ctaLabel: "Open on Google Play",
    accent: "from-emerald-500/20 via-green-400/10 to-lime-400/20",
    glow: "rgba(16,185,129,0.35)",
    border: "border-emerald-300/50 dark:border-emerald-400/30",
  },
  {
    id: "ios",
    slug: "apple-app-store",
    name: "Apple App Store",
    shortName: "iOS",
    description: "iOS applications published on the Apple App Store.",
    icon: "Apple",
    badgeLabel: "iOS",
    badgeEmoji: "🍎",
    ctaLabel: "Open on App Store",
    accent: "from-slate-500/20 via-zinc-400/10 to-sky-400/15",
    glow: "rgba(148,163,184,0.35)",
    border: "border-slate-300/60 dark:border-slate-400/30",
  },
];

export function getDeployments(app) {
  if (app?.deployments && Object.keys(app.deployments).length > 0) {
    return app.deployments;
  }
  if (app?.href) return { web: app.href };
  // Shared/internal catalog entries live under Web Applications
  if (app?.status === STATUS.INTERNAL) return { web: null };
  return {};
}

export function getPlatformAvailability(app) {
  const deployments = getDeployments(app);
  return deploymentPlatforms
    .filter((p) => Object.prototype.hasOwnProperty.call(deployments, p.id))
    .map((p) => p.id);
}

export function resolveAppForPlatform(app, platformId) {
  const deployments = getDeployments(app);
  const platform = deploymentPlatforms.find((p) => p.id === platformId);
  const href = deployments[platformId] || null;
  return {
    ...app,
    href,
    activePlatformId: platformId,
    platformAvailability: getPlatformAvailability(app),
    ctaLabel: platform?.ctaLabel || "Visit Platform",
  };
}

export function countAppsOnPlatform(platformId) {
  return getAllApplications().filter((app) => Object.prototype.hasOwnProperty.call(getDeployments(app), platformId)).length;
}

export function getDomainsForPlatform(platformId, { includeEmpty = false, includeFuture = false } = {}) {
  const source = includeFuture ? allDomains : domains;
  return source
    .map((domain) => {
      const apps = (domain.applications || [])
        .filter((app) => Object.prototype.hasOwnProperty.call(getDeployments(app), platformId))
        .map((app) => resolveAppForPlatform(app, platformId));
      return { ...domain, applications: apps };
    })
    .filter((domain) => {
      if (domain.applications.length > 0) return true;
      if (!includeEmpty) return false;
      // Empty capacity folders only appear under Web Applications
      return platformId === "web" && Boolean(domain.planned);
    });
}

export function getDeploymentPlatform(id) {
  return deploymentPlatforms.find((p) => p.id === id);
}

export const domains = [
  {
    id: "01_AI_Products",
    slug: "ai-products",
    name: "AI Products",
    shortName: "AI",
    description: "Intelligent platforms for insights, creators, philanthropy, and consumer AI experiences.",
    icon: "Brain",
    accent: "from-violet-500/20 via-fuchsia-400/10 to-cyan-400/20",
    glow: "rgba(139,92,246,0.35)",
    border: "border-violet-300/50 dark:border-violet-400/30",
    applications: [
      {
        id: "relationship-insights-ai",
        name: "Relationship Insights AI",
        folderName: "Relationship-Insights-AI",
        category: "Behavioral Intelligence",
        description:
          "AI-powered communication and behavioral intelligence platform delivering relationship insights and interaction analysis.",
        status: STATUS.LIVE,
        href: "https://ai-insight-teal.vercel.app/",
        sdgs: ["SDG 9"],
        tech: ["AI/ML", "NLP", "Analytics"],
        icon: "HeartHandshake",
      },
      {
        id: "influencer-universe",
        name: "Influencer Universe",
        folderName: "Influencer-Universe",
        category: "Creator Economy",
        description: "AI-powered creator and influencer management platform supporting campaign intelligence and analytics.",
        status: STATUS.LIVE,
        href: "https://influencer-universe.vercel.app/",
        sdgs: ["SDG 8", "SDG 9"],
        tech: ["AI/ML", "Analytics", "SaaS"],
        icon: "Sparkles",
      },
      {
        id: "virtual-hairstyle-tryon",
        name: "Virtual Hairstyle Try-On",
        folderName: "Virtual-Hairstyle-TryOn",
        category: "Computer Vision",
        description: "AI-powered visual tool enhancing digital services and user experience in consumer applications.",
        status: STATUS.LIVE,
        href: "https://virtual-hairstyle-try-on-app.vercel.app/",
        sdgs: ["SDG 8", "SDG 9"],
        tech: ["Computer Vision", "AR", "React"],
        icon: "ScanFace",
      },
      {
        id: "donor360-ai",
        name: "Donor360 AI",
        folderName: "Donor360-AI",
        category: "Philanthropic Intelligence",
        description: "AI-powered donor engagement and philanthropic intelligence platform for data-driven fundraising and impact tracking.",
        status: STATUS.LIVE,
        href: "https://donor360-ai.vercel.app/",
        sdgs: ["SDG 8", "SDG 9"],
        tech: ["AI/ML", "CRM", "Analytics"],
        icon: "HandHeart",
      },
    ],
  },
  {
    id: "02_Resilience_and_Infrastructure",
    slug: "resilience-infrastructure",
    name: "Resilience & Infrastructure",
    shortName: "Infrastructure",
    description: "Critical infrastructure resilience, audits, early warning, green building, and national-scale platforms.",
    icon: "Building2",
    accent: "from-cyan-500/20 via-sky-400/10 to-blue-500/20",
    glow: "rgba(6,182,212,0.35)",
    border: "border-cyan-300/50 dark:border-cyan-400/30",
    applications: [
      {
        id: "infra-resilience360",
        name: "Infra Resilience360",
        folderName: "Infra-Resilience360",
        category: "Resilience Platform",
        description:
          "Developed for the National Disaster Management Authority (NDMA), Pakistan, Infra Resilience360 is an AI-powered infrastructure resilience platform supporting disaster risk reduction, resilient infrastructure planning, retrofit guidance, climate adaptation, geospatial intelligence, and engineering decision support across Pakistan.",
        status: STATUS.LIVE,
        href: "https://infra-resilience360-cloud.vercel.app/",
        deployments: {
          web: "https://infra-resilience360-cloud.vercel.app/",
          android: "https://play.google.com/store/apps/details?id=com.resilience360.mobile",
          ios: "https://apps.apple.com/pk/app/infra-resilience-360/id6780774159",
        },
        sdgs: ["SDG 9", "SDG 11", "SDG 13"],
        tech: ["GIS", "Analytics", "Cloud", "Mobile"],
        icon: "ShieldCheck",
        featured: true,
      },
      {
        id: "resilience-city-ai",
        name: "Resilience City AI",
        folderName: "Resilience-City-AI",
        category: "Geo-AI Command Center",
        description:
          "Pakistan's AI-powered geo-intelligence platform integrating geospatial analytics, climate resilience, disaster simulation, AI-assisted decision support, and immersive resilience planning into a unified command center.",
        status: STATUS.LIVE,
        href: "https://ndma-iapd-oqpl.vercel.app/",
        sdgs: ["SDG 9", "SDG 11", "SDG 13"],
        tech: ["GeoAI", "GIS", "Digital Twin", "AI", "Climate Intelligence", "Disaster Simulation"],
        icon: "Globe2",
        featured: true,
      },
      {
        id: "national-infrastructure-resilience-platform",
        name: "National Infrastructure Resilience Platform",
        folderName: "National-Infrastructure-Resilience-Platform",
        category: "National Platform",
        description:
          "Integrated infrastructure resilience platform providing asset inventories, GIS intelligence, risk analytics, and resilience planning.",
        status: STATUS.LIVE,
        href: "https://ndma-iapd.vercel.app/",
        sdgs: ["SDG 9", "SDG 11", "SDG 13"],
        tech: ["GIS", "Dashboards", "Risk Analytics"],
        icon: "Globe2",
      },
      {
        id: "infrastructure-early-warning-system",
        name: "Infrastructure Early Warning System",
        folderName: "Infrastructure-Early-Warning-System",
        category: "Monitoring & Alerts",
        description:
          "Real-time infrastructure monitoring and early warning for bridges, roads, critical facilities, hazard detection, and inspections.",
        status: STATUS.LIVE,
        href: "https://shm-mu.vercel.app/",
        sdgs: ["SDG 9", "SDG 11"],
        tech: ["IoT", "SHM", "Realtime"],
        icon: "Radar",
        featured: true,
      },
      {
        id: "georesilience-command-system",
        name: "GeoResilience Command System",
        folderName: "GeoResilience-Command-System",
        category: "Geospatial Command",
        description:
          "AI-powered geospatial resilience intelligence for disaster monitoring, scenario simulation, and emergency decision support.",
        status: STATUS.LIVE,
        href: "https://ndma-iapd-oqpl.vercel.app/",
        sdgs: ["SDG 9", "SDG 11", "SDG 13"],
        tech: ["GIS", "AI/ML", "Command Center"],
        icon: "Map",
      },
      {
        id: "darv",
        name: "DARV",
        folderName: "DARV",
        category: "Assessment & Visualization",
        description: "Digital assessment and resilience visualization platform supporting data-driven decision making.",
        status: STATUS.LIVE,
        href: "https://darv.vercel.app/",
        sdgs: ["SDG 9", "SDG 11"],
        tech: ["Visualization", "Assessment", "Analytics"],
        icon: "Layers3",
      },
      {
        id: "punjab-infrastructure-audit-platform",
        name: "Punjab Infrastructure Audit Platform",
        folderName: "Punjab-Infrastructure-Audit-Platform",
        category: "Audit & Compliance",
        description:
          "Infrastructure audit and assessment platform supporting asset management, resilience planning, and compliance monitoring.",
        status: STATUS.LIVE,
        href: "https://punjab-infrastructure-audit-platform.vercel.app/",
        sdgs: ["SDG 9", "SDG 11"],
        tech: ["Audit", "GIS", "Compliance"],
        icon: "ClipboardCheck",
      },
      {
        id: "green-building-portal",
        name: "Green Building Portal",
        folderName: "Green-Building-Portal",
        category: "Sustainability Compliance",
        description: "Platform for green building standards, compliance, and sustainable construction practices.",
        status: STATUS.LIVE,
        href: "https://gbcp-portal.vercel.app/",
        sdgs: ["SDG 11", "SDG 12"],
        tech: ["Compliance", "Scoring", "Portals"],
        icon: "Leaf",
        featured: true,
      },
      {
        id: "resilient-build-pakistan",
        name: "Resilient Build Pakistan",
        folderName: "Resilient-Build-Pakistan",
        category: "Construction Resilience",
        description: "Resilient construction and retrofit planning platform supporting safer infrastructure development.",
        status: STATUS.LIVE,
        href: "https://resilient-build-pakistan.vercel.app/",
        sdgs: ["SDG 9", "SDG 11", "SDG 13"],
        tech: ["Planning", "Retrofit", "Analytics"],
        icon: "HardHat",
      },
    ],
  },
  {
    id: "03_Disaster_Management",
    slug: "disaster-management",
    name: "Disaster Management",
    shortName: "Disaster",
    description: "Emergency coordination, disaster intelligence, and resilience operations for public agencies.",
    icon: "Siren",
    accent: "from-rose-500/20 via-orange-400/10 to-amber-400/20",
    glow: "rgba(244,63,94,0.3)",
    border: "border-rose-300/50 dark:border-rose-400/30",
    applications: [
      {
        id: "ndma-dashboard",
        name: "NDMA Dashboard",
        folderName: "NDMA-Dashboard",
        category: "National Operations",
        description: "Real-time disaster monitoring and geospatial intelligence system for climate risk management.",
        status: STATUS.LIVE,
        href: "https://ndma-geo-resilience-bashboard.vercel.app/",
        sdgs: ["SDG 11", "SDG 13"],
        tech: ["GIS", "Dashboards", "Realtime"],
        icon: "Activity",
      },
      {
        id: "rmc-portal",
        name: "RMC Portal",
        folderName: "RMC-Portal",
        category: "Coordination Portal",
        description:
          "Regional and Military Collaboration Portal supporting disaster coordination, resilience planning, and emergency management.",
        status: STATUS.LIVE,
        href: "https://rmc-portal-two.vercel.app/",
        sdgs: ["SDG 11", "SDG 16"],
        tech: ["Portals", "Collaboration", "Ops"],
        icon: "Shield",
      },
    ],
  },
  {
    id: "04_Education_and_Skills",
    slug: "education-skills",
    name: "Education & Skills",
    shortName: "Education",
    description: "AI-assisted learning and exam preparation platforms for students and civil service aspirants.",
    icon: "GraduationCap",
    accent: "from-blue-500/20 via-indigo-400/10 to-sky-400/20",
    glow: "rgba(59,130,246,0.35)",
    border: "border-blue-300/50 dark:border-blue-400/30",
    applications: [
      {
        id: "net360-preparation",
        name: "NET360 Preparation",
        folderName: "NET360-Preparation",
        category: "Entrance Prep",
        description:
          "Comprehensive NUST entry test preparation platform providing structured learning, MCQs, mock exams, analytics, AI-assisted learning, and performance tracking for engineering and university admission aspirants.",
        status: STATUS.LIVE,
        href: "https://www.net360preparation.com/",
        deployments: {
          web: "https://www.net360preparation.com/",
          android: "https://play.google.com/store/apps/details?id=com.net360prep.app",
        },
        sdgs: ["SDG 4"],
        tech: ["EdTech", "Analytics", "LMS", "Mobile"],
        icon: "BookOpenCheck",
      },
      {
        id: "css360",
        name: "CSS360",
        folderName: "CSS360",
        category: "Civil Services Prep",
        description:
          "AI-powered preparation platform for civil service aspirants, improving access to quality education and career opportunities.",
        status: STATUS.LIVE,
        href: "https://css-360.vercel.app/",
        sdgs: ["SDG 4", "SDG 8"],
        tech: ["EdTech", "AI/ML", "LMS"],
        icon: "School",
      },
    ],
  },
  {
    id: "05_Social_Impact_and_Community",
    slug: "social-impact",
    name: "Social Impact & Community",
    shortName: "Impact",
    description: "Empowerment, advocacy, and stakeholder platforms advancing inclusion and community outcomes.",
    icon: "Users",
    accent: "from-emerald-500/20 via-teal-400/10 to-cyan-400/20",
    glow: "rgba(16,185,129,0.35)",
    border: "border-emerald-300/50 dark:border-emerald-400/30",
    applications: [
      {
        id: "she360",
        name: "She360",
        folderName: "She360",
        category: "Women Empowerment",
        description:
          "AI-powered women empowerment platform for Pakistan, providing health guidance, safety support, financial inclusion, and legal awareness.",
        status: STATUS.LIVE,
        href: "https://ai-platform-for-women-empowerment.vercel.app/",
        sdgs: ["SDG 3", "SDG 5", "SDG 8", "SDG 10"],
        tech: ["AI/ML", "Chat", "Social Impact"],
        icon: "Sparkles",
        featured: true,
        flagship: true,
        badge: "FLAGSHIP PRODUCT",
      },
      {
        id: "shirkat-gah-platform",
        name: "Shirkat Gah Platform",
        folderName: "Shirkat-Gah-Platform",
        category: "NGO Digital Platform",
        description: "Women-focused digital platform supporting advocacy, inclusion, community engagement, and social development.",
        status: STATUS.LIVE,
        href: "https://shirkat-gah-web.vercel.app/",
        sdgs: ["SDG 5", "SDG 10"],
        tech: ["CMS", "Advocacy", "Community"],
        icon: "Heart",
      },
      {
        id: "stakeholder-inventory-portal",
        name: "Stakeholder Inventory Portal",
        folderName: "Stakeholder-Inventory-Portal",
        category: "Coordination",
        description: "Centralized system for managing stakeholders and resources to improve coordination and transparency.",
        status: STATUS.LIVE,
        href: "https://stakeholder-inventory-portal.vercel.app/",
        sdgs: ["SDG 9", "SDG 16"],
        tech: ["Inventory", "Portals", "Governance"],
        icon: "Network",
      },
    ],
  },
  {
    id: "06_Mobility_and_Transportation",
    slug: "mobility",
    name: "Mobility & Transportation",
    shortName: "Mobility",
    description: "Sustainable mobility solutions reducing emissions and improving shared transportation.",
    icon: "Car",
    accent: "from-sky-500/20 via-blue-400/10 to-indigo-400/20",
    glow: "rgba(14,165,233,0.35)",
    border: "border-sky-300/50 dark:border-sky-400/30",
    applications: [
      {
        id: "carpool-app",
        name: "Carpool App",
        folderName: "Carpool-App",
        category: "Shared Mobility",
        description: "Intercity ride-sharing platform reducing emissions and promoting sustainable transportation.",
        status: STATUS.LIVE,
        href: "https://car-pool-app-three.vercel.app/",
        sdgs: ["SDG 11", "SDG 13"],
        tech: ["Mobile Web", "Maps", "Matching"],
        icon: "CarFront",
      },
    ],
  },
  {
    id: "07_Health_and_Fitness",
    slug: "health-fitness",
    name: "Health & Fitness",
    shortName: "Health",
    description: "Facility operations and member engagement platforms for modern fitness centers.",
    icon: "Dumbbell",
    accent: "from-lime-500/20 via-emerald-400/10 to-teal-400/20",
    glow: "rgba(132,204,22,0.3)",
    border: "border-lime-300/50 dark:border-lime-400/30",
    applications: [
      {
        id: "active-gym-f6",
        name: "Active Gym F6",
        folderName: "Active-Gym-F6",
        category: "Gym Operations",
        description:
          "Smart gym and fitness management platform supporting memberships, attendance tracking, training plans, and facility operations.",
        status: STATUS.LIVE,
        href: "https://iactive-gym-f6.vercel.app/",
        sdgs: ["SDG 3", "SDG 8"],
        tech: ["SaaS", "Memberships", "Ops"],
        icon: "Activity",
      },
      {
        id: "arena-gym-f6",
        name: "Arena Gym F6",
        folderName: "Arena-Gym-F6",
        category: "Gym Operations",
        description: "Modern fitness center management platform for member engagement, performance tracking, and operational management.",
        status: STATUS.LIVE,
        href: "https://arena-gym-f6.vercel.app/",
        sdgs: ["SDG 3", "SDG 8"],
        tech: ["SaaS", "Memberships", "Ops"],
        icon: "Trophy",
      },
    ],
  },
  {
    id: "08_Sharing_and_Common",
    slug: "platform-common",
    name: "Platform & Common",
    shortName: "Platform",
    description: "Shared design system, libraries, auth, gateway, DevOps, and templates powering the product ecosystem.",
    icon: "Boxes",
    accent: "from-slate-500/20 via-slate-400/10 to-cyan-400/15",
    glow: "rgba(100,116,139,0.35)",
    border: "border-slate-300/60 dark:border-slate-500/40",
    isPlatform: true,
    applications: [
      {
        id: "design-system",
        name: "Design System",
        folderName: "Design-System",
        category: "Shared Platform",
        description: "RTL visual language, components, tokens, and interaction patterns for consistent product experiences.",
        status: STATUS.INTERNAL,
        tech: ["Design Tokens", "UI Kit"],
        icon: "Palette",
      },
      {
        id: "shared-libraries",
        name: "Shared Libraries",
        folderName: "Shared-Libraries",
        category: "Shared Platform",
        description: "Reusable SDKs and utilities for auth, data, analytics, and cross-product capabilities.",
        status: STATUS.INTERNAL,
        tech: ["SDK", "TypeScript"],
        icon: "Package",
      },
      {
        id: "common-components",
        name: "Common Components",
        folderName: "Common-Components",
        category: "Shared Platform",
        description: "Shared React components, layouts, and interaction primitives used across RTL products.",
        status: STATUS.INTERNAL,
        tech: ["React", "UI"],
        icon: "Component",
      },
      {
        id: "api-gateway",
        name: "API Gateway",
        folderName: "API-Gateway",
        category: "Shared Platform",
        description: "Centralized API routing, rate limiting, and service composition for enterprise products.",
        status: STATUS.INTERNAL,
        tech: ["APIs", "Gateway"],
        icon: "Waypoints",
      },
      {
        id: "authentication",
        name: "Authentication",
        folderName: "Authentication",
        category: "Shared Platform",
        description: "Unified identity, SSO, and access control services for RTL applications.",
        status: STATUS.INTERNAL,
        tech: ["SSO", "OAuth", "IAM"],
        icon: "KeyRound",
      },
      {
        id: "documentation",
        name: "Documentation",
        folderName: "Documentation",
        category: "Shared Platform",
        description: "Architecture docs, product guides, and engineering playbooks for the portfolio.",
        status: STATUS.INTERNAL,
        tech: ["Docs", "MDX"],
        icon: "FileText",
      },
      {
        id: "devops",
        name: "DevOps",
        folderName: "DevOps",
        category: "Shared Platform",
        description: "CI/CD pipelines, environments, observability, and release automation standards.",
        status: STATUS.INTERNAL,
        tech: ["CI/CD", "Cloud"],
        icon: "Rocket",
      },
      {
        id: "templates",
        name: "Templates",
        folderName: "Templates",
        category: "Shared Platform",
        description: "Starter kits and scaffolding for rapidly launching new RTL products.",
        status: STATUS.INTERNAL,
        tech: ["Boilerplates", "CLI"],
        icon: "LayoutTemplate",
      },
    ],
  },
];

/** Future capacity folders — empty by design for long-term scale. */
export const futureDomains = [
  {
    id: "09_AI_Agents",
    slug: "ai-agents",
    name: "AI Agents",
    shortName: "Agents",
    description: "Autonomous agents, copilots, and workflow automation products.",
    icon: "Bot",
    accent: "from-purple-500/15 via-violet-400/10 to-fuchsia-400/15",
    glow: "rgba(168,85,247,0.25)",
    border: "border-purple-300/40 dark:border-purple-400/25",
    applications: [],
    planned: true,
  },
  {
    id: "10_Digital_Twins",
    slug: "digital-twins",
    name: "Digital Twins",
    shortName: "Twins",
    description: "Virtual replicas of assets, cities, and infrastructure for simulation and operations.",
    icon: "Cpu",
    accent: "from-cyan-500/15 via-teal-400/10 to-blue-400/15",
    glow: "rgba(34,211,238,0.25)",
    border: "border-cyan-300/40 dark:border-cyan-400/25",
    applications: [],
    planned: true,
  },
  {
    id: "11_Climate_Intelligence",
    slug: "climate-intelligence",
    name: "Climate Intelligence",
    shortName: "Climate",
    description: "Climate risk forecasting, emissions intelligence, and adaptation decision systems.",
    icon: "CloudSun",
    accent: "from-teal-500/15 via-emerald-400/10 to-lime-400/15",
    glow: "rgba(20,184,166,0.25)",
    border: "border-teal-300/40 dark:border-teal-400/25",
    applications: [],
    planned: true,
  },
  {
    id: "12_GIS_Platforms",
    slug: "gis-platforms",
    name: "GIS Platforms",
    shortName: "GIS",
    description: "Enterprise geospatial platforms, spatial analytics, and mapping products.",
    icon: "MapPinned",
    accent: "from-blue-500/15 via-sky-400/10 to-indigo-400/15",
    glow: "rgba(59,130,246,0.25)",
    border: "border-blue-300/40 dark:border-blue-400/25",
    applications: [],
    planned: true,
  },
  {
    id: "13_Enterprise_Solutions",
    slug: "enterprise-solutions",
    name: "Enterprise Solutions",
    shortName: "Enterprise",
    description: "B2B suites for operations, compliance, workforce, and institutional digitalization.",
    icon: "Briefcase",
    accent: "from-slate-500/15 via-zinc-400/10 to-slate-400/15",
    glow: "rgba(100,116,139,0.25)",
    border: "border-slate-300/40 dark:border-slate-500/30",
    applications: [],
    planned: true,
  },
  {
    id: "14_Healthcare",
    slug: "healthcare",
    name: "Healthcare",
    shortName: "HealthTech",
    description: "Digital health access, remote monitoring, and clinical decision support.",
    icon: "Stethoscope",
    accent: "from-rose-500/15 via-pink-400/10 to-red-400/15",
    glow: "rgba(244,63,94,0.22)",
    border: "border-rose-300/40 dark:border-rose-400/25",
    applications: [],
    planned: true,
  },
  {
    id: "15_FinTech",
    slug: "fintech",
    name: "FinTech",
    shortName: "FinTech",
    description: "Financial inclusion, payments intelligence, and institutional finance platforms.",
    icon: "Wallet",
    accent: "from-amber-500/15 via-yellow-400/10 to-orange-400/15",
    glow: "rgba(245,158,11,0.25)",
    border: "border-amber-300/40 dark:border-amber-400/25",
    applications: [],
    planned: true,
  },
  {
    id: "16_Smart_Cities",
    slug: "smart-cities",
    name: "Smart Cities",
    shortName: "Cities",
    description: "Urban intelligence, civic services, and city-scale operating systems.",
    icon: "Building",
    accent: "from-indigo-500/15 via-blue-400/10 to-violet-400/15",
    glow: "rgba(99,102,241,0.25)",
    border: "border-indigo-300/40 dark:border-indigo-400/25",
    applications: [],
    planned: true,
  },
  {
    id: "17_Defense_and_Security",
    slug: "defense-security",
    name: "Defense & Security",
    shortName: "Security",
    description: "National security, situational awareness, and critical systems protection.",
    icon: "ShieldAlert",
    accent: "from-red-500/15 via-rose-400/10 to-orange-400/15",
    glow: "rgba(239,68,68,0.22)",
    border: "border-red-300/40 dark:border-red-400/25",
    applications: [],
    planned: true,
  },
  {
    id: "18_SaaS_Products",
    slug: "saas-products",
    name: "SaaS Products",
    shortName: "SaaS",
    description: "Multi-tenant commercial SaaS offerings with subscription and self-serve models.",
    icon: "Cloud",
    accent: "from-cyan-500/15 via-blue-400/10 to-sky-400/15",
    glow: "rgba(6,182,212,0.25)",
    border: "border-cyan-300/40 dark:border-cyan-400/25",
    applications: [],
    planned: true,
  },
  {
    id: "19_Agriculture_and_Food",
    slug: "agriculture-food",
    name: "Agriculture & Food",
    shortName: "Agri",
    description: "Crop intelligence, food security, and supply-chain optimization systems.",
    icon: "Wheat",
    accent: "from-green-500/15 via-lime-400/10 to-emerald-400/15",
    glow: "rgba(34,197,94,0.25)",
    border: "border-green-300/40 dark:border-green-400/25",
    applications: [],
    planned: true,
  },
  {
    id: "20_Energy_and_Utilities",
    slug: "energy-utilities",
    name: "Energy & Utilities",
    shortName: "Energy",
    description: "Clean energy optimization, grid intelligence, and utility operations platforms.",
    icon: "Zap",
    accent: "from-yellow-500/15 via-amber-400/10 to-orange-400/15",
    glow: "rgba(234,179,8,0.25)",
    border: "border-yellow-300/40 dark:border-yellow-400/25",
    applications: [],
    planned: true,
  },
];

export const comingSoonProducts = [
  {
    id: "smart-agriculture",
    name: "Smart Agriculture & Food Security Platform",
    targetDomain: "19_Agriculture_and_Food",
    sdgs: ["SDG 2", "SDG 12"],
    description: "AI-powered crop monitoring, yield prediction, and supply chain optimization.",
    status: STATUS.PLANNED,
  },
  {
    id: "digital-health",
    name: "Digital Health Access System",
    targetDomain: "14_Healthcare",
    sdgs: ["SDG 3"],
    description: "Remote health monitoring and accessible digital healthcare solutions.",
    status: STATUS.PLANNED,
  },
  {
    id: "ai-education",
    name: "AI-Powered Education Platform",
    targetDomain: "04_Education_and_Skills",
    sdgs: ["SDG 4"],
    description: "Personalized AI learning systems for accessible and adaptive education.",
    status: STATUS.PLANNED,
  },
  {
    id: "water-intelligence",
    name: "Water Resource Intelligence System",
    targetDomain: "20_Energy_and_Utilities",
    sdgs: ["SDG 6"],
    description: "Real-time monitoring and optimization of water resources.",
    status: STATUS.PLANNED,
  },
  {
    id: "clean-energy",
    name: "Clean Energy Optimization Platform",
    targetDomain: "20_Energy_and_Utilities",
    sdgs: ["SDG 7", "SDG 13"],
    description: "Optimize renewable energy usage and reduce emissions.",
    status: STATUS.PLANNED,
  },
  {
    id: "smart-infra-urban",
    name: "Smart Infrastructure & Urban Resilience Platform",
    targetDomain: "16_Smart_Cities",
    sdgs: ["SDG 9", "SDG 11"],
    description: "Infrastructure monitoring and resilient city planning tools.",
    status: STATUS.PLANNED,
  },
  {
    id: "climate-risk",
    name: "Climate Risk & Disaster Intelligence System",
    targetDomain: "11_Climate_Intelligence",
    sdgs: ["SDG 13"],
    description: "AI-driven forecasting and disaster preparedness systems.",
    status: STATUS.PLANNED,
  },
  {
    id: "green-building-compliance",
    name: "Green Building Compliance Platform",
    targetDomain: "02_Resilience_and_Infrastructure",
    sdgs: ["SDG 11", "SDG 12"],
    description: "Sustainability scoring and compliance tracking for buildings.",
    status: STATUS.PLANNED,
  },
  {
    id: "biodiversity",
    name: "Environmental Monitoring & Biodiversity Tracker",
    targetDomain: "11_Climate_Intelligence",
    sdgs: ["SDG 14", "SDG 15"],
    description: "Ecosystem monitoring and biodiversity analytics.",
    status: STATUS.PLANNED,
  },
  {
    id: "governance",
    name: "Governance & Transparency Dashboard",
    targetDomain: "13_Enterprise_Solutions",
    sdgs: ["SDG 16"],
    description: "Data-driven governance, transparency, and reporting tools.",
    status: STATUS.PLANNED,
  },
];

export const allDomains = [...domains, ...futureDomains];

export function getDomainBySlug(slug) {
  return allDomains.find((d) => d.slug === slug);
}

export function getAllApplications() {
  return domains.flatMap((domain) =>
    domain.applications.map((app) => ({
      ...app,
      domainId: domain.id,
      domainSlug: domain.slug,
      domainName: domain.name,
      platformAvailability: getPlatformAvailability(app),
    }))
  );
}

export function countLiveApps(domain) {
  return (domain.applications || []).filter((a) => a.status === STATUS.LIVE).length;
}
