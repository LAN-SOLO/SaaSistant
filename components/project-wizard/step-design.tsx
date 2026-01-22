"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import type { ProjectConfig } from "./wizard-container"

interface StepDesignProps {
  config: ProjectConfig
  updateConfig: (updates: Partial<ProjectConfig>) => void
}

const designStyles = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, spacious layouts with subtle colors",
    preview: "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Bold typography, vibrant gradients, shadows",
    preview: "bg-gradient-to-br from-violet-500 to-purple-600",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional, trustworthy, enterprise-ready",
    preview: "bg-gradient-to-br from-blue-600 to-blue-800",
  },
  {
    id: "playful",
    name: "Playful",
    description: "Rounded corners, bright colors, friendly feel",
    preview: "bg-gradient-to-br from-pink-400 to-orange-400",
  },
  {
    id: "dark",
    name: "Dark Mode First",
    description: "Optimized for dark interfaces with accent colors",
    preview: "bg-gradient-to-br from-gray-900 to-black",
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    description: "Frosted glass effects, transparency, blur",
    preview: "bg-gradient-to-br from-cyan-400/50 to-blue-500/50 backdrop-blur",
  },
]

export function StepDesign({ config, updateConfig }: StepDesignProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Design Style</h2>
        <p className="text-muted-foreground">
          Choose a visual style for your application
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {designStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => updateConfig({ designStyle: style.id })}
            className={cn(
              "relative flex flex-col items-start rounded-lg border p-4 text-left transition-all hover:border-primary",
              config.designStyle === style.id && "border-primary bg-primary/5"
            )}
          >
            {config.designStyle === style.id && (
              <div className="absolute right-4 top-4 z-10">
                <Check className="h-5 w-5 text-primary" />
              </div>
            )}
            <div
              className={cn(
                "mb-3 h-20 w-full rounded-lg",
                style.preview
              )}
            />
            <Label className="text-base font-semibold cursor-pointer">
              {style.name}
            </Label>
            <p className="mt-1 text-sm text-muted-foreground">
              {style.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
