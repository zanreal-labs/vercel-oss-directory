import "server-only"
import { cacheLife } from "next/cache"
import { projects } from "@/lib/projects"
import { getGitHubStars } from "@/lib/github"
import type { Project } from "@/lib/projects"

export async function getTopProjects(limit: number = 10) {
  "use cache"
  cacheLife("hours")

  // Fetch stars for all projects
  const projectsWithStars = await Promise.all(
    projects.map(async (project) => ({
      ...project,
      fetchedStars: await getGitHubStars(project.url),
    }))
  )

  // Sort by fetched stars and take top N
  return projectsWithStars
    .sort((a, b) => (b.fetchedStars ?? 0) - (a.fetchedStars ?? 0))
    .slice(0, limit)
}

export type ProjectWithStars = Project & { fetchedStars: number | null }
