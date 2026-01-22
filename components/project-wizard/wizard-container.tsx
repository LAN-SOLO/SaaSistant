"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { StepIdea } from "./step-idea"
import { StepUx } from "./step-ux"
import { StepPatterns } from "./step-patterns"
import { StepDesign } from "./step-design"
import { StepFramework } from "./step-framework"
import { StepBackend } from "./step-backend"
import { StepAi } from "./step-ai"
import { StepReview } from "./step-review"

export interface ProjectConfig {
  // Step 1: Idea
  name: string
  description: string
  expandedDescription?: string

  // Step 2: UX
  componentLibrary: string

  // Step 3: Patterns
  applicationPattern: string

  // Step 4: Design
  designStyle: string

  // Step 5: Framework
  framework: string

  // Step 6: Backend
  database: string
  auth: string
  storage: string

  // Step 7: AI
  aiProvider: string
  aiFeatures: string[]
}

const initialConfig: ProjectConfig = {
  name: "",
  description: "",
  expandedDescription: "",
  componentLibrary: "shadcn",
  applicationPattern: "dashboard",
  designStyle: "minimal",
  framework: "nextjs",
  database: "supabase",
  auth: "supabase",
  storage: "supabase",
  aiProvider: "anthropic",
  aiFeatures: [],
}

const steps = [
  { id: 1, title: "Idea", description: "Describe your project" },
  { id: 2, title: "UX", description: "Component library" },
  { id: 3, title: "Patterns", description: "Application type" },
  { id: 4, title: "Design", description: "Visual style" },
  { id: 5, title: "Framework", description: "Frontend framework" },
  { id: 6, title: "Backend", description: "Backend services" },
  { id: 7, title: "AI", description: "AI integration" },
  { id: 8, title: "Review", description: "Generate outputs" },
]

export function WizardContainer() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [config, setConfig] = useState<ProjectConfig>(initialConfig)
  const [isLoading, setIsLoading] = useState(false)

  const updateConfig = useCallback((updates: Partial<ProjectConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }, [])

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return config.name.trim().length > 0 && config.description.trim().length > 0
      default:
        return true
    }
  }

  const progress = (currentStep / steps.length) * 100

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepIdea config={config} updateConfig={updateConfig} />
      case 2:
        return <StepUx config={config} updateConfig={updateConfig} />
      case 3:
        return <StepPatterns config={config} updateConfig={updateConfig} />
      case 4:
        return <StepDesign config={config} updateConfig={updateConfig} />
      case 5:
        return <StepFramework config={config} updateConfig={updateConfig} />
      case 6:
        return <StepBackend config={config} updateConfig={updateConfig} />
      case 7:
        return <StepAi config={config} updateConfig={updateConfig} />
      case 8:
        return <StepReview config={config} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">
            Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
          </span>
          <span className="text-muted-foreground">
            {steps[currentStep - 1].description}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Indicators */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-2 ${
              step.id === currentStep
                ? "text-primary"
                : step.id < currentStep
                ? "text-muted-foreground"
                : "text-muted-foreground/50"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium ${
                step.id === currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : step.id < currentStep
                  ? "border-primary bg-primary/10"
                  : "border-muted"
              }`}
            >
              {step.id}
            </div>
            <span className="hidden lg:inline text-xs">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        {currentStep < steps.length ? (
          <Button onClick={handleNext} disabled={!canProceed() || isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : null}
      </div>
    </div>
  )
}
