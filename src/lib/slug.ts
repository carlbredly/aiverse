export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getToolSlug(tool: { slug?: string; name: string }): string {
  return tool.slug ?? slugify(tool.name)
}
