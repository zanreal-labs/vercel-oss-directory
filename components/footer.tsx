import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="bg-muted/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-2 md:flex-row">
        <Button
          asChild
          className="inline-flex p-0 font-mono text-sm"
          variant="link"
        >
          <Link
            href="https://github.com/zanreal-labs/vercel-oss-directory"
            rel="noopener noreferrer"
            target="_blank"
          >
            View on GitHub
            <ExternalLink className="size-3.5" />
          </Link>
        </Button>
        <p className="text-center font-mono text-muted-foreground text-sm">
          Made by{" "}
          <Button
            asChild
            className="inline-flex p-0 font-mono text-sm"
            variant="link"
          >
            <Link href="https://zanreal.com" target="_blank">
              ZanReal
            </Link>
          </Button>
        </p>
      </div>
    </footer>
  );
}
