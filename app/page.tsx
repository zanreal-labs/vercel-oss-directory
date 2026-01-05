import { ProjectsGrid } from "@/components/projects-grid"
import { ProjectsHeader } from "@/components/projects-header"
import { Nav } from "@/components/nav"
import { projects } from "@/lib/projects"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>
}) {
  const params = await searchParams
  const searchQuery = params.q || ""
  const selectedCategory = params.category || "all"

  // Extract unique categories from projects
  const categories = Array.from(new Set(projects.map((p) => p.category))).sort()

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <ProjectsHeader
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        categories={categories}
      />
      <ProjectsGrid searchQuery={searchQuery} selectedCategory={selectedCategory} />
    </main>
  )
}
