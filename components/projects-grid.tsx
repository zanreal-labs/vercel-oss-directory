"use client"

import { ProjectCard } from "@/components/project-card"
import { projects } from "@/lib/projects"
import { useSearch } from "@zanreal/search"
import { useMemo } from "react"

interface ProjectsGridProps {
  searchQuery: string
}

export function ProjectsGrid({ searchQuery }: ProjectsGridProps) {
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  const { results } = useSearch({
    items: sortedProjects,
    query: searchQuery,
    keys: ["name", "description", "category", "cohort"],
    threshold: 0.3,
  })

  const displayProjects = searchQuery ? results : sortedProjects

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {displayProjects.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No projects found matching your search.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
