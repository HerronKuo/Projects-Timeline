import Link from "next/link";
import type { Project } from "@/lib/types";
import { CalendarIcon, ArrowRightIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Timeline({ projects }: { projects: Project[] }) {
    // Sort projects by date (newest first)
    const sortedProjects = [...projects].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (sortedProjects.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="glass-effect rounded-lg p-8 max-w-md mx-auto">
                    <p className="text-muted-foreground">No projects found. Add some markdown files to the content/projects directory!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3 md:space-y-8">
            {sortedProjects.map((project, index) => (
                <div key={project.slug} className="flex group">
                    <div className="flex flex-col items-center mr-2 md:mr-6 flex-shrink-0">
                        <div className="timeline-circle bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg transition-transform duration-300"></div>
                        {index < sortedProjects.length - 1 && <div className="w-0.5 h-44 md:h-40 bg-gradient-to-b from-blue-500/50 to-purple-500/50"></div>}
                    </div>
                    <Card className="w-full glass-effect flex-grow h-52">
                        <CardHeader className="pb-2 md:pb-6">
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {new Date(project.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                            <CardTitle className="text-2xl mb-2 md:mb-4">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-2 md:mb-6 leading-relaxed line-clamp-2 md:line-clamp-1">{project.description}</p>
                            <Link href={`/projects/${project.slug}`} className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-200">
                                View Project Details
                                <ArrowRightIcon className="ml-2 h-4 w-4" />
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    );
}
