import type { Log } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, FileTextIcon } from "lucide-react"

export function LogsList({ logs }: { logs: Log[] }) {
  // Sort logs by date (newest first)
  const sortedLogs = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (sortedLogs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
          <FileTextIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground text-lg">No development logs found for this project yet.</p>
          <p className="text-sm text-muted-foreground/70 mt-2">Check back later for updates!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {sortedLogs.map((log) => (
        <Card key={log.slug} className="glass-effect hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {new Date(log.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <CardTitle className="text-xl">{log.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: log.content }} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
