"use client"

import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, Check, ChevronsUpDown } from "lucide-react"
import { useQueryState } from "nuqs"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProjectsHeaderProps {
  categories: string[]
}

export function ProjectsHeader({ categories }: ProjectsHeaderProps) {
  const [query, setQuery] = useQueryState("q")
  const [category, setCategory] = useQueryState("category")
  const [open, setOpen] = useState(false)

  const allCategories = [{ value: "all", label: "All Categories" }, ...categories.map(cat => ({ value: cat, label: cat }))]
  const selectedCategory = allCategories.find(cat => cat.value === (category ?? "all"))

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

        <div className="mx-auto mt-8 max-w-2xl">
          <InputGroup className="rounded-full bg-muted h-12">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              placeholder="Search projects..."
              value={query ?? ""}
              onChange={(e) => setQuery(e.target.value || null)}
            />
            <InputGroupAddon align="inline-end">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between h-full text-sm rounded-full"
                  >
                    {selectedCategory?.label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="end">
                  <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {allCategories.map((cat) => (
                          <CommandItem
                            key={cat.value}
                            value={cat.value}
                            onSelect={(currentValue) => {
                              setCategory(currentValue === "all" ? null : currentValue)
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                (category ?? "all") === cat.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {cat.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </div>
  )
}
