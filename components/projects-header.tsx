"use client";

import { ArrowRight, Check, ChevronsUpDown, Search } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface ProjectsHeaderProps {
  categories: string[];
}

export function ProjectsHeader({ categories }: ProjectsHeaderProps) {
  const [query, setQuery] = useQueryState("q");
  const [category, setCategory] = useQueryState("category");
  const [open, setOpen] = useState(false);

  const allCategories = [
    { value: "all", label: "All Categories" },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];
  const selectedCategory = allCategories.find(
    (cat) => cat.value === (category ?? "all")
  );

  return (
    <div className="border-border border-b">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
            <Badge
              asChild
              className="w-fit justify-between rounded-full"
              variant="outline"
            >
              <Link
                href="https://vercel.com/open-source-program"
                rel="noopener"
                target="_blank"
              >
                View program's official website
                <ArrowRight />
              </Link>
            </Badge>
          </div>
          <h1 className="text-balance font-semibold text-4xl text-foreground tracking-tight md:text-5xl lg:text-6xl">
            Vercel OSS Program
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground md:text-xl">
            Supporting open source projects building the future of the web.
            Browse projects participating in the program.
          </p>
        </div>

        <div className="mx-auto mt-8 w-full max-w-2xl">
          <InputGroup className="h-12 rounded-full bg-muted">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              onChange={(e) => setQuery(e.target.value || null)}
              placeholder="Search projects..."
              type="search"
              value={query ?? ""}
            />
            <InputGroupAddon align="inline-end">
              <Popover onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild>
                  <Button
                    aria-expanded={open}
                    className="h-full justify-between rounded-full text-sm"
                    role="combobox"
                    variant="ghost"
                  >
                    {selectedCategory?.label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {allCategories.map((cat) => (
                          <CommandItem
                            key={cat.value}
                            onSelect={(currentValue) => {
                              setCategory(
                                currentValue === "all" ? null : currentValue
                              );
                              setOpen(false);
                            }}
                            value={cat.value}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                (category ?? "all") === cat.value
                                  ? "opacity-100"
                                  : "opacity-0"
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
  );
}
