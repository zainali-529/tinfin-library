import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getBlocksByCategory } from "@/registry/api"
import { categories } from "@/registry/categories"
import { BlockPreview } from "@/components/block-preview"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase-server"
import { supabaseAdmin } from "@/lib/supabase-admin"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  const categorySlug = params.category
  const blocksMap = await getBlocksByCategory(categorySlug)
  const categoryBlocks = Object.entries(blocksMap)
  
  const categoryInfo = categories.find(c => c.slug === categorySlug)
  const categoryName = categoryInfo ? categoryInfo.name : categorySlug
  const categoryDescription = categoryInfo ? categoryInfo.description : `Browse our collection of ${categorySlug} components.`

  // Check Auth & Payment
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isPaid = false;
  if (user) {
    const { data: payments } = await supabaseAdmin
      .from("payments")
      .select("id") // Optimization: select only id
      .eq("user_id", user.id)
      .eq("status", "paid") 
      .limit(1);
    
    isPaid = !!(payments && payments.length > 0);
  }

  return (
    <div className="relative min-h-screen w-full">
      {/* Hero Section */}
      <div className="relative">
         {/* Background pattern */}
         <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container py-8 md:py-10">
            <div className="mb-8">
                <Link href="/blocks" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to all categories
                </Link>
            </div>
            
            <div className="max-w-3xl space-y-2">
                <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="px-3 py-1 text-sm rounded-full border-primary/20 bg-primary/5 text-primary">
                        {categoryBlocks.length} Components
                    </Badge>
                    <span className="text-sm text-muted-foreground capitalize">
                        Blocks / {categoryName}
                    </span>
                </div>
                
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground pb-2 capitalize">
                    {categoryName}
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                    {categoryDescription}
                </p>
            </div>
        </div>
      </div>

      {/* Blocks List Section */}
      <div className="relative border-t min-h-[500px]">
        {/* Vertical Lines Background */}
        <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
            <div className="container h-full mx-auto border-x border-dashed border-neutral-300 dark:border-neutral-700"></div>
        </div>

        <div className="container relative z-10">
            {categoryBlocks.map(([name, block], index) => {
            const Component = block.component
            const isLocked = (block.isPro || name.includes("pro")) && !isPaid;
            
            return (
                <div key={name} className="relative">
                    <div className="py-12 md:py-16 flex flex-col space-y-6">
                        {/* <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold tracking-tight capitalize">
                                {name.replace(/-/g, ' ')}
                            </h2>
                        </div> */}
                        
                        <div className="overflow-hidden">
                             <BlockPreview 
                               name={name} 
                               files={block.files} 
                               previewUrl={`/view/${block.category}/${name}`}
                               isLocked={isLocked}
                             >
                                <Component />
                            </BlockPreview>
                        </div>
                    </div>
                    
                    {/* Horizontal Separator */}
                    {index < categoryBlocks.length - 1 && (
                         <div className="absolute bottom-0 left-0 right-0 w-full border-b border-dashed border-neutral-300 dark:border-neutral-700" />
                    )}
                </div>
            )
            })}
            
            {categoryBlocks.length === 0 && (
                 <div className="py-20 text-center text-muted-foreground">
                    <p>No components found in this category.</p>
                    <Link href="/blocks">
                        <Button variant="link" className="mt-2">Browse other categories</Button>
                    </Link>
                 </div>
            )}
        </div>
      </div>
    </div>
  )
}
