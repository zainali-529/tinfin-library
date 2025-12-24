import { ShieldCheck } from "lucide-react"

export function AuthPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-950 p-6">
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>
        <div className="h-2 w-20 rounded-full bg-zinc-800" />
        <div className="h-2 w-16 rounded-full bg-zinc-800" />
        <div className="absolute bottom-4 left-4 right-4 h-8 rounded bg-primary/20" />
      </div>
    </div>
  )
}
