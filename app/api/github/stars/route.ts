import { NextRequest, NextResponse } from "next/server"

const GITHUB_API_BASE = "https://api.github.com/repos"

export const revalidate = 3600 // Cache for 1 hour

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const owner = searchParams.get("owner")
  const repo = searchParams.get("repo")

  if (!owner || !repo) {
    return NextResponse.json(
      { error: "Missing owner or repo parameter" },
      { status: 400 }
    )
  }

  try {
    const apiUrl = `${GITHUB_API_BASE}/${owner}/${repo}`

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        // Use GitHub token from environment for higher rate limits
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: { revalidate: 3600 }, // Cache for 1 hour in Next.js
    })

    if (!response.ok) {
      console.warn(
        `GitHub API error for ${owner}/${repo}: ${response.status} ${response.statusText}`
      )

      // Return null instead of error to gracefully degrade
      return NextResponse.json({ stars: null }, { status: 200 })
    }

    const data = await response.json()
    const stars = data.stargazers_count

    return NextResponse.json({ stars }, { status: 200 })
  } catch (error) {
    console.error(`Error fetching GitHub stars for ${owner}/${repo}:`, error)
    // Graceful degradation - return null instead of error
    return NextResponse.json({ stars: null }, { status: 200 })
  }
}
