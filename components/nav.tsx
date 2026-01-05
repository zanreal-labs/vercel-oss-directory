"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="border-b border-border/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Link href="https://vercel.com/open-source-program" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">Vercel OSS Program</span>
              <svg
                alt="Vercel Logo"
                width="76"
                height="65"
                viewBox="0 0 76 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
              >
                <path
                  d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#ffffff"
                />
              </svg>
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              alt="Separator"
              height="16"
              strokeLinejoin="round"
              viewBox="0 0 16 16"
              width="16"
              style={{ width: "16px", height: "16px", color: "var(--muted-foreground)" }}>
                <path fillRule="evenodd" clipRule="evenodd" d="M4.01526 15.3939L4.3107 14.7046L10.3107 0.704556L10.6061 0.0151978L11.9849 0.606077L11.6894 1.29544L5.68942 15.2954L5.39398 15.9848L4.01526 15.3939Z" fill="currentColor"></path>
              </svg>
            <Link href="/" className="text-lg font-semibold">
              OSS Directory
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
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
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 p-8">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={`text-lg transition-colors hover:text-foreground ${
                    pathname === "/" ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}
                >
                  Projects
                </Link>
                <Link
                  href="/hall-of-fame"
                  onClick={() => setOpen(false)}
                  className={`text-lg transition-colors hover:text-foreground ${
                    pathname === "/hall-of-fame" ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}
                >
                  Hall of Fame
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
