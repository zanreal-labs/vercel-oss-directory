import { ProjectsGrid } from "@/components/projects-grid"
import { ProjectsHeader } from "@/components/projects-header"
import { Nav } from "@/components/nav"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <ProjectsHeader />
      <ProjectsGrid />
    </main>
  )
}
