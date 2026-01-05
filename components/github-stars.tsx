import { Star, Users } from "lucide-react"
import { getGitHubStars } from "@/lib/github"
import { formatStars } from "@/lib/projects"
import { Skeleton } from "@/components/ui/skeleton"
import { cacheLife } from "next/cache"

interface GitHubStarsProps {
  repoUrl: string
}

export async function GitHubStars({ repoUrl }: GitHubStarsProps) {
  "use cache"
  cacheLife("hours")
  
  const count = await getGitHubStars(repoUrl)
  
  // Determine if it's a user profile (URL has only one path segment)
  const isUserProfile = repoUrl.split('/').filter(Boolean).length === 3 // https://github.com/username = 3 segment

  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      {isUserProfile ? (
        <Users className="size-4" />
      ) : (
        <Star className="size-4" />
      )}
      <span>{formatStars(count ?? undefined)}</span>
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
