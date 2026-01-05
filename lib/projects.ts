import { docs } from "@/.source/server";

export interface Project {
  name: string;
  description: string;
  cohort: string;
  url: string;
  docsUrl?: string;
  stars?: number;
  category: string;
}

// Typ dla strony z Fumadocs zawierającej nasze custom properties
interface ProjectPage {
  name?: string;
  title: string;
  description: string;
  cohort: string;
  url: string;
  docsUrl?: string;
  stars?: number;
  category: string;
}

// Ładowanie projektów z Fumadocs MDX loader
// Fumadocs przechowuje custom frontmatter properties bezpośrednio na obiekcie page
export const projects: Project[] = docs.map((page) => {
  const projectPage = page as unknown as ProjectPage;
  return {
    name: projectPage.name || projectPage.title,
    description: projectPage.description,
    cohort: projectPage.cohort,
    url: projectPage.url,
    docsUrl: projectPage.docsUrl,
    stars: projectPage.stars,
    category: projectPage.category,
  };
});

export function formatStars(stars: number | undefined): string {
  if (stars === undefined) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(stars);
}
