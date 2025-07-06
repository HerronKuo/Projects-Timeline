import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { processMarkdown } from "./markdown"
import type { Project } from "./types"

const projectsDirectory = path.join(process.cwd(), "content/projects")

export async function getAllProjects(): Promise<Project[]> {
  try {
    // Ensure the directory exists
    if (!fs.existsSync(projectsDirectory)) {
      fs.mkdirSync(projectsDirectory, { recursive: true })
      return []
    }

    const fileNames = fs.readdirSync(projectsDirectory)
    const projects = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, "")
          return await getProjectBySlug(slug)
        }),
    )

    // Filter out any null values
    return projects.filter(Boolean) as Project[]
  } catch (error) {
    console.error("Error reading projects:", error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    // Process markdown content to HTML with enhanced features
    const contentHtml = await processMarkdown(content)

    return {
      slug,
      title: data.title || "Untitled Project",
      description: data.description || "",
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      content: contentHtml,
      tags: data.tags || [],
    }
  } catch (error) {
    console.error(`Error processing project ${slug}:`, error)
    return null
  }
}
