"use client"

import * as React from "react"
import { File as FileIcon, Folder, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import type { File } from "@/registry/types"

interface FileTreeProps {
  files: File[]
  activeFile: string
  onSelect: (path: string) => void
}

type TreeNode = {
  name: string
  path?: string
  children: Record<string, TreeNode>
}

export function FileTree({ files, activeFile, onSelect }: FileTreeProps) {
  const tree = React.useMemo(() => {
    const root: TreeNode = { name: "root", children: {} }

    files.forEach((file) => {
      const parts = file.path.split("/")
      let current = root

      parts.forEach((part, index) => {
        if (!current.children[part]) {
          current.children[part] = {
            name: part,
            children: {},
          }
        }
        current = current.children[part]
        
        // If it's the last part, it's a file
        if (index === parts.length - 1) {
          current.path = file.path
        }
      })
    })

    return root
  }, [files])

  return (
    <div className="w-full text-sm">
      <div className="pl-2 pt-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        Files
      </div>
      <TreeItem node={tree} activeFile={activeFile} onSelect={onSelect} level={0} />
    </div>
  )
}

function TreeItem({ 
  node, 
  activeFile, 
  onSelect, 
  level 
}: { 
  node: TreeNode
  activeFile: string
  onSelect: (path: string) => void
  level: number 
}) {
  const sortedChildren = Object.values(node.children).sort((a, b) => {
    // Folders first, then files
    const aIsFolder = Object.keys(a.children).length > 0
    const bIsFolder = Object.keys(b.children).length > 0
    if (aIsFolder && !bIsFolder) return -1
    if (!aIsFolder && bIsFolder) return 1
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="flex flex-col">
      {sortedChildren.map((child) => (
        <React.Fragment key={child.name}>
          <Node 
            node={child} 
            activeFile={activeFile} 
            onSelect={onSelect} 
            level={level} 
          />
        </React.Fragment>
      ))}
    </div>
  )
}

function Node({ 
  node, 
  activeFile, 
  onSelect, 
  level 
}: { 
  node: TreeNode
  activeFile: string
  onSelect: (path: string) => void
  level: number 
}) {
  const isFolder = Object.keys(node.children).length > 0
  const [isOpen, setIsOpen] = React.useState(true) // Default open for now
  
  const isSelected = node.path === activeFile

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 py-1.5 px-2 cursor-pointer transition-colors rounded-sm mx-2",
          isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => {
          if (isFolder) {
            setIsOpen(!isOpen)
          } else if (node.path) {
            onSelect(node.path)
          }
        }}
      >
        {isFolder ? (
          isOpen ? (
            <FolderOpen className="h-4 w-4 shrink-0 text-blue-500" />
          ) : (
            <Folder className="h-4 w-4 shrink-0 text-blue-500" />
          )
        ) : (
          <FileIcon className="h-4 w-4 shrink-0" />
        )}
        <span className="truncate">{node.name}</span>
      </div>
      
      {isFolder && isOpen && (
        <TreeItem 
          node={node} 
          activeFile={activeFile} 
          onSelect={onSelect} 
          level={level + 1} 
        />
      )}
    </div>
  )
}
