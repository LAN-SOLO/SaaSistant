import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Powered by You and a bit of AI</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Build SaaS Applications{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              with AI
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mb-10 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
            Configure your project through an intelligent wizard, get AI-powered recommendations,
            and generate production-ready initialization prompts for Claude Code.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="text-lg px-8">
              <Link href="/signup">
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8">
              <Link href="#features">See How It Works</Link>
            </Button>
          </div>

          {/* Preview/Visual */}
          <div className="mt-16 rounded-xl border bg-card p-2 shadow-2xl">
            <div className="rounded-lg bg-muted/50 p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-3 text-left font-mono text-sm">
                <p className="text-muted-foreground"># Initialize your SaaS project</p>
                <p><span className="text-primary">$</span> npx create-saasistent my-saas-app</p>
                <p className="text-muted-foreground"># AI analyzing your configuration...</p>
                <p className="text-green-500">✓ Project scaffolded with Next.js 16</p>
                <p className="text-green-500">✓ Supabase auth configured</p>
                <p className="text-green-500">✓ UI components installed</p>
                <p className="text-green-500">✓ Ready for Claude Code</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
