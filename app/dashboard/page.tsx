import Link from "next/link"
import { Plus, FolderOpen } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/dashboard/project-card"

export const metadata = {
  title: "Dashboard - SaaSistent",
  description: "Manage your SaaS projects",
}

export default async function DashboardPage() {
  const supabase = await createClient()

  // Fetch user's projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Create and manage your SaaS applications
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      {/* Projects Grid */}
      {projects && projects.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <FolderOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No projects yet</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Get started by creating your first SaaS project. Our AI-powered wizard
            will guide you through the configuration process.
          </p>
          <Button asChild className="mt-6">
            <Link href="/dashboard/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Project
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
