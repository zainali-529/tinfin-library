export default function RoadmapPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Roadmap</h1>
        <p className="text-lg text-muted-foreground">
          See what we are working on and what&apos;s coming next.
        </p>
      </div>
      <div className="mt-8 space-y-8">
        <div className="flex gap-4">
           <div className="flex flex-col items-center">
              <div className="h-4 w-4 rounded-full bg-primary" />
              <div className="h-full w-0.5 bg-border" />
           </div>
           <div className="pb-8">
              <h3 className="text-lg font-bold">Phase 1: Foundation</h3>
              <p className="text-muted-foreground">Initial release with core components and blocks.</p>
           </div>
        </div>
        <div className="flex gap-4">
           <div className="flex flex-col items-center">
              <div className="h-4 w-4 rounded-full bg-muted" />
              <div className="h-full w-0.5 bg-border" />
           </div>
           <div className="pb-8">
              <h3 className="text-lg font-bold">Phase 2: Templates</h3>
              <p className="text-muted-foreground">Adding full page templates and more complex blocks.</p>
           </div>
        </div>
      </div>
    </div>
  )
}
