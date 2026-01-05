"use client"

import { projects } from "@/lib/projects"
import { search } from "@zanreal/search"
import { useMemo, type ReactNode } from "react"

interface ProjectsGridClientProps {
  searchQuery: string
  selectedCategory: string
  children: ReactNode
}

export function ProjectsGridClient({ searchQuery, selectedCategory, children }: ProjectsGridClientProps) {
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  // Filter by category first
  const categoryFiltered = useMemo(() => {
    if (selectedCategory === "all") {
      return sortedProjects
    }
    return sortedProjects.filter((p) => p.category === selectedCategory)
  }, [sortedProjects, selectedCategory])

  const searchResults = useMemo(() => {
    return search(categoryFiltered, searchQuery, {
      fields: ["name", "description", "category", "cohort"],
      fuzzyThreshold: 0.3,
    })
  }, [categoryFiltered, searchQuery])

  const displayProjects = searchQuery ? searchResults.map(r => r.item) : categoryFiltered

  if (displayProjects.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No projects found matching your search.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </div>
  )
}
