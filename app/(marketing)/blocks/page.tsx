import Link from "next/link"
import { ArrowRight, Search, Sparkles, LayoutGrid, Box } from "lucide-react"
import { categories } from "@/registry/categories"
import { blocks } from "@/registry/blocks"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function BlocksPage() {
  const totalBlocks = Object.keys(blocks).length
  const totalCategories = categories.length

  return (
    <div className="relative min-h-screen w-full">
      <div className="relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="mx-auto max-w-3xl text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground pb-2">
                 Building Blocks for <br className="hidden sm:block" />
                 <span className="text-foreground">Modern Interfaces</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                 A comprehensive collection of professionally designed components. 
                 Copy, paste, and customize to build your next project faster.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section with Different Background */}
      <div className="relative bg-muted/10 border-t min-h-[500px]">
         <div className="container py-12 md:py-16">
            {/* Section Divider/Header inside Cards Area */}
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-2 text-muted-foreground">
                  <LayoutGrid className="h-5 w-5" />
                  <span className="font-medium">{totalCategories} Categories Available</span>
               </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                  // Calculate count dynamically based on the blocks registry
                  const count = Object.values(blocks).filter(block => block.category === category.slug).length;

                  return (
                    <Link
                      key={category.slug}
                      href={`/blocks/${category.slug}`}
                      className="group relative flex flex-col overflow-hidden rounded-3xl border bg-background shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20 p-6"
                    >
                      {/* Preview Area */}
                      <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted/10 mb-6 relative group-hover:ring-1 group-hover:ring-primary/10 transition-all">
                          {category.preview}
                          
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/[0.02]" />
                      </div>
                      
                      <div className="relative z-10 flex flex-col flex-1">
                          <div className="flex items-center justify-between mb-3">
                              <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                                {category.name}
                              </h3>
                              <Badge variant="secondary" className="font-mono text-xs">
                                  {count} items
                              </Badge>
                          </div>
                          
                          <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
                             {category.description}
                          </p>

                          <div className="flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                             Explore Components <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                      </div>
                    </Link>
                  )
              })}
            </div>
         </div>
      </div>
    </div>
  )
}
