import { ProjectsGridClient } from "@/components/projects-grid-client"
import { ProjectsHeader } from "@/components/projects-header"
import { Nav } from "@/components/nav"
import { projects } from "@/lib/projects"
import { getAllProjectsWithStars } from "@/lib/top-projects"

export default async function Page() {
  // Fetch all projects with stars server-side
  const projectsWithStars = await getAllProjectsWithStars()

  // Extract unique categories from projects
  const categories = Array.from(new Set(projects.map((p) => p.category))).sort()

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <ProjectsHeader categories={categories} />
      <ProjectsGridClient projects={projectsWithStars} />
    </main>
  )
}
