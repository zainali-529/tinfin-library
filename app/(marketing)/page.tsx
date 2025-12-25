import Link from "next/link"
import { ArrowRight, ChevronRight, Code2, Palette, Smartphone, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { categories } from "@/registry/categories"
import { blocks } from "@/registry/blocks"

export default function IndexPage() {
  return (
    <div className="relative overflow-hidden">
      
      <section className="relative container mx-auto flex flex-col items-center gap-8 py-24 text-center md:py-32">
        {/* Background Grids & Effects - Only for Hero */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background">
             {/* Dashed Grid */}
             <div className="absolute inset-0 h-full w-full" 
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60' width='60' height='60' fill='none' stroke='rgb(128 128 128 / 0.20)' stroke-dasharray='6 4'%3e%3cpath d='M0 60V0H60'/%3e%3c/svg%3e")`,
                    maskImage: 'radial-gradient(ellipse 70% 70% at 50% 20%, #000 60%, transparent 100%)'
                }}>
            </div>
        </div>
        
        {/* Announcement Badge */}
        <Link
          href="/changelog"
          className="group inline-flex items-center rounded-full border bg-background px-1 py-1 text-sm font-medium transition-colors hover:bg-muted/50"
        >
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">Added New Blocks</span>
          <span className="mx-2 text-muted-foreground group-hover:text-foreground transition-colors">View Changelog</span>
          <ChevronRight className="mr-2 h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
        </Link>

        {/* Hero Heading */}
        <div className="max-w-5xl space-y-4">
          <h1 className="font-extrabold tracking-tight">
            <span className="block text-3xl sm:text-4xl text-foreground/80 mb-2">
              Premium shadcn/ui Blocks
            </span>
            <span className="block text-5xl sm:text-6xl bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              for Modern & Fast Apps.
            </span>
          </h1>
          <p className="mx-auto max-w-[800px] text-lg text-muted-foreground md:text-xl leading-relaxed pt-4">
            Save hours of design time with clean, ready-to-use shadcn blocks that just work — modern, responsive, and built for speed.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-row gap-4 justify-center pt-4">
          <Link href="/blocks">
            <Button variant="outline" size="lg" className="h-12 px-8 text-base bg-background shadow-sm hover:bg-muted/50">
              Explore
            </Button>
          </Link>
          <Link href="/pro">
            <Button size="lg" className="h-12 px-8 text-base shadow-lg">
              Get full Access
            </Button>
          </Link>
        </div>

        {/* Tech Stack / Social Proof (Optional) */}
        <div className="pt-8 text-sm text-muted-foreground">
          <p>Powered by Next.js 15, React 19, Tailwind v4 & Shadcn UI</p>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="container mx-auto py-12 md:py-24 border-t">
         <div className="flex items-center justify-between mb-12">
             <div className="space-y-2">
                 <h2 className="text-3xl font-bold tracking-tight">Browse by Category</h2>
                 <p className="text-muted-foreground">Find the perfect component for your needs.</p>
             </div>
             <Link href="/blocks" className="hidden md:flex items-center text-sm font-medium text-primary hover:underline underline-offset-4">
                 View all categories <ArrowRight className="ml-2 h-4 w-4" />
             </Link>
         </div>

         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
           {categories.slice(0, 3).map((category) => {
               const count = Object.values(blocks).filter(block => block.category === category.slug).length;
               return (
                 <Link
                   key={category.slug}
                   href={`/blocks/${category.slug}`}
                   className="group relative flex flex-col overflow-hidden rounded-3xl border bg-background/50 backdrop-blur-[2px] p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20"
                 >
                  <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl bg-muted/20 mb-6 border">
                      <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative flex items-center justify-center h-16 w-16 rounded-2xl bg-background shadow-sm border group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                              <category.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                      </div>
                      <div className="absolute inset-0 -z-10 opacity-[0.4]" 
                           style={{ 
                             backgroundImage: `linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)`,
                             backgroundSize: '24px 24px'
                           }} 
                      />
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
         
         <div className="mt-8 flex justify-center md:hidden">
            <Link href="/blocks">
                <Button variant="outline" className="w-full">View all categories</Button>
            </Link>
         </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-12 md:py-24 border-t bg-muted/20">
         <div className="flex flex-col items-center gap-4 text-center mb-12">
             <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose TinFin?</h2>
             <p className="text-muted-foreground max-w-2xl">
                 Designed to speed up your development workflow without sacrificing quality.
             </p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl border shadow-sm transition-all hover:shadow-md">
                 <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                     <Zap className="h-6 w-6 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                 <p className="text-muted-foreground">
                     Stop writing the same boilerplate code. Copy, paste, and ship faster than ever.
                 </p>
             </div>
             <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl border shadow-sm transition-all hover:shadow-md">
                 <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                     <Palette className="h-6 w-6 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Fully Customizable</h3>
                 <p className="text-muted-foreground">
                     Built with Tailwind CSS. You have full control over the design and code.
                 </p>
             </div>
             <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl border shadow-sm transition-all hover:shadow-md">
                 <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                     <Code2 className="h-6 w-6 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold mb-2">TypeScript Ready</h3>
                 <p className="text-muted-foreground">
                     Every component is written in TypeScript, ensuring type safety and great DX.
                 </p>
             </div>
         </div>
      </section>

      {/* FAQs Section */}
      <section className="container mx-auto py-12 md:py-24 border-t">
        <div className="flex flex-col items-center gap-4 text-center mb-12">
           <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
           <p className="text-muted-foreground max-w-2xl">
             Everything you need to know about TinFin Library.
           </p>
        </div>
        
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is TinFin Library?</AccordionTrigger>
              <AccordionContent>
                TinFin Library is a collection of copy-paste components and templates built with Shadcn UI, Tailwind CSS, and Next.js. It helps developers build modern applications faster.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it free to use?</AccordionTrigger>
              <AccordionContent>
                Yes, the core library is completely free and open-source. You can use these components in both personal and commercial projects.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do I need to install any dependencies?</AccordionTrigger>
              <AccordionContent>
                Yes, since these are Shadcn UI components, you will need to have Tailwind CSS and Shadcn UI configured in your project. Each block comes with installation instructions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I customize the components?</AccordionTrigger>
              <AccordionContent>
                Absolutely! The code is yours. You can copy it directly into your project and modify it to match your design requirements and brand guidelines.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How often are new blocks added?</AccordionTrigger>
              <AccordionContent>
                We regularly add new blocks and categories. Check our changelog or follow us on social media to stay updated with the latest releases.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  )
}
