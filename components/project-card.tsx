import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Star, Users } from "lucide-react"
import Link from "next/link"
import type { Project } from "@/lib/projects"
import { formatStars } from "@/lib/projects"

interface ProjectCardProps {
  project: Project
  stars?: number | null
}

function isUserProfile(url: string): boolean {
  try {
    const urlObj = new URL(url)
    const parts = urlObj.pathname.split("/").filter(Boolean)
    // User profile has only 1 path segment: /username
    // Repository has 2+ path segments: /owner/repo
    return parts.length === 1
  } catch {
    return false
  }
}

export function ProjectCard({ project, stars }: ProjectCardProps) {
  const isProfile = isUserProfile(project.url)

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
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {isProfile ? (
                <Users className="size-4" />
              ) : (
                <Star className="size-4" />
              )}
              <span>{formatStars(stars ?? undefined)}</span>
            </div>
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
