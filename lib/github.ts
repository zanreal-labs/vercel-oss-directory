/**
 * GitHub API service for fetching repository information
 * Uses server-side API route to avoid rate limiting issues
 */

const CACHE_DURATION = 1000 * 60 * 60 // 1 hour in milliseconds

// In-memory cache with expiration
const starCache = new Map<string, { stars: number; timestamp: number }>()

/**
 * Extract owner and repo from a GitHub URL
 */
function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const urlObj = new URL(url)
    const parts = urlObj.pathname.split("/").filter(Boolean)

    if (parts.length < 2) {
      return null
    }

    return {
      owner: parts[0],
      repo: parts[1],
    }
  } catch {
    return null
  }
}

/**
 * Fetch GitHub repository stars count through server API
 */
export async function getGitHubStars(repoUrl: string): Promise<number | null> {
  const parsed = parseGitHubUrl(repoUrl)

  if (!parsed) {
    console.warn(`Invalid GitHub URL: ${repoUrl}`)
    return null
  }

  const cacheKey = `${parsed.owner}/${parsed.repo}`

  // Check cache first
  const cached = starCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.stars
  }

  try {
    // Call our own API route which has access to GITHUB_TOKEN
    const response = await fetch(
      `/api/github/stars?owner=${parsed.owner}&repo=${parsed.repo}`,
      {
        next: { revalidate: 3600 } as any, // Cache for 1 hour in Next.js
      }
    )

    if (!response.ok) {
      console.warn(
        `Failed to fetch GitHub stars for ${cacheKey}: ${response.status}`
      )
      return null
    }

    const data = await response.json()
    const stars = data.stars

    if (stars !== null && stars !== undefined) {
      // Store in cache
      starCache.set(cacheKey, { stars, timestamp: Date.now() })
    }

    return stars
  } catch (error) {
    console.error(`Error fetching GitHub stars for ${cacheKey}:`, error)
    return null
  }
}

/**
 * Batch fetch stars for multiple repositories
 */
export async function getGitHubStarsBatch(
  urls: string[]
): Promise<Map<string, number | null>> {
  const results = new Map<string, number | null>()

  // Fetch in parallel with concurrency limit (to avoid rate limiting)
  const concurrency = 3
  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency)
    const promises = batch.map(async (url) => ({
      url,
      stars: await getGitHubStars(url),
    }))

    const batchResults = await Promise.all(promises)
    batchResults.forEach(({ url, stars }) => {
      results.set(url, stars)
    })
  }

  return results
}
