"use client"

import { ProjectCard } from "@/components/project-card"
import { projects } from "@/lib/projects"
import { search } from "@zanreal/search"
import { useMemo } from "react"

interface ProjectsGridProps {
  searchQuery: string
}

export function ProjectsGrid({ searchQuery }: ProjectsGridProps) {
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  const searchResults = useMemo(() => {
    return search(sortedProjects, searchQuery, {
      fields: ["name", "description", "category", "cohort"],
      fuzzyThreshold: 0.3,
    })
  }, [sortedProjects, searchQuery])

  const displayProjects = searchQuery ? searchResults.map(r => r.item) : sortedProjects

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
