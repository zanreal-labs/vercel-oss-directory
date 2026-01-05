"use client"

import { ProjectCard } from "@/components/project-card"
import { search } from "@zanreal/search"
import { useMemo } from "react"
import { useQueryState } from "nuqs"
import type { ProjectWithStars } from "@/lib/top-projects"

interface ProjectsGridClientProps {
  projects: ProjectWithStars[]
}

export function ProjectsGridClient({ projects }: ProjectsGridClientProps) {
  const [searchQuery] = useQueryState("q")
  const [selectedCategory] = useQueryState("category")

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => a.name.localeCompare(b.name))
  }, [projects])

  // Filter by category first
  const categoryFiltered = useMemo(() => {
    if (!selectedCategory || selectedCategory === "all") {
      return sortedProjects
    }
    return sortedProjects.filter((p) => p.category === selectedCategory)
  }, [sortedProjects, selectedCategory])

  const searchResults = useMemo(() => {
    if (!searchQuery) return categoryFiltered
    
    return search(categoryFiltered, searchQuery, {
      fields: ["name", "description", "category", "cohort"],
      fuzzyThreshold: 0.3,
    }).map(r => r.item)
  }, [categoryFiltered, searchQuery])

  const displayProjects = searchResults

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {displayProjects.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No projects found matching your search.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <ProjectCard key={project.name} project={project} stars={project.fetchedStars} />
          ))}
        </div>
      )}
    </div>
  )
}
