"use client"

import * as React from "react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface MobileNavProps {
    user?: User | null
}

export function MobileNav({ user }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setOpen(false)
    router.refresh()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <span className="font-bold">{siteConfig.name}</span>
          </Link>
        </div>
        <div className="flex flex-col gap-4 px-7 mt-8">
            <Link
                href="/blocks"
                onClick={() => setOpen(false)}
                className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground/80",
                    pathname?.startsWith("/blocks") ? "text-foreground" : "text-foreground/60"
                )}
            >
                Blocks
            </Link>
            <Link
                href="/roadmap"
                onClick={() => setOpen(false)}
                className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground/80",
                    pathname?.startsWith("/roadmap") ? "text-foreground" : "text-foreground/60"
                )}
            >
                Roadmap
            </Link>
            <Link
                href="/changelog"
                onClick={() => setOpen(false)}
                className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground/80",
                    pathname?.startsWith("/changelog") ? "text-foreground" : "text-foreground/60"
                )}
            >
                Changelog
            </Link>
            <Link
                href="/docs"
                onClick={() => setOpen(false)}
                className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground/80",
                    pathname?.startsWith("/docs") ? "text-foreground" : "text-foreground/60"
                )}
            >
                Docs
            </Link>

            <div className="my-4 border-t pt-4 flex flex-col gap-2">
                 <div className="flex items-center justify-between">
                     <span className="text-sm font-medium">Theme</span>
                     <ModeToggle />
                 </div>
                 {user ? (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 py-2">
                            <span className="text-sm font-medium">Logged in as {user.email}</span>
                        </div>
                        <Button onClick={handleLogout} variant="outline" className="w-full">
                            Log out
                        </Button>
                    </div>
                 ) : (
                    <>
                        <Link href="/login" onClick={() => setOpen(false)}>
                            <Button variant="outline" className="w-full">Log in</Button>
                        </Link>
                        <Link href="/signup" onClick={() => setOpen(false)}>
                            <Button className="w-full">Sign up</Button>
                        </Link>
                    </>
                 )}
            </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
