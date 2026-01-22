"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import type { ProjectConfig } from "./wizard-container"

interface StepFrameworkProps {
  config: ProjectConfig
  updateConfig: (updates: Partial<ProjectConfig>) => void
}

const frameworks = [
  {
    id: "nextjs",
    name: "Next.js",
    version: "16",
    description: "React framework with App Router, server components, and edge functions",
    features: ["Server Components", "App Router", "Edge Runtime", "TypeScript"],
    recommended: true,
  },
  {
    id: "remix",
    name: "Remix",
    version: "2",
    description: "Full stack web framework focused on web standards and modern UX",
    features: ["Nested Routes", "Data Loading", "Form Handling", "TypeScript"],
    recommended: false,
  },
  {
    id: "nuxt",
    name: "Nuxt",
    version: "3",
    description: "Vue.js meta-framework with server-side rendering and static generation",
    features: ["Vue 3", "SSR/SSG", "Auto-imports", "TypeScript"],
    recommended: false,
  },
  {
    id: "sveltekit",
    name: "SvelteKit",
    version: "2",
    description: "Svelte app framework with fast performance and simple syntax",
    features: ["Svelte 5", "SSR/SSG", "Routing", "TypeScript"],
    recommended: false,
  },
]

export function StepFramework({ config, updateConfig }: StepFrameworkProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Frontend Framework</h2>
        <p className="text-muted-foreground">
          Select the framework for your application
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {frameworks.map((framework) => (
          <button
            key={framework.id}
            onClick={() => updateConfig({ framework: framework.id })}
            className={cn(
              "relative flex flex-col items-start rounded-lg border p-4 text-left transition-all hover:border-primary",
              config.framework === framework.id && "border-primary bg-primary/5"
            )}
          >
            {config.framework === framework.id && (
              <div className="absolute right-4 top-4">
                <Check className="h-5 w-5 text-primary" />
              </div>
            )}
            <div className="flex items-center gap-2">
              <Label className="text-lg font-semibold cursor-pointer">
                {framework.name}
              </Label>
              <span className="rounded bg-muted px-1.5 py-0.5 text-xs">
                v{framework.version}
              </span>
              {framework.recommended && (
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                  Recommended
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {framework.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {framework.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full bg-muted px-2 py-0.5 text-xs"
                >
                  {feature}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
