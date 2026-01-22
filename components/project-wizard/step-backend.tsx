"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import type { ProjectConfig } from "./wizard-container"

interface StepBackendProps {
  config: ProjectConfig
  updateConfig: (updates: Partial<ProjectConfig>) => void
}

const databases = [
  { id: "supabase", name: "Supabase (PostgreSQL)", description: "Open source Firebase alternative" },
  { id: "planetscale", name: "PlanetScale (MySQL)", description: "Serverless MySQL platform" },
  { id: "mongodb", name: "MongoDB Atlas", description: "Cloud document database" },
  { id: "firebase", name: "Firebase", description: "Google's real-time database" },
]

const authProviders = [
  { id: "supabase", name: "Supabase Auth", description: "Built-in auth with row-level security" },
  { id: "clerk", name: "Clerk", description: "Complete user management" },
  { id: "nextauth", name: "NextAuth.js", description: "Flexible authentication for Next.js" },
  { id: "auth0", name: "Auth0", description: "Enterprise identity platform" },
]

const storageOptions = [
  { id: "supabase", name: "Supabase Storage", description: "S3-compatible object storage" },
  { id: "cloudflare", name: "Cloudflare R2", description: "Zero egress fees object storage" },
  { id: "aws", name: "AWS S3", description: "Industry standard object storage" },
  { id: "uploadthing", name: "UploadThing", description: "File uploads made easy" },
]

export function StepBackend({ config, updateConfig }: StepBackendProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Backend Services</h2>
        <p className="text-muted-foreground">
          Configure your database, authentication, and storage
        </p>
      </div>

      {/* Database */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Database</Label>
        <div className="grid gap-3 md:grid-cols-2">
          {databases.map((db) => (
            <button
              key={db.id}
              onClick={() => updateConfig({ database: db.id })}
              className={cn(
                "relative flex items-start rounded-lg border p-3 text-left transition-all hover:border-primary",
                config.database === db.id && "border-primary bg-primary/5"
              )}
            >
              {config.database === db.id && (
                <Check className="absolute right-3 top-3 h-4 w-4 text-primary" />
              )}
              <div>
                <p className="font-medium">{db.name}</p>
                <p className="text-sm text-muted-foreground">{db.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Authentication */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Authentication</Label>
        <div className="grid gap-3 md:grid-cols-2">
          {authProviders.map((auth) => (
            <button
              key={auth.id}
              onClick={() => updateConfig({ auth: auth.id })}
              className={cn(
                "relative flex items-start rounded-lg border p-3 text-left transition-all hover:border-primary",
                config.auth === auth.id && "border-primary bg-primary/5"
              )}
            >
              {config.auth === auth.id && (
                <Check className="absolute right-3 top-3 h-4 w-4 text-primary" />
              )}
              <div>
                <p className="font-medium">{auth.name}</p>
                <p className="text-sm text-muted-foreground">{auth.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Storage */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">File Storage</Label>
        <div className="grid gap-3 md:grid-cols-2">
          {storageOptions.map((storage) => (
            <button
              key={storage.id}
              onClick={() => updateConfig({ storage: storage.id })}
              className={cn(
                "relative flex items-start rounded-lg border p-3 text-left transition-all hover:border-primary",
                config.storage === storage.id && "border-primary bg-primary/5"
              )}
            >
              {config.storage === storage.id && (
                <Check className="absolute right-3 top-3 h-4 w-4 text-primary" />
              )}
              <div>
                <p className="font-medium">{storage.name}</p>
                <p className="text-sm text-muted-foreground">{storage.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
