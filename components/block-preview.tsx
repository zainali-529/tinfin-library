"use client"

import * as React from "react"
import Link from "next/link"
import { Check, Copy, Monitor, Smartphone, Tablet, GripVertical, RotateCcw, ExternalLink, Loader2, FileCode } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { FileTree } from "@/components/file-tree"
import type { File } from "@/registry/types"
import { Highlight, themes } from "prism-react-renderer"
import { useTheme } from "next-themes"

interface BlockPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  files?: File[]
  code?: string // Kept for backward compatibility if needed, but primary is files
  title?: string
  name?: string
  previewUrl?: string
  children: React.ReactNode
}

export function BlockPreview({
  files,
  code,
  title,
  name,
  previewUrl,
  children,
  className,
  ...props
}: BlockPreviewProps) {
  const [hasCopied, setHasCopied] = React.useState(false)
  const [width, setWidth] = React.useState<string>("100%")
  const [isResizing, setIsResizing] = React.useState(false)
  const resizableRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const [activeFilePath, setActiveFilePath] = React.useState<string>("")
  const [isLoading, setIsLoading] = React.useState(true)
  const { theme } = useTheme()

  // Initialize active file
  React.useEffect(() => {
    if (files && files.length > 0 && !activeFilePath) {
      // Prefer page.tsx or the first component
      const pageFile = files.find(f => f.type === "page")
      const componentFile = files.find(f => f.type === "component")
      setActiveFilePath(pageFile?.path || componentFile?.path || files[0].path)
    }
  }, [files, activeFilePath])

  const activeFile = React.useMemo(() => {
    if (files) {
      return files.find(f => f.path === activeFilePath)
    }
    return null
  }, [files, activeFilePath])

  const displayCode = activeFile?.content || code || ""

  const onCopy = () => {
    navigator.clipboard.writeText(displayCode)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  React.useEffect(() => {
    if (!previewUrl) {
      setIsLoading(false)
    }
  }, [previewUrl])

  const startResizing = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  const stopResizing = React.useCallback(() => {
    setIsResizing(false)
  }, [])

  const resize = React.useCallback(
    (e: MouseEvent) => {
      if (isResizing && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const newWidth = e.clientX - containerRect.left
        // Limit width between 320px and 100% of container
        const constrainedWidth = Math.max(320, Math.min(newWidth, containerRect.width - 40)) // 40px padding buffer
        setWidth(`${constrainedWidth}px`)
      }
    },
    [isResizing]
  )

  React.useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize)
      window.addEventListener("mouseup", stopResizing)
    }
    return () => {
      window.removeEventListener("mousemove", resize)
      window.removeEventListener("mouseup", stopResizing)
    }
  }, [isResizing, resize, stopResizing])

  return (
    <div
      className={cn("group relative my-6 flex flex-col space-y-4", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
            {/* Title (Optional) */}
            {title && <h3 className="text-lg font-semibold">{title}</h3>}

            {/* Tabs & Controls */}
            <div className="flex items-center gap-2">
                <TabsList className="h-9 w-fit rounded-lg border bg-background p-1">
                    <TabsTrigger value="preview" className="h-7 rounded-md px-3 text-xs data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none">Preview</TabsTrigger>
                    <TabsTrigger value="code" className="h-7 rounded-md px-3 text-xs data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none">Code</TabsTrigger>
                    {name && <TabsTrigger value="install" className="h-7 rounded-md px-3 text-xs data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none">Install</TabsTrigger>}
                </TabsList>
            </div>
        </div>

        <TabsContent value="preview" className="relative rounded-xl border bg-background shadow-sm mt-0">
            {/* Toolbar for Preview */}
            <div className="flex items-center justify-between border-b px-4 py-2 bg-muted/20">
                <div className="flex items-center gap-1.5 w-full">
                    <div className="flex items-center gap-1.5 mr-4">
                        <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    {/* Address Bar Simulation */}
                    <div className="flex-1 max-w-xl mx-auto hidden sm:flex items-center h-7 bg-background rounded-md border text-xs text-muted-foreground px-3 font-mono overflow-hidden whitespace-nowrap text-ellipsis">
                         {previewUrl ? `http://localhost:3000${previewUrl}` : 'Component Preview'}
                    </div>
                </div>
                <div className="flex items-center gap-2 pl-4 border-l ml-4">
                    {previewUrl && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-foreground"
                            asChild
                            title="Open in New Tab"
                        >
                            <Link href={previewUrl} target="_blank">
                                <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        onClick={() => setWidth("100%")}
                        title="Full Width"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                    </Button>
                    <div className="h-4 w-px bg-border" />
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-7 w-7 text-muted-foreground hover:text-foreground", width === "100%" && "bg-muted text-foreground")}
                        onClick={() => setWidth("100%")}
                    >
                        <Monitor className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-7 w-7 text-muted-foreground hover:text-foreground", width === "768px" && "bg-muted text-foreground")}
                        onClick={() => setWidth("768px")}
                    >
                        <Tablet className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-7 w-7 text-muted-foreground hover:text-foreground", width === "375px" && "bg-muted text-foreground")}
                        onClick={() => setWidth("375px")}
                    >
                        <Smartphone className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>

            {/* Preview Area */}
            <div 
                ref={containerRef}
                className={cn(
                    "relative flex w-full items-center justify-center overflow-hidden",
                    width === "100%" 
                        ? "h-[850px]" 
                        : "min-h-[850px] bg-muted/10 py-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_14px]"
                )}
            >
                <div 
                    ref={resizableRef}
                    className={cn(
                        "relative overflow-hidden bg-background shadow-lg mx-auto",
                        width === "100%" ? "rounded-none border-x-0 border-b-0 shadow-none" : "rounded-md border",
                        !isResizing && "transition-all duration-300 ease-in-out"
                    )}
                    style={{ width: width, height: "850px" }}
                >
                    {/* Overlay to catch events during resize */}
                    {isResizing && <div className="absolute inset-0 z-50 bg-transparent cursor-ew-resize" />}
                    
                    {previewUrl ? (
                        <div className="relative h-full w-full">
                            {isLoading && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background">
                                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                </div>
                            )}
                            <iframe
                                src={previewUrl}
                                className="h-full w-full border-0 bg-background"
                                onLoad={() => setIsLoading(false)}
                                title="Block Preview"
                            />
                        </div>
                    ) : (
                        children
                    )}

                    {/* Resize Handle */}
                    <div
                        className="absolute right-0 top-0 bottom-0 w-4 cursor-ew-resize flex items-center justify-center bg-transparent hover:bg-muted/50 transition-colors z-50 group/handle"
                        onMouseDown={startResizing}
                    >
                        <div className="h-8 w-1 rounded-full bg-muted-foreground/30 group-hover/handle:bg-primary/50 transition-colors" />
                    </div>
                </div>
                
                {/* Width Indicator (visible when resizing) */}
                {isResizing && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded-md shadow-md z-50">
                        {parseInt(width === "100%" ? containerRef.current?.offsetWidth.toString() || "0" : width)}px
                    </div>
                )}
            </div>
        </TabsContent>

        <TabsContent value="code" className="relative rounded-xl border bg-muted/30 mt-0">
             <div className="flex items-center justify-between border-b px-4 py-2 bg-muted/50">
                <span className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                  <FileCode className="h-4 w-4" />
                  {activeFile ? activeFile.path : "source"}
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={onCopy}
                >
                    {hasCopied ? (
                        <Check className="h-3.5 w-3.5" />
                    ) : (
                        <Copy className="h-3.5 w-3.5" />
                    )}
                    <span className="sr-only">Copy code</span>
                </Button>
             </div>
             <div className="flex h-[500px]">
               {files && files.length > 0 && (
                 <div className="w-[250px] border-r bg-background/50 overflow-y-auto shrink-0">
                   <FileTree 
                     files={files} 
                     activeFile={activeFilePath} 
                     onSelect={setActiveFilePath} 
                   />
                 </div>
               )}
               <div className="flex-1 overflow-auto text-sm font-mono" style={{ backgroundColor: theme === "dark" ? "#1e1e1e" : "#f5f5f5" }}>
                  <Highlight
                    theme={theme === "dark" ? themes.vsDark : themes.vsLight}
                    code={displayCode}
                    language="tsx"
                  >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <pre style={{ ...style, backgroundColor: "transparent", padding: "1rem", margin: 0 }}>
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            {/* Line Numbers (Optional, but adds to IDE feel) */}
                            <span className="inline-block w-8 select-none text-gray-500 text-right mr-4 opacity-50 text-xs">
                              {i + 1}
                            </span>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
               </div>
             </div>
        </TabsContent>

        {name && (
          <TabsContent value="install" className="relative rounded-xl border bg-muted/30 mt-0 p-4">
             <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium leading-none">Installation</h4>
                </div>
                <Tabs defaultValue="npx" className="w-full">
                    <TabsList className="h-9 w-fit rounded-lg border bg-background p-1 mb-4">
                        <TabsTrigger value="npx" className="h-7 rounded-md px-3 text-xs">npx</TabsTrigger>
                        <TabsTrigger value="pnpm" className="h-7 rounded-md px-3 text-xs">pnpm</TabsTrigger>
                        <TabsTrigger value="yarn" className="h-7 rounded-md px-3 text-xs">yarn</TabsTrigger>
                        <TabsTrigger value="bun" className="h-7 rounded-md px-3 text-xs">bun</TabsTrigger>
                    </TabsList>
                    
                    {["npx", "pnpm", "yarn", "bun"].map((pm) => {
                        const command = 
                          pm === "npx" ? `npx shadcn@latest add @tinfin-library/${name}` :
                          pm === "pnpm" ? `pnpm dlx shadcn@latest add @tinfin-library/${name}` :
                          pm === "yarn" ? `npx shadcn@latest add @tinfin-library/${name}` :
                          `bun x shadcn@latest add @tinfin-library/${name}`
                        
                        return (
                          <TabsContent key={pm} value={pm} className="mt-0">
                              <div className="relative rounded-lg border bg-background font-mono text-sm">
                                  <div className="flex items-center justify-between px-4 py-3">
                                      <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
                                          <code className="text-xs">{command}</code>
                                      </div>
                                      <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6 ml-2 shrink-0"
                                          onClick={() => {
                                              navigator.clipboard.writeText(command)
                                              setHasCopied(true)
                                              setTimeout(() => setHasCopied(false), 2000)
                                          }}
                                      >
                                          {hasCopied ? (
                                              <Check className="h-3 w-3" />
                                          ) : (
                                              <Copy className="h-3 w-3" />
                                          )}
                                          <span className="sr-only">Copy command</span>
                                      </Button>
                                  </div>
                              </div>
                          </TabsContent>
                        )
                    })}
                </Tabs>
             </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
