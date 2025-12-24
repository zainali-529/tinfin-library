import Link from "next/link"
import { Construction } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TemplatesPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-10 text-center gap-6">
      <div className="rounded-full bg-muted p-6">
        <Construction className="h-12 w-12 text-muted-foreground" />
      </div>
      
      <div className="max-w-[600px] space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Templates Coming Soon
        </h1>
        <p className="text-lg text-muted-foreground">
          We are working hard to build a collection of professional, production-ready templates. 
          Check back soon for landing pages, dashboards, and more.
        </p>
      </div>

      <div className="flex gap-4">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
        <Link href="/blocks">
          <Button>Explore Blocks</Button>
        </Link>
      </div>
    </div>
  )
}
