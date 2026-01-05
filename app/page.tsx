import type { Metadata } from "next"
import { ProjectsGridClient } from "@/components/projects-grid-client"
import { ProjectsHeader } from "@/components/projects-header"
import { Nav } from "@/components/nav"
import { projects } from "@/lib/projects"
import { getAllProjectsWithStars } from "@/lib/top-projects"

export const metadata: Metadata = {
  title: "Projects Directory - Vercel OSS Program",
  description: "Browse open source projects participating in the Vercel OSS Program. Discover innovative tools, frameworks, and libraries built by the community.",
  openGraph: {
    title: "Projects Directory - Vercel OSS Program",
    description: "Browse open source projects participating in the Vercel OSS Program. Discover innovative tools, frameworks, and libraries built by the community.",
    type: "website",
    locale: "en_US",
    siteName: "Vercel OSS Program",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects Directory - Vercel OSS Program",
    description: "Browse open source projects participating in the Vercel OSS Program. Discover innovative tools, frameworks, and libraries built by the community.",
  },
}

export default async function Page() {
  // Fetch all projects with stars server-side
  const projectsWithStars = await getAllProjectsWithStars()

  // Extract unique categories from projects (filter out undefined/null values)
  const categories = Array.from(
    new Set(projects.map((p) => p.category).filter((c): c is string => Boolean(c)))
  ).sort()

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <ProjectsHeader categories={categories} />
      <ProjectsGridClient projects={projectsWithStars} />
    </main>
  )
}
