export interface Project {
  name: string
  description: string
  cohort: string
  url: string
  docsUrl?: string
  stars: number
  category: string
}

export const projects: Project[] = [
  {
    name: "Next.js",
    description:
      "The React Framework for the Web. Used by some of the world's largest companies, enabling you to create full-stack applications.",
    cohort: "Q1 2023",
    url: "https://github.com/vercel/next.js",
    docsUrl: "https://nextjs.org/docs",
    stars: 125000,
    category: "Framework",
  },
  {
    name: "Turbo",
    description: "Incremental bundler and build system optimized for JavaScript and TypeScript, written in Rust.",
    cohort: "Q2 2023",
    url: "https://github.com/vercel/turbo",
    docsUrl: "https://turbo.build/repo/docs",
    stars: 26000,
    category: "Build Tool",
  },
  {
    name: "SWR",
    description:
      "React Hooks for Data Fetching. A lightweight data fetching library for React applications with built-in cache management.",
    cohort: "Q1 2023",
    url: "https://github.com/vercel/swr",
    docsUrl: "https://swr.vercel.app/docs",
    stars: 30000,
    category: "Library",
  },
  {
    name: "AI SDK",
    description:
      "The AI Toolkit for TypeScript. Build AI-powered applications with React, Next.js, and the Vercel AI SDK.",
    cohort: "Q3 2024",
    url: "https://github.com/vercel/ai",
    docsUrl: "https://sdk.vercel.ai/docs",
    stars: 9000,
    category: "AI",
  },
  {
    name: "Hyper",
    description:
      "A terminal built on web technologies. Beautiful and extensible command-line interface built with Electron.",
    cohort: "Q4 2022",
    url: "https://github.com/vercel/hyper",
    docsUrl: "https://hyper.is/#cfg",
    stars: 43000,
    category: "Developer Tool",
  },
  {
    name: "Prisma",
    description:
      "Next-generation Node.js and TypeScript ORM. Type-safe database client for modern application development.",
    cohort: "Q2 2024",
    url: "https://github.com/prisma/prisma",
    docsUrl: "https://www.prisma.io/docs",
    stars: 39000,
    category: "Database",
  },
  {
    name: "Nuxt",
    description:
      "The Intuitive Vue Framework. Build fast, SEO-friendly, and scalable web applications with confidence.",
    cohort: "Q3 2023",
    url: "https://github.com/nuxt/nuxt",
    docsUrl: "https://nuxt.com/docs",
    stars: 54000,
    category: "Framework",
  },
  {
    name: "Svelte",
    description: "Cybernetically enhanced web apps. A radical new approach to building user interfaces with less code.",
    cohort: "Q1 2024",
    url: "https://github.com/sveltejs/svelte",
    docsUrl: "https://svelte.dev/docs",
    stars: 78000,
    category: "Framework",
  },
  {
    name: "Drizzle ORM",
    description: "TypeScript ORM that feels like writing SQL. Lightweight, performant, and type-safe database toolkit.",
    cohort: "Q4 2023",
    url: "https://github.com/drizzle-team/drizzle-orm",
    docsUrl: "https://orm.drizzle.team/docs",
    stars: 23000,
    category: "Database",
  },
]

export function formatStars(stars: number): string {
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(0)}k`
  }
  return stars.toString()
}
