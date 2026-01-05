/**
 * GitHub API service for fetching repository information
 * Uses Next.js 16 Cache Components for automatic caching
 */

import "server-only"

const GITHUB_API_BASE = "https://api.github.com/repos"
const GITHUB_USER_API = "https://api.github.com/users"

/**
 * Parse GitHub URL and determine if it's a user profile or repository
 */
function parseGitHubUrl(url: string): 
  | { type: "repo"; owner: string; repo: string }
  | { type: "user"; username: string }
  | null {
  try {
    const urlObj = new URL(url)
    const parts = urlObj.pathname.split("/").filter(Boolean)

    if (parts.length === 1) {
      // User profile: https://github.com/username
      return {
        type: "user",
        username: parts[0],
      }
    } else if (parts.length >= 2) {
      // Repository: https://github.com/owner/repo
      return {
        type: "repo",
        owner: parts[0],
        repo: parts[1],
      }
    }

    return null
  } catch {
    return null
  }
}

/**
 * Fetch GitHub repository stars or user followers count
 * Caching is handled at the component level with "use cache"
 */
export async function getGitHubStars(repoUrl: string): Promise<number | null> {
  const parsed = parseGitHubUrl(repoUrl)

  if (!parsed) {
    console.warn(`Invalid GitHub URL: ${repoUrl}`)
    return null
  }

  try {
    let apiUrl: string
    let countField: string

    if (parsed.type === "user") {
      // Fetch user followers count
      apiUrl = `${GITHUB_USER_API}/${parsed.username}`
      countField = "followers"
    } else {
      // Fetch repository stars count
      apiUrl = `${GITHUB_API_BASE}/${parsed.owner}/${parsed.repo}`
      countField = "stargazers_count"
    }

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        }),
      },
    })

    if (!response.ok) {
      console.warn(
        `GitHub API error for ${repoUrl}: ${response.status} ${response.statusText}`
      )
      return null
    }

    const data = await response.json()
    const count = data[countField]

    return count
  } catch (error) {
    console.error(`Error fetching GitHub data for ${repoUrl}:`, error)
    return null
  }
}

/**
 * Batch fetch stars for multiple repositories
 * Each call is individually cached via "use cache"
 */
export async function getGitHubStarsBatch(
  urls: string[]
): Promise<Map<string, number | null>> {
  const results = new Map<string, number | null>()

  // Fetch in parallel with concurrency limit
  const concurrency = 5
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
