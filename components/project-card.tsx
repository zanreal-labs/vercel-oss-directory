import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Project } from "@/lib/projects"
import { GitHubStars, GitHubStarsFallback } from "@/components/github-stars"

interface ProjectCardProps {
  project: Project
  isLoading?: boolean
}

export async function ProjectCard({ project, isLoading }: ProjectCardProps) {
  return (
    <Card className="group h-full transition-colors hover:border-foreground/20">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-2">
            <CardTitle className="text-xl">{project.name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs font-normal">
                {project.category}
              </Badge>
              <Badge variant="outline" className="text-xs font-normal">
                {project.cohort}
              </Badge>
            </div>
            {isLoading ? (
              <GitHubStarsFallback />
            ) : (
              // @ts-expect-error Async Server Component
              <GitHubStars repoUrl={project.url} />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3 text-pretty">{project.description}</CardDescription>
        <div className="mt-4 flex items-center gap-3">
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-foreground/70"
          >
            <span>GitHub</span>
            <ExternalLink className="size-3.5" />
          </Link>
          {project.docsUrl && (
            <Link
              href={project.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-foreground/70"
            >
              <span>Docs</span>
              <ExternalLink className="size-3.5" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
