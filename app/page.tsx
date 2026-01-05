"use client"

import { ProjectsGrid } from "@/components/projects-grid"
import { ProjectsHeader } from "@/components/projects-header"
import { Nav } from "@/components/nav"
import { useState } from "react"

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <ProjectsHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <ProjectsGrid searchQuery={searchQuery} />
    </main>
  )
}
