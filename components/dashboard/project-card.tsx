import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { MoreHorizontal, ExternalLink, Trash2, Edit } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProjectCardProps {
  project: {
    id: string
    name: string
    description?: string
    status: "draft" | "configured" | "generated"
    framework?: string
    created_at: string
    updated_at: string
  }
}

const statusColors = {
  draft: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  configured: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  generated: "bg-green-500/10 text-green-600 dark:text-green-400",
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">
              <Link
                href={`/dashboard/project/${project.id}`}
                className="hover:underline"
              >
                {project.name}
              </Link>
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {project.description || "No description"}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/project/${project.id}`}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/project/${project.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={statusColors[project.status]}>
              {project.status}
            </Badge>
            {project.framework && (
              <Badge variant="outline">{project.framework}</Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
