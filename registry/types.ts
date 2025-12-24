import * as React from "react"

export type File = {
  path: string
  content?: string
  type?: "component" | "page" | "utility"
}

export type Block = {
  component: React.ComponentType
  category: string
  files: File[]
}
