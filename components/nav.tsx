"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Link
              href="https://vercel.com/open-source-program"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="sr-only">Vercel OSS Program</span>
              <svg
                aria-label="Vercel OSS Program"
                className="size-5"
                fill="none"
                height="65"
                viewBox="0 0 76 65"
                width="76"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Vercel OSS Program Logo</title>
                <path
                  d="M37.5274 0L75.0548 65H0L37.5274 0Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
            <svg
              aria-hidden="true"
              fill="none"
              height="16"
              strokeLinejoin="round"
              style={{
                width: "16px",
                height: "16px",
                color: "var(--muted-foreground)",
              }}
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M4.01526 15.3939L4.3107 14.7046L10.3107 0.704556L10.6061 0.0151978L11.9849 0.606077L11.6894 1.29544L5.68942 15.2954L5.39398 15.9848L4.01526 15.3939Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
            <Link className="font-semibold text-lg" href="/">
              OSS Directory
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              className={`text-sm transition-colors hover:text-foreground ${
                pathname === "/"
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
              href="/"
            >
              Projects
            </Link>
            <Link
              className={`text-sm transition-colors hover:text-foreground ${
                pathname === "/hall-of-fame"
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
              href="/hall-of-fame"
            >
              Hall of Fame
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile Menu */}
          <Sheet onOpenChange={setOpen} open={open}>
            <SheetTrigger asChild>
              <Button className="md:hidden" size="icon" variant="ghost">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 p-8">
                <Link
                  className={`text-lg transition-colors hover:text-foreground ${
                    pathname === "/"
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                  href="/"
                  onClick={() => setOpen(false)}
                >
                  Projects
                </Link>
                <Link
                  className={`text-lg transition-colors hover:text-foreground ${
                    pathname === "/hall-of-fame"
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                  href="/hall-of-fame"
                  onClick={() => setOpen(false)}
                >
                  Hall of Fame
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
