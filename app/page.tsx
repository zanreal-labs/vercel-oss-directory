"use client"

import { ProjectsGrid } from "@/components/projects-grid"
import { ProjectsHeader } from "@/components/projects-header"
import { Nav } from "@/components/nav"
import { projects } from "@/lib/projects"
import { useState, useMemo } from "react"

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Extract unique categories from projects
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category))
    return Array.from(cats).sort()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <ProjectsHeader
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />
      <ProjectsGrid searchQuery={searchQuery} selectedCategory={selectedCategory} />
    </main>
  )
}
