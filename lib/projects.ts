import { docs } from "@/.source/server"

export interface Project {
  name: string
  description: string
  cohort: string
  url: string
  docsUrl?: string
  stars?: number
  category: string
}

// Ładowanie projektów z Fumadocs MDX loader
// Fumadocs przechowuje custom frontmatter properties bezpośrednio na obiekcie page
export const projects: Project[] = docs.map((page: any) => {
  return {
    name: (page.name || page.title) as string,
    description: page.description as string,
    cohort: page.cohort as string,
    url: page.url as string,
    docsUrl: page.docsUrl as string | undefined,
    stars: page.stars as number | undefined,
    category: page.category as string,
  }
})

export function formatStars(stars: number | undefined): string {
  if (stars === undefined) {
    return "—"
  }
  
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(stars)
}
