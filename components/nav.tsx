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
          <Link href="/" className="text-lg font-semibold">
            OSS Directory
          </Link>
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
