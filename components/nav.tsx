"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-border/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-semibold">
            OSS Directory
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm transition-colors hover:text-foreground ${
                pathname === "/" ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              Projects
            </Link>
            <Link
              href="/hall-of-fame"
              className={`text-sm transition-colors hover:text-foreground ${
                pathname === "/hall-of-fame" ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              Hall of Fame
            </Link>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  )
}
