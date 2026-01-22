import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out SaaSistent",
    features: [
      "3 projects",
      "Basic AI recommendations",
      "Community templates",
      "Export to Claude Code",
    ],
    cta: "Get Started",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For serious builders and small teams",
    features: [
      "Unlimited projects",
      "Advanced AI expansion",
      "Custom templates",
      "Priority support",
      "Team collaboration",
      "Version history",
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with specific needs",
    features: [
      "Everything in Pro",
      "Custom AI training",
      "SSO & SAML",
      "Dedicated support",
      "SLA guarantee",
      "On-premise option",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free and scale as you grow. No hidden fees.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "relative flex flex-col",
                tier.highlighted && "border-primary shadow-lg scale-105"
              )}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.period && (
                    <span className="text-muted-foreground">{tier.period}</span>
                  )}
                </div>
                <CardDescription className="mt-2">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.highlighted ? "default" : "outline"}
                  asChild
                >
                  <Link href={tier.href}>{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
