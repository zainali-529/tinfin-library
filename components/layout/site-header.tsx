import Link from "next/link"
import { siteConfig } from "@/config/site"
// import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { createClient } from "@/lib/supabase-server"
import { UserNav } from "@/components/layout/user-nav"

export async function SiteHeader() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-14 max-w-screen-2xl items-center justify-between mx-auto">
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>

        {/* Center: MainNav (Hidden on mobile) */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex">
          <MainNav />
        </div>

        {/* Right Side: Auth + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <UserNav user={user} />
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
          <MobileNav user={user} />
        </div>
      </div>
    </header>
  )
}
