"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"
import { useQueryState } from "nuqs"

interface ProjectsHeaderProps {
  searchQuery: string
  selectedCategory: string
  categories: string[]
}

export function ProjectsHeader({
  searchQuery,
  selectedCategory,
  categories,
}: ProjectsHeaderProps) {
  const [query, setQuery] = useQueryState("q", { defaultValue: searchQuery })
  const [category, setCategory] = useQueryState("category", { defaultValue: selectedCategory })

  return (
    <div className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
            Vercel OSS Program
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty md:text-xl">
            Supporting open source projects building the future of the web. Browse projects participating in the program.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="h-12 rounded-full bg-muted/50 pl-11 pr-4 text-base border-muted"
              value={query ?? ""}
              onChange={(e) => setQuery(e.target.value || null)}
            />
          </div>

          <div className="flex justify-center">
            <Select value={category ?? "all"} onValueChange={(value) => setCategory(value === "all" ? null : value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
