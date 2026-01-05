import Link from "next/link";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 py-2 flex flex-col md:flex-row items-center justify-between">
        <Button asChild variant="link" className="p-0 text-sm font-mono inline-flex">
          <Link href="https://github.com/zanreal-labs/vercel-oss-directory" target="_blank" rel="noopener noreferrer">View on GitHub<ExternalLink className="size-3.5" /></Link>
        </Button>
        <p className="text-center text-sm text-muted-foreground font-mono">
          Made by <Button asChild variant="link" className="p-0 text-sm font-mono inline-flex">
            <Link href="https://zanreal.com" target="_blank">ZanReal</Link>
          </Button>
        </p>
      </div>
    </footer>
  )
}
