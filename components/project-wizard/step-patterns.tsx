"use client"

import { Check, LayoutDashboard, Globe, ShoppingCart, Users, FileText, Gamepad2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import type { ProjectConfig } from "./wizard-container"

interface StepPatternsProps {
  config: ProjectConfig
  updateConfig: (updates: Partial<ProjectConfig>) => void
}

const applicationPatterns = [
  {
    id: "dashboard",
    name: "Dashboard App",
    description: "Admin dashboard with data visualization, tables, and management features",
    icon: LayoutDashboard,
  },
  {
    id: "landing",
    name: "Landing + App",
    description: "Marketing landing page with a protected application area",
    icon: Globe,
  },
  {
    id: "marketplace",
    name: "Marketplace",
    description: "Multi-vendor marketplace with listings, search, and transactions",
    icon: ShoppingCart,
  },
  {
    id: "social",
    name: "Social Platform",
    description: "User profiles, feeds, connections, and real-time interactions",
    icon: Users,
  },
  {
    id: "content",
    name: "Content Platform",
    description: "Blog, CMS, or documentation site with rich content editing",
    icon: FileText,
  },
  {
    id: "gamified",
    name: "Gamified App",
    description: "Points, badges, leaderboards, and engagement mechanics",
    icon: Gamepad2,
  },
]

export function StepPatterns({ config, updateConfig }: StepPatternsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Application Pattern</h2>
        <p className="text-muted-foreground">
          What type of application are you building?
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {applicationPatterns.map((pattern) => (
          <button
            key={pattern.id}
            onClick={() => updateConfig({ applicationPattern: pattern.id })}
            className={cn(
              "relative flex flex-col items-start rounded-lg border p-4 text-left transition-all hover:border-primary",
              config.applicationPattern === pattern.id && "border-primary bg-primary/5"
            )}
          >
            {config.applicationPattern === pattern.id && (
              <div className="absolute right-4 top-4">
                <Check className="h-5 w-5 text-primary" />
              </div>
            )}
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <pattern.icon className="h-5 w-5" />
            </div>
            <Label className="text-base font-semibold cursor-pointer">
              {pattern.name}
            </Label>
            <p className="mt-1 text-sm text-muted-foreground">
              {pattern.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
