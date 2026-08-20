export type ServicePillar = {
  key: string;
  label: string;
  title: string;
  tagline: string;
  items: string[];
};

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    key: "build",
    label: "Build",
    title: "Web & Software Development",
    tagline: "Digital products engineered around your business.",
    items: ["Websites", "Web applications", "Mobile apps", "E-commerce", "Custom software"],
  },
  {
    key: "grow",
    label: "Grow",
    title: "Digital Marketing",
    tagline: "Turn your digital presence into a measurable growth channel.",
    items: ["SEO", "Social media", "Paid advertising", "Content", "Lead generation", "Analytics"],
  },
  {
    key: "automate",
    label: "Automate",
    title: "AI Integration",
    tagline: "Bring intelligent automation into your existing business.",
    items: [
      "AI integration",
      "AI automation",
      "AI agents",
      "Intelligent workflows",
      "AI-powered product features",
    ],
  },
  {
    key: "support",
    label: "Support",
    title: "Maintenance & AMC",
    tagline: "Keep what we build running, secure and up to date.",
    items: [
      "Bug fixes & patches",
      "Security & dependency updates",
      "Uptime monitoring",
      "Monthly change allowance",
      "Priority support response",
    ],
  },
];

export type ServiceGroup = {
  key: string;
  title: string;
  services: { title: string; items: string[] }[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    key: "development",
    title: "Development",
    services: [
      {
        title: "Website Development",
        items: [
          "Business websites",
          "Landing pages",
          "Corporate websites",
          "E-commerce",
          "CMS",
          "Marketing websites",
        ],
      },
      {
        title: "Web Applications",
        items: ["SaaS", "Dashboards", "Customer portals", "Admin systems", "Internal tools"],
      },
      {
        title: "Mobile Applications",
        items: ["Android", "iOS", "Cross-platform applications"],
      },
      {
        title: "Custom Software",
        items: ["Business systems", "APIs", "Automation", "Internal tools"],
      },
      {
        title: "E-commerce",
        items: [
          "Product catalogues",
          "Shopping experiences",
          "Admin systems",
          "Inventory integration",
          "Custom commerce platforms",
        ],
      },
    ],
  },
  {
    key: "growth",
    title: "Digital Marketing",
    services: [
      {
        title: "Digital Marketing",
        items: [
          "Social media marketing",
          "Content strategy",
          "Paid advertising",
          "Lead generation",
          "Campaign management",
          "Analytics",
        ],
      },
      {
        title: "SEO",
        items: ["Technical SEO", "On-page SEO", "Local SEO", "Content strategy", "Search analytics"],
      },
    ],
  },
  {
    key: "ai",
    title: "AI",
    services: [
      {
        title: "AI Integration",
        items: [
          "AI feature integration",
          "AI APIs",
          "AI automation",
          "AI workflows",
          "AI agents",
          "Business process automation",
        ],
      },
    ],
  },
  {
    key: "support",
    title: "Support & Maintenance",
    services: [
      {
        title: "Annual Maintenance Contract (AMC)",
        items: [
          "Bug fixes & patches",
          "Security & dependency updates",
          "Uptime monitoring",
          "Monthly change allowance",
          "Priority support response",
        ],
      },
    ],
  },
];

export const WHY_INFERAGO = [
  {
    title: "Business-first",
    description: "We start with the business problem before choosing the technology.",
  },
  {
    title: "Modern engineering",
    description: "We use modern development practices to build maintainable digital products.",
  },
  {
    title: "Scalable foundation",
    description: "Build today without making tomorrow's growth painful.",
  },
  {
    title: "One technology partner",
    description: "Development, marketing, automation and AI under one ecosystem.",
  },
];

export const PROCESS_STEPS = [
  { number: "01", title: "Discover", description: "Understand the business, users and goals." },
  { number: "02", title: "Plan", description: "Define scope, architecture and roadmap." },
  { number: "03", title: "Design", description: "Create the user experience and interface." },
  { number: "04", title: "Build", description: "Develop, integrate and test." },
  { number: "05", title: "Launch", description: "Deploy and go live." },
  { number: "06", title: "Grow", description: "Maintain, optimize and scale." },
];
