"use client"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ProjectConfig } from "./wizard-container"

interface StepIdeaProps {
  config: ProjectConfig
  updateConfig: (updates: Partial<ProjectConfig>) => void
}

export function StepIdea({ config, updateConfig }: StepIdeaProps) {
  const [isExpanding, setIsExpanding] = useState(false)

  const handleExpandIdea = async () => {
    if (!config.description.trim()) return

    setIsExpanding(true)
    try {
      const response = await fetch("/api/ai/expand-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: config.description }),
      })

      if (response.ok) {
        const data = await response.json()
        updateConfig({ expandedDescription: data.expanded })
      }
    } catch (error) {
      console.error("Failed to expand idea:", error)
    } finally {
      setIsExpanding(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">What are you building?</h2>
        <p className="text-muted-foreground">
          Tell us about your SaaS idea and let AI help expand it
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            placeholder="My SaaS App"
            value={config.name}
            onChange={(e) => updateConfig({ name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Project Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your SaaS idea in a few sentences. What problem does it solve? Who is it for?"
            rows={4}
            value={config.description}
            onChange={(e) => updateConfig({ description: e.target.value })}
          />
        </div>

        <Button
          variant="outline"
          onClick={handleExpandIdea}
          disabled={!config.description.trim() || isExpanding}
          className="w-full"
        >
          {isExpanding ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Expand with AI
        </Button>

        {config.expandedDescription && (
          <div className="space-y-2">
            <Label>AI-Expanded Description</Label>
            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="whitespace-pre-wrap">{config.expandedDescription}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
