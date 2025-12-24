interface DocPageProps {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function DocPage(props: DocPageProps) {
  const params = await props.params;
  const slug = params.slug?.join("/") || "index"

  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1>Documentation: {slug}</h1>
      <p>
        This is a placeholder for documentation content. In a real application,
        this would load MDX files or content from a CMS based on the slug: <code>{slug}</code>.
      </p>
      <h2>Introduction</h2>
      <p>
        Welcome to the TinFin Library documentation.
      </p>
    </div>
  )
}
