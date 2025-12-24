import Link from "next/link"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full overflow-y-auto py-6 pr-6 lg:py-8">
             {/* Docs Sidebar Component would go here */}
             <nav className="flex flex-col space-y-2">
                <h4 className="font-medium">Getting Started</h4>
                <Link href="/docs/introduction" className="text-sm text-muted-foreground hover:underline">Introduction</Link>
                <Link href="/docs/installation" className="text-sm text-muted-foreground hover:underline">Installation</Link>
             </nav>
          </div>
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}
