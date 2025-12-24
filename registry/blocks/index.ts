import * as React from "react"
import { Auth1 } from "@/registry/blocks/auth/auth-1"
import { Auth2 } from "@/registry/blocks/auth/auth-2"
import { Auth3 } from "@/registry/blocks/auth/auth-3"
import type { Block } from "@/registry/types"

export const blocks: Record<string, Block> = {
  "auth-3": {
    component: Auth3,
    category: "auth",
    files: [
      {
        path: "registry/blocks/auth/auth-3.tsx",
        type: "component",
      }
    ]
  },
  "auth-2": {
    component: Auth2,
    category: "auth",
    files: [
      {
        path: "registry/blocks/auth/auth-2.tsx",
        type: "component",
      }
    ]
  },
  "auth-1": {
    component: Auth1,
    category: "auth",
    files: [
      {
        path: "registry/blocks/auth/auth-1.tsx",
        type: "component",
      }
    ]
  }
}
