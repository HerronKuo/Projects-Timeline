import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { processMarkdown } from "./markdown";
import type { Project } from "./types";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export async function getAllProjects(): Promise<Project[]> {
    try {
        // Ensure the directory exists
        if (!fs.existsSync(projectsDirectory)) {
            fs.mkdirSync(projectsDirectory, { recursive: true });
            return [];
        }

        const projectDirs = fs
            .readdirSync(projectsDirectory, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

        const projects = await Promise.all(
            projectDirs.map(async (dirName) => {
                return await getProjectBySlug(dirName);
            }),
        );

        // Filter out any null values and sort by date
        const validProjects = projects.filter((p): p is Project => Boolean(p));
        return validProjects.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
    } catch (error) {
        console.error("Error reading projects:", error);
        return [];
    }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    try {
        const projectDir = path.join(projectsDirectory, slug);
        const fullPath = path.join(projectDir, "index.md");

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        // Process markdown content to HTML with enhanced features
        const contentHtml = await processMarkdown(content);

        return {
            slug,
            title: data.title || "Untitled Project",
            description: data.description || "",
            date: data.date
                ? new Date(data.date).toISOString()
                : new Date().toISOString(),
            tags: data.tags || [],
            content: contentHtml,
        };
    } catch (error) {
        console.error(`Error reading project ${slug}:`, error);
        return null;
    }
}
