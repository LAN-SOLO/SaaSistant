"use client"

import { useState } from "react"
import { Download, FileText, Loader2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ProjectConfig } from "./wizard-container"

interface StepReviewProps {
  config: ProjectConfig
}

export function StepReview({ config }: StepReviewProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [outputs, setOutputs] = useState<{
    mvpScope?: string
    maxScope?: string
    initPrompt?: string
  }>({})
  const [copied, setCopied] = useState<string | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/ai/generate-outputs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })

      if (response.ok) {
        const data = await response.json()
        setOutputs(data)
      }
    } catch (error) {
      console.error("Failed to generate outputs:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = async (content: string, key: string) => {
    await navigator.clipboard.writeText(content)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Review & Generate</h2>
        <p className="text-muted-foreground">
          Review your configuration and generate output files
        </p>
      </div>

      {/* Configuration Summary */}
      <div className="rounded-lg border p-4 space-y-4">
        <h3 className="font-semibold">Configuration Summary</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Project</p>
            <p className="font-medium">{config.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Framework</p>
            <Badge variant="secondary">{config.framework}</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Component Library</p>
            <Badge variant="secondary">{config.componentLibrary}</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pattern</p>
            <Badge variant="secondary">{config.applicationPattern}</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Design</p>
            <Badge variant="secondary">{config.designStyle}</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Database</p>
            <Badge variant="secondary">{config.database}</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Auth</p>
            <Badge variant="secondary">{config.auth}</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">AI</p>
            <Badge variant="secondary">{config.aiProvider}</Badge>
          </div>
        </div>
        {config.aiFeatures.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">AI Features</p>
            <div className="flex flex-wrap gap-2">
              {config.aiFeatures.map((feature) => (
                <Badge key={feature} variant="outline">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <FileText className="mr-2 h-4 w-4" />
            Generate Output Files
          </>
        )}
      </Button>

      {/* Generated Outputs */}
      {(outputs.mvpScope || outputs.maxScope || outputs.initPrompt) && (
        <Tabs defaultValue="init" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="init">Init Prompt</TabsTrigger>
            <TabsTrigger value="mvp">MVP Scope</TabsTrigger>
            <TabsTrigger value="max">MAX Scope</TabsTrigger>
          </TabsList>
          <TabsContent value="init" className="mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Claude Code Initialization Prompt</p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(outputs.initPrompt!, "init")}
                  >
                    {copied === "init" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleDownload(outputs.initPrompt!, `${config.name}-init-prompt.md`)
                    }
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-64 rounded-lg border bg-muted p-4">
                <pre className="text-sm whitespace-pre-wrap">{outputs.initPrompt}</pre>
              </ScrollArea>
            </div>
          </TabsContent>
          <TabsContent value="mvp" className="mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">MVP Scope Document</p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(outputs.mvpScope!, "mvp")}
                  >
                    {copied === "mvp" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleDownload(outputs.mvpScope!, `${config.name}-mvp-scope.md`)
                    }
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-64 rounded-lg border bg-muted p-4">
                <pre className="text-sm whitespace-pre-wrap">{outputs.mvpScope}</pre>
              </ScrollArea>
            </div>
          </TabsContent>
          <TabsContent value="max" className="mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">MAX Scope Document</p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(outputs.maxScope!, "max")}
                  >
                    {copied === "max" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleDownload(outputs.maxScope!, `${config.name}-max-scope.md`)
                    }
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-64 rounded-lg border bg-muted p-4">
                <pre className="text-sm whitespace-pre-wrap">{outputs.maxScope}</pre>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
