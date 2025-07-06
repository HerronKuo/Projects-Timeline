import { getAllProjects } from "@/lib/projects";
import { Timeline } from "@/components/timeline";

export default async function HomePage() {
    const projects = await getAllProjects();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    My Projects Timeline
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Explore my journey through various projects and their
                    development stories
                </p>
            </div>
            <Timeline projects={projects} />
        </div>
    );
}
