import Link from "next/link";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { getProjectLogs } from "@/lib/logs";
import { ProjectHeader } from "@/components/project-header";
import { LogsList } from "@/components/logs-list";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

export async function generateStaticParams() {
    const projects = await getAllProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const project = await getProjectBySlug(params.slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} | My Projects`,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
    const project = await getProjectBySlug(params.slug);

    if (!project) {
        notFound();
    }

    const logs = await getProjectLogs(params.slug);

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 group transition-colors duration-200">
                <ArrowLeftIcon className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Timeline
            </Link>

            <ProjectHeader project={project} />

            <div className="mt-16">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">Development Logs</h2>
                    <p className="text-muted-foreground">Follow the journey of this project through detailed development logs</p>
                </div>
                <LogsList logs={logs} />
            </div>
        </div>
    );
}
