import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { GitHubStarsFallback } from "@/components/github-stars";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/lib/projects";

interface ProjectCardSkeletonProps {
  project: Project;
}

export function ProjectCardSkeleton({ project }: ProjectCardSkeletonProps) {
  return (
    <Card className="group h-full transition-colors hover:border-foreground/20">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-2">
            <CardTitle className="text-xl">{project.name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="font-normal text-xs" variant="secondary">
                {project.category}
              </Badge>
              <Badge className="font-normal text-xs" variant="outline">
                {project.cohort}
              </Badge>
            </div>
            <GitHubStarsFallback />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3 text-pretty">
          {project.description}
        </CardDescription>
        <div className="mt-4 flex items-center gap-3">
          <Link
            className="inline-flex items-center gap-1 text-foreground text-sm transition-colors hover:text-foreground/70"
            href={project.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>GitHub</span>
            <ExternalLink className="size-3.5" />
          </Link>
          {project.docsUrl && (
            <Link
              className="inline-flex items-center gap-1 text-foreground text-sm transition-colors hover:text-foreground/70"
              href={project.docsUrl}
              target="_blank"
            >
              <span>Docs</span>
              <ExternalLink className="size-3.5" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
