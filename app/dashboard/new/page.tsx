import { WizardContainer } from "@/components/project-wizard/wizard-container"

export const metadata = {
  title: "New Project - SaaSistent",
  description: "Create a new SaaS project with AI assistance",
}

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
        <p className="text-muted-foreground">
          Configure your SaaS application with our AI-powered wizard
        </p>
      </div>
      <WizardContainer />
    </div>
  )
}
