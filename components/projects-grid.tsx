import { ProjectCard } from "@/components/project-card"
import { projects } from "@/lib/projects"

export function ProjectsGrid() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  )
}
