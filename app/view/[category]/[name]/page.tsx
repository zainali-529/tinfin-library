
import { notFound } from "next/navigation"
import { blocks } from "@/registry/blocks"

interface ViewPageProps {
  params: Promise<{
    category: string
    name: string
  }>
}

export default async function ViewPage(props: ViewPageProps) {
  const params = await props.params;
  const { name } = params
  const block = blocks[name]

  if (!block) {
    notFound()
  }

  const Component = block.component

  return (
    <div className="min-h-screen w-full flex flex-col justify-center bg-background">
      <Component />
    </div>
  )
}
