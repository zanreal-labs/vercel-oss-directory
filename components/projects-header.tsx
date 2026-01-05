"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface ProjectsHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function ProjectsHeader({ searchQuery, onSearchChange }: ProjectsHeaderProps) {
  return (
    <div className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
            Vercel OSS Program
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty md:text-xl">
            Supporting open source projects building the future of the web. Browse projects participating in the program
            by cohort.
          </p>
        </div>

        <div className="relative mx-auto mt-8 max-w-2xl">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="h-12 rounded-full bg-muted/50 pl-11 pr-4 text-base border-muted"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
