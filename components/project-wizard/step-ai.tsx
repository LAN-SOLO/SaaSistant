"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import type { ProjectConfig } from "./wizard-container"

interface StepAiProps {
  config: ProjectConfig
  updateConfig: (updates: Partial<ProjectConfig>) => void
}

const aiProviders = [
  { id: "anthropic", name: "Anthropic Claude", description: "Advanced reasoning and analysis" },
  { id: "openai", name: "OpenAI GPT", description: "Versatile language model" },
  { id: "cohere", name: "Cohere", description: "Enterprise NLP platform" },
  { id: "none", name: "No AI", description: "Skip AI integration" },
]

const aiFeatures = [
  { id: "chat", name: "Chat Interface", description: "Conversational AI assistant" },
  { id: "search", name: "Semantic Search", description: "AI-powered content search" },
  { id: "summarization", name: "Summarization", description: "Auto-summarize content" },
  { id: "generation", name: "Content Generation", description: "Generate text, emails, etc." },
  { id: "classification", name: "Classification", description: "Categorize and tag content" },
  { id: "embeddings", name: "Embeddings", description: "Vector representations for similarity" },
]

export function StepAi({ config, updateConfig }: StepAiProps) {
  const toggleFeature = (featureId: string) => {
    const features = config.aiFeatures.includes(featureId)
      ? config.aiFeatures.filter((f) => f !== featureId)
      : [...config.aiFeatures, featureId]
    updateConfig({ aiFeatures: features })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">AI Integration</h2>
        <p className="text-muted-foreground">
          Configure AI capabilities for your application
        </p>
      </div>

      {/* AI Provider */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">AI Provider</Label>
        <div className="grid gap-3 md:grid-cols-2">
          {aiProviders.map((provider) => (
            <button
              key={provider.id}
              onClick={() => updateConfig({ aiProvider: provider.id })}
              className={cn(
                "relative flex items-start rounded-lg border p-3 text-left transition-all hover:border-primary",
                config.aiProvider === provider.id && "border-primary bg-primary/5"
              )}
            >
              {config.aiProvider === provider.id && (
                <Check className="absolute right-3 top-3 h-4 w-4 text-primary" />
              )}
              <div>
                <p className="font-medium">{provider.name}</p>
                <p className="text-sm text-muted-foreground">{provider.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {config.aiProvider !== "none" && (
        <>
          <Separator />

          {/* AI Features */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">AI Features</Label>
            <p className="text-sm text-muted-foreground">
              Select the AI features you want to include
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {aiFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className={cn(
                    "flex items-start space-x-3 rounded-lg border p-3 transition-all",
                    config.aiFeatures.includes(feature.id) && "border-primary bg-primary/5"
                  )}
                >
                  <Checkbox
                    id={feature.id}
                    checked={config.aiFeatures.includes(feature.id)}
                    onCheckedChange={() => toggleFeature(feature.id)}
                  />
                  <div className="space-y-1">
                    <label
                      htmlFor={feature.id}
                      className="font-medium cursor-pointer"
                    >
                      {feature.name}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
