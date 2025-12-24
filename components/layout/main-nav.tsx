"use client";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex">
      <nav className="flex items-center gap-1 rounded-full border bg-background/80 px-2 py-1.5 shadow-sm backdrop-blur-md">
        <Link
          href="/blocks"
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-accent/50",
            pathname?.startsWith("/blocks")
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          )}
        >
          Blocks
        </Link>
        <Link
          href="/roadmap"
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-accent/50",
            pathname?.startsWith("/roadmap")
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          )}
        >
          Roadmap
        </Link>
        <Link
          href="/changelog"
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-accent/50",
            pathname?.startsWith("/changelog")
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          )}
        >
          Changelog
        </Link>
        <Link
          href="/docs"
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-accent/50",
            pathname?.startsWith("/docs")
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          )}
        >
          Docs
        </Link>
        <Link
          href="/pricing"
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-accent/50",
            pathname?.startsWith("/pricing")
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          )}
        >
          Pricing
        </Link>
      </nav>
    </div>
  )
}
