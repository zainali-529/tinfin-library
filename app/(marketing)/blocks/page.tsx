import Link from "next/link"
import { ArrowRight, LayoutGrid } from "lucide-react"
import { categories } from "@/registry/categories"
import { blocks } from "@/registry/blocks"
import { Badge } from "@/components/ui/badge"

export default function BlocksPage() {
  const totalBlocks = Object.keys(blocks).length
  const totalCategories = categories.length

  return (
    <div className="relative min-h-screen w-full bg-background">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Header Section */}
      <div className="container relative pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <Badge variant="outline" className="px-4 py-1.5 text-sm rounded-full border-primary/20 bg-primary/5 text-primary animate-in fade-in zoom-in duration-500">
            {totalBlocks} Components Available
          </Badge>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 pb-4">
             Beautiful Blocks
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
             A collection of professionally designed, copy-paste components for your next project. Built with Tailwind CSS and Radix UI.
          </p>
        </div>
      </div>

      {/* Categories Grid Section */}
      <div className="container pb-24">
         <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 font-medium px-1">
            <LayoutGrid className="h-4 w-4" />
            <span>Browse Categories</span>
         </div>

         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {categories.map((category) => {
                const categoryBlocks = Object.values(blocks).filter(block => block.category === category.slug);
                const count = categoryBlocks.length;
                const proCount = categoryBlocks.filter(block => block.isPro).length;
                const freeCount = count - proCount;

                return (
                  <Link
                    key={category.slug}
                    href={`/blocks/${category.slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1"
                  >
                    {/* Preview Section */}
                     <div className="relative aspect-[2/1] w-full overflow-hidden bg-muted/30 border-b group-hover:bg-primary/5 transition-colors duration-500">
                         <div className="absolute inset-0 flex items-center justify-center">
                             {/* Icon Container */}
                             <div className="relative flex items-center justify-center h-16 w-16 rounded-2xl bg-background shadow-sm border group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                                 {/* Icon */}
                                 <category.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                                 
                                 {/* Glow effect behind icon */}
                                 <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                             </div>
                         </div>
                         
                         {/* Grid Pattern Background */}
                         <div className="absolute inset-0 -z-10 opacity-[0.4]" 
                              style={{ 
                                backgroundImage: `linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)`,
                                backgroundSize: '24px 24px'
                              }} 
                         />
                     </div>
                    
                    {/* Content Section */}
                    <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                              {category.name}
                            </h3>
                            <Badge variant="secondary" className="shrink-0 font-mono text-xs font-medium bg-secondary/50">
                                {count}
                            </Badge>
                        </div>
                        
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                           {category.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between">
                           <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                               <div className="flex items-center gap-1.5">
                                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
                                   <span>{freeCount} Free</span>
                               </div>
                               <div className="flex items-center gap-1.5">
                                   <div className="h-1.5 w-1.5 rounded-full bg-purple-500/80" />
                                   <span>{proCount} Pro</span>
                               </div>
                           </div>
                           
                           <div className="flex items-center text-sm font-medium text-primary/80 group-hover:text-primary transition-colors">
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                           </div>
                        </div>
                    </div>
                  </Link>
                )
            })}
         </div>
      </div>
    </div>
  )
}
