# Architecture

SaaSistent follows a modern Next.js App Router architecture with clear separation of concerns.

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Landing   │  │    Auth     │  │     Dashboard       │  │
│  │    Page     │  │   Pages     │  │   + Wizard          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Middleware                              │
│              (Route Protection + Session Refresh)            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Routes                              │
│  ┌─────────────────────┐  ┌─────────────────────────────┐   │
│  │   /api/ai/*         │  │   /auth/*                   │   │
│  │   AI Integration    │  │   Auth Callbacks            │   │
│  └─────────────────────┘  └─────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌─────────────────────┐  ┌─────────────────────────────┐   │
│  │     Supabase        │  │     Anthropic Claude        │   │
│  │   (Auth + DB)       │  │        (AI API)             │   │
│  └─────────────────────┘  └─────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

### `/app` - Next.js App Router

```
app/
├── (auth)/                 # Route group for auth pages
│   ├── layout.tsx         # Centered card layout
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── reset-password/page.tsx
│   └── update-password/page.tsx
├── api/                    # API route handlers
│   └── ai/
│       ├── expand-idea/route.ts
│       └── generate-outputs/route.ts
├── auth/                   # Auth callbacks (not grouped)
│   ├── callback/route.ts  # OAuth code exchange
│   └── signout/route.ts   # Server-side logout
├── dashboard/              # Protected routes
│   ├── layout.tsx         # Dashboard shell
│   ├── page.tsx           # Projects list
│   └── new/page.tsx       # Project wizard
├── globals.css            # Global styles + theme
├── layout.tsx             # Root layout
└── page.tsx               # Landing page
```

### `/components` - React Components

```
components/
├── auth/                   # Authentication forms
│   ├── login-form.tsx
│   ├── signup-form.tsx
│   ├── reset-password-form.tsx
│   └── update-password-form.tsx
├── dashboard/              # Dashboard UI
│   ├── header.tsx         # Top navigation
│   ├── sidebar.tsx        # Side navigation
│   ├── project-card.tsx   # Project display
│   └── user-menu.tsx      # User dropdown
├── landing/                # Landing page sections
│   ├── header.tsx         # Site header
│   ├── hero.tsx           # Hero section
│   ├── features.tsx       # Features grid
│   ├── pricing.tsx        # Pricing tiers
│   └── footer.tsx         # Site footer
├── project-wizard/         # Wizard steps
│   ├── wizard-container.tsx
│   ├── step-idea.tsx
│   ├── step-ux.tsx
│   ├── step-patterns.tsx
│   ├── step-design.tsx
│   ├── step-framework.tsx
│   ├── step-backend.tsx
│   ├── step-ai.tsx
│   └── step-review.tsx
└── ui/                     # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    └── ... (20+ components)
```

### `/lib` - Utilities and Services

```
lib/
├── ai/                     # AI integration
│   ├── expand-idea.ts     # Idea expansion
│   └── generate-outputs.ts # Output generation
├── supabase/               # Supabase clients
│   ├── client.ts          # Browser client
│   ├── server.ts          # Server client
│   └── middleware.ts      # Session refresh
└── utils.ts               # Shared utilities (cn)
```

## Data Flow

### Authentication Flow

```
1. User visits /login
2. Submits credentials
3. Supabase validates
4. Session cookie set
5. Redirect to /dashboard
6. Middleware validates session on each request
```

### Project Creation Flow

```
1. User navigates to /dashboard/new
2. Wizard steps collect configuration
3. "Expand with AI" calls /api/ai/expand-idea
4. "Generate" calls /api/ai/generate-outputs
5. Outputs displayed for copy/download
6. (Future) Save to Supabase projects table
```

## Component Patterns

### Server Components (Default)

Used for static content and data fetching:

```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: projects } = await supabase.from("projects").select("*")
  return <ProjectList projects={projects} />
}
```

### Client Components

Used for interactivity (marked with `"use client"`):

```tsx
// components/auth/login-form.tsx
"use client"

export function LoginForm() {
  const [email, setEmail] = useState("")
  // ... interactive logic
}
```

### Composition Pattern

Complex components split into subcomponents:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### CVA for Variants

Type-safe variant management:

```tsx
const buttonVariants = cva(baseStyles, {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { default: "...", sm: "...", lg: "..." }
  },
  defaultVariants: { variant: "default", size: "default" }
})
```

## Styling

### Tailwind CSS v4

- Uses CSS variables for theming
- OKLch color space for better color perception
- Dark mode via `.dark` class

### Theme Variables

Defined in `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  /* ... */
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

### Class Merging

Use the `cn()` utility for conditional classes:

```tsx
import { cn } from "@/lib/utils"

<div className={cn(
  "base-styles",
  isActive && "active-styles",
  className
)} />
```
