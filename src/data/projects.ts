export type Project = {
  slug: string;
  name: string;
  client?: string;
  industry: string;
  type: string;
  category: "web" | "apps" | "software" | "ecommerce" | "ai" | "marketing";
  services: string[];
  description: string;
  problem?: string;
  approach?: string;
  solution?: string;
  features?: string[];
  technology?: string[];
  timeline?: string;
  results?: string;
  clientUrl?: string;
  coverImage: string;
};

// Minimal real entries — populated from each live site's own public
// metadata (title/description) since detailed case-study copy (problem/
// approach/solution/results) hasn't been provided yet. Expand with that
// detail once available rather than inventing it.
export const PROJECTS: Project[] = [
  {
    slug: "care-dent",
    name: "Care Dent",
    industry: "Dental Equipment & Clinical Solutions",
    type: "Business Website",
    category: "web",
    services: ["Website Development"],
    description: "A website for Care Dent, a dental equipment and clinical solutions supplier.",
    clientUrl: "https://www.caredent.net",
    coverImage: "/work/care-dent.png",
  },
  {
    slug: "feline-genuine-lubricants",
    name: "Feline Genuine Lubricants",
    industry: "Industrial Lubricants",
    type: "Business Website",
    category: "web",
    services: ["Website Development"],
    description:
      "Premium industrial-grade engine oils and lubricants formulated to exceed international standards.",
    clientUrl: "https://felinelube.vercel.app",
    coverImage: "/work/feline-lube.png",
  },
];
