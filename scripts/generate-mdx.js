const fs = require("fs")
const path = require("path")

const contentDir = path.join(process.cwd(), "content", "projects")

// Wczytaj dane projektów z lib/projects.ts
const projectsContent = fs.readFileSync(
  path.join(process.cwd(), "lib", "projects.ts"),
  "utf-8"
)

// Wyodrębnij tablicę legacyProjects
const match = projectsContent.match(
  /export const legacyProjects: Project\[\] = \[([\s\S]*?)\n\]/
)

if (!match) {
  console.error("Nie można znaleźć legacyProjects w pliku")
  process.exit(1)
}

// Parsuj projekty używając JSON
const projectsArrayText = match[1]
const projects = []

// Prosty parser dla obiektów projektów
const projectMatches = projectsArrayText.matchAll(/\{[\s\S]*?\n  \}/g)

for (const projectMatch of projectMatches) {
  const projectText = projectMatch[0]
  
  const name = projectText.match(/name: "([^"]*)"/)?.[1]
  const description = projectText.match(/description:\s*"([^"]*)"/)?.[1] || projectText.match(/description:\s*\n\s*"([^"]*)"/)?.[1]
  const cohort = projectText.match(/cohort: "([^"]*)"/)?.[1]
  const url = projectText.match(/url: "([^"]*)"/)?.[1]
  const docsUrl = projectText.match(/docsUrl: "([^"]*)"/)?.[1]
  const stars = projectText.match(/stars: (\d+)/)?.[1]
  const category = projectText.match(/category: "([^"]*)"/)?.[1]
  
  if (name && description && cohort && url && category) {
    projects.push({ name, description, cohort, url, docsUrl, stars, category })
  }
}

console.log(`Znaleziono ${projects.length} projektów`)

// Funkcja do stworzenia slug z nazwy projektu
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Generuj plik MDX dla każdego projektu
projects.forEach((project) => {
  const slug = createSlug(project.name)
  
  const lines = [
    "---",
    `title: ${project.name}`,
    `name: ${project.name}`,
    `description: ${project.description}`,
    `cohort: ${project.cohort}`,
    `url: ${project.url}`,
  ]
  
  if (project.docsUrl) {
    lines.push(`docsUrl: ${project.docsUrl}`)
  }
  
  if (project.stars) {
    lines.push(`stars: ${project.stars}`)
  }
  
  lines.push(`category: ${project.category}`)
  lines.push("---")
  lines.push("")
  
  const frontmatter = lines.join("\n") + "\n"

  const filePath = path.join(contentDir, `${slug}.mdx`)
  fs.writeFileSync(filePath, frontmatter, "utf-8")
  console.log(`✓ Created ${slug}.mdx`)
})

console.log(`\n✅ Generated ${projects.length} MDX files in content/projects/`)
