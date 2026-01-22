import {
  Sparkles,
  Zap,
  Palette,
  Layers,
  Shield,
  Terminal
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Claude AI expands your ideas, suggests architecture, and generates optimized initialization prompts.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Go from idea to production-ready project configuration in minutes, not hours.",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description: "Choose your tech stack, design system, and patterns. Every decision is yours.",
  },
  {
    icon: Layers,
    title: "Modern Stack",
    description: "Next.js 16, React 19, TypeScript, Tailwind CSS, and your choice of backend services.",
  },
  {
    icon: Shield,
    title: "Production-Ready",
    description: "Generated code follows best practices with authentication, security, and performance built-in.",
  },
  {
    icon: Terminal,
    title: "Claude Code Ready",
    description: "Export initialization prompts designed specifically for Claude Code to build your entire app.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need to build faster
          </h2>
          <p className="text-lg text-muted-foreground">
            SaaSistent combines intelligent configuration with AI recommendations
            to accelerate your development workflow.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
