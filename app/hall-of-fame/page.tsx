import { Nav } from "@/components/nav"
import { ProjectCard } from "@/components/project-card"
import { getTopProjects } from "@/lib/top-projects"
import { cn } from "@/lib/utils"
import { Crown } from "lucide-react"

export const metadata = {
  title: "Hall of Fame - Vercel OSS Program",
  description: "Top 10 open source projects by GitHub stars in the Vercel OSS Program",
}

export default async function HallOfFamePage() {
  const topProjects = await getTopProjects(10)

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12 space-y-4">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">Hall of Fame</h1>
          <p className="text-pretty text-lg text-muted-foreground">
            Top 10 open source projects ranked by GitHub stars or followers
          </p>
        </div>
        <div className="space-y-4">
          {topProjects.map((project, index) => (
            <div key={project.name} className="relative">
              <div className={
                cn("absolute -left-4 top-0 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg", index === 0 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" : "bg-muted")
              }>
                {index === 0 ? <Crown /> : index + 1}
              </div>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
