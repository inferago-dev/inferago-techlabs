export type TechnologyGroup = {
  category: string;
  items: string[];
};

// Only list technologies actually used on client work — update once confirmed.
export const TECHNOLOGY_GROUPS: TechnologyGroup[] = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { category: "Backend", items: ["Node.js", "Python", "FastAPI"] },
  { category: "Mobile", items: ["React Native", "Flutter"] },
  { category: "Database", items: ["PostgreSQL", "MongoDB", "Supabase"] },
  { category: "Cloud", items: ["AWS", "Vercel", "Cloudflare"] },
  { category: "AI", items: ["OpenAI", "Anthropic", "Groq"] },
];
