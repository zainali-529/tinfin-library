import * as React from "react"
import { ShieldCheck, LayoutDashboard, FormInput } from "lucide-react"

export interface Category {
  name: string
  slug: string
  description: string
  icon: React.ElementType
}

export const categories: Category[] = [
  {
    name: "Authentication",
    slug: "auth",
    description: "Login forms, sign up pages, and authentication components.",
    icon: ShieldCheck,
  },
]
