import type { Project } from "@/lib/types"
import { CalendarIcon, TagIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProjectHeader({ project }: { project: Project }) {
  return (
    <Card className="glass-effect">
      <CardHeader>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {new Date(project.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {project.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

        {project.content && (
          <div
            className="prose dark:prose-invert max-w-none mt-6"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="flex items-center mt-8 p-4 rounded-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
            <TagIcon className="h-4 w-4 mr-3 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="hover:scale-105 transition-transform duration-200">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
