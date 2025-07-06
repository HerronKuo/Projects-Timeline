import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { processMarkdown } from "./markdown";
import type { Log } from "./types";

export async function getProjectLogs(projectSlug: string): Promise<Log[]> {
    try {
        const logsDirectory = path.join(
            process.cwd(),
            "content/projects",
            projectSlug,
            "logs",
        );

        // Ensure the directory exists
        if (!fs.existsSync(logsDirectory)) {
            fs.mkdirSync(logsDirectory, { recursive: true });
            return [];
        }

        const fileNames = fs.readdirSync(logsDirectory);
        const logs = await Promise.all(
            fileNames
                .filter((fileName) => fileName.endsWith(".md"))
                .map(async (fileName) => {
                    const logSlug = fileName.replace(/\.md$/, "");
                    const fullPath = path.join(logsDirectory, fileName);
                    const fileContents = fs.readFileSync(fullPath, "utf8");
                    const { data, content } = matter(fileContents);

                    // Process markdown content to HTML with enhanced features
                    const contentHtml = await processMarkdown(content);

                    return {
                        slug: logSlug,
                        title: data.title || "Untitled Log",
                        date: data.date
                            ? new Date(data.date).toISOString()
                            : new Date().toISOString(),
                        content: contentHtml,
                        projectSlug,
                    };
                }),
        );

        // Sort by date
        return logs.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
    } catch (error) {
        console.error(`Error reading logs for project ${projectSlug}:`, error);
        return [];
    }
}
