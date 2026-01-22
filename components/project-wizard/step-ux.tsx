"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import type { ProjectConfig } from "./wizard-container"

interface StepUxProps {
  config: ProjectConfig
  updateConfig: (updates: Partial<ProjectConfig>) => void
}

const componentLibraries = [
  {
    id: "shadcn",
    name: "shadcn/ui",
    description: "Beautiful, accessible components built with Radix UI and Tailwind CSS",
    features: ["Fully customizable", "Accessible", "Dark mode", "TypeScript"],
  },
  {
    id: "chakra",
    name: "Chakra UI",
    description: "Simple, modular and accessible component library",
    features: ["Themeable", "Accessible", "Dark mode", "Responsive"],
  },
  {
    id: "mantine",
    name: "Mantine",
    description: "A fully featured React components library with hooks",
    features: ["100+ components", "Hooks library", "Form library", "TypeScript"],
  },
  {
    id: "radix",
    name: "Radix Primitives",
    description: "Unstyled, accessible components for building high-quality design systems",
    features: ["Unstyled", "Accessible", "Composable", "TypeScript"],
  },
]

export function StepUx({ config, updateConfig }: StepUxProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Choose Your Component Library</h2>
        <p className="text-muted-foreground">
          Select the UI component library for your application
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {componentLibraries.map((library) => (
          <button
            key={library.id}
            onClick={() => updateConfig({ componentLibrary: library.id })}
            className={cn(
              "relative flex flex-col items-start rounded-lg border p-4 text-left transition-all hover:border-primary",
              config.componentLibrary === library.id && "border-primary bg-primary/5"
            )}
          >
            {config.componentLibrary === library.id && (
              <div className="absolute right-4 top-4">
                <Check className="h-5 w-5 text-primary" />
              </div>
            )}
            <Label className="text-lg font-semibold cursor-pointer">
              {library.name}
            </Label>
            <p className="mt-1 text-sm text-muted-foreground">
              {library.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {library.features.map((feature) => (
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
