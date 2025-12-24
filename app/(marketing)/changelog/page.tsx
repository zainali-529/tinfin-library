"use client";

export default function ChangelogPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Changelog</h1>
        <p className="text-lg text-muted-foreground">
          Recent updates and improvements to Tinfin Library.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Auth-3 Animation Revamp</h3>
            <span className="text-xs text-muted-foreground">2025-12-22</span>
          </div>
          <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
            <li>Added dashed grid background with crosshairs</li>
            <li>Introduced centered glow pulse with smooth scaling</li>
            <li>Implemented wireframe cube and rotating rings</li>
            <li>Split animation into reusable component</li>
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Navigation Updates</h3>
            <span className="text-xs text-muted-foreground">2025-12-22</span>
          </div>
          <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
            <li>Removed Templates from top navigation</li>
            <li>Renamed Documentation to Docs</li>
            <li>Added Changelog link</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
