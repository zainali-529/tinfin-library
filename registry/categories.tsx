import * as React from "react"
import { AuthPreview } from "@/components/category-previews/auth-preview"

export interface Category {
  name: string
  slug: string
  description: string
  preview: React.ReactNode
}

export const categories: Category[] = [
  {
    name: "Authentication",
    slug: "auth",
    description: "Login forms, sign up pages, and authentication components.",
    preview: <AuthPreview />,
  },
]
