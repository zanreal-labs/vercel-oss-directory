import { Nav } from "@/components/nav"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/lib/projects"

export const metadata = {
  title: "Hall of Fame - Vercel OSS Program",
  description: "Top open source projects by GitHub stars in the Vercel OSS Program",
}

export default function HallOfFamePage() {
  // Sort projects by stars in descending order
  const sortedProjects = [...projects].sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0))

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 space-y-4">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">Hall of Fame</h1>
          <p className="text-pretty text-lg text-muted-foreground">Top open source projects ranked by GitHub stars</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProjects.map((project, index) => (
            <div key={project.name} className="relative">
              {index < 3 && (
                <div className="absolute -left-2 -top-2 z-10 flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-sm font-bold text-white shadow-lg">
                  {index + 1}
                </div>
              )}
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
