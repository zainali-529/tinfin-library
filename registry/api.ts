import { blocks } from "@/registry/blocks"
import { Block } from "@/registry/types"
import { promises as fs } from "fs"
import path from "path"

export async function getBlock(name: string): Promise<Block | null> {
  const block = blocks[name]
  if (!block) return null

  const files = await Promise.all(block.files.map(async (file) => {
    const filePath = path.join(process.cwd(), file.path)
    try {
        const content = await fs.readFile(filePath, "utf8")
        return { ...file, content }
    } catch (error) {
        console.error(`Failed to read file: ${filePath}`, error)
        return { ...file, content: "// Failed to read file content" }
    }
  }))

  return {
    ...block,
    files
  }
}

export async function getBlocksByCategory(category: string): Promise<Record<string, Block>> {
  const result: Record<string, Block> = {}
  const categoryBlocks = Object.entries(blocks).filter(([_, block]) => block.category === category)
  
  for (const [name, _] of categoryBlocks) {
      const block = await getBlock(name)
      if (block) {
          result[name] = block
      }
  }
  return result
}

export async function getAllBlocks(): Promise<Record<string, Block>> {
    const result: Record<string, Block> = {}
    for (const name of Object.keys(blocks)) {
        const block = await getBlock(name)
        if (block) {
            result[name] = block
        }
    }
    return result
}
