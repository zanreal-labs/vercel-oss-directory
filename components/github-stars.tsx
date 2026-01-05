import { Star } from "lucide-react"
import { getGitHubStars } from "@/lib/github"
import { formatStars } from "@/lib/projects"
import { Skeleton } from "@/components/ui/skeleton"

interface GitHubStarsProps {
  repoUrl: string
}

export async function GitHubStars({ repoUrl }: GitHubStarsProps) {
  const stars = await getGitHubStars(repoUrl)

  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      <Star className="size-4" />
      <span>{formatStars(stars ?? undefined)}</span>
    </div>
  )
}

export function GitHubStarsFallback() {
  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      <Star className="size-4" />
      <Skeleton className="h-4 w-8" />
    </div>
  )
}
