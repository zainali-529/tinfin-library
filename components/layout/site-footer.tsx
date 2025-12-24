import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
              <span>TinFin Library</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Beautifully designed components built with Shadcn UI and Tailwind CSS. 
              Copy, paste, and ship faster.
            </p>
            <div className="mt-6 flex items-center space-x-4">
              <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-foreground">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/blocks" className="hover:text-foreground transition-colors">
                  Blocks
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-foreground transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-foreground transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-foreground">Community</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href={siteConfig.links.github} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="/license" className="hover:text-foreground transition-colors">
                  License
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
