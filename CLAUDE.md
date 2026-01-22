# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Build for production
npm start          # Run production build
npm run lint       # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 16 with App Router, React 19, TypeScript (strict)
- **Styling**: Tailwind CSS v4 with CSS variables (OKLch color space), dark mode
- **UI Components**: shadcn/ui + Radix UI primitives + lucide-react icons
- **Backend**: Supabase (Auth, PostgreSQL, Storage)
- **AI**: Anthropic Claude API via `@anthropic-ai/sdk`
- **Utilities**: CVA for variants, tailwind-merge + clsx via `cn()`

## Project Structure

```
app/
├── (auth)/           # Auth pages (login, signup, reset-password)
├── api/ai/           # AI API routes (expand-idea, generate-outputs)
├── auth/             # Auth callbacks (callback, signout)
├── dashboard/        # Protected dashboard routes
└── page.tsx          # Landing page

components/
├── ui/               # shadcn/ui base components
├── auth/             # Auth form components
├── dashboard/        # Dashboard components
├── landing/          # Landing page sections
└── project-wizard/   # 8-step wizard components

lib/
├── supabase/         # Supabase clients (client, server, middleware)
├── ai/               # AI integration (expand-idea, generate-outputs)
└── utils.ts          # cn() utility
```

## Code Style

### TypeScript
- Use `interface` for objects, `type` for unions
- Name props as `ComponentNameProps`
- Avoid `any` - use proper typing

### Components
- Default to Server Components
- Add `"use client"` only for interactivity (useState, event handlers)
- Use composition pattern for complex components
- Follow structure: imports → types → constants → component

### Naming
- Components: PascalCase (`UserMenu`)
- Files: kebab-case (`user-menu.tsx`)
- Variables/functions: camelCase (`handleClick`)
- Booleans: prefix with `is`, `has`, `can` (`isLoading`)
- Event handlers: `handle*` internally, `on*` for props

### Styling
- Use `cn()` for conditional classes
- Mobile-first responsive design
- Use theme variables (`bg-background`, `text-foreground`)
- Order: layout → sizing → spacing → appearance → state

```tsx
<div className={cn(
  "flex flex-col",           // Layout
  "w-full max-w-md",         // Sizing
  "p-4 gap-2",               // Spacing
  "bg-card rounded-lg",      // Appearance
  "hover:shadow-md",         // State
  className
)} />
```

## Authentication

- Browser client: `lib/supabase/client.ts`
- Server client: `lib/supabase/server.ts`
- Middleware: `lib/supabase/middleware.ts`
- Logout MUST be server-side POST route (not client action)
- Auth callback only needs `exchangeCodeForSession(code)`

## Database

Tables with RLS enabled:
- `profiles` - User data (auto-created on signup)
- `projects` - Project configurations (JSONB)

```typescript
const supabase = await createClient()
const { data } = await supabase.from("projects").select("*")
```

## AI Integration

```typescript
// Expand idea
const response = await fetch("/api/ai/expand-idea", {
  method: "POST",
  body: JSON.stringify({ description }),
})

// Generate outputs
const response = await fetch("/api/ai/generate-outputs", {
  method: "POST",
  body: JSON.stringify(projectConfig),
})
```

## Path Aliases

- `@/*` → project root
- `@/components/ui` → shadcn components
- `@/lib/supabase/server` → server Supabase client

## Important Patterns

### Error Handling
```typescript
try {
  const response = await fetch(url)
  if (!response.ok) throw new Error("Failed")
  return await response.json()
} catch (error) {
  console.error("Error:", error)
  setError(error instanceof Error ? error.message : "Unknown error")
}
```

### Form State
```typescript
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
```

### Protected Routes
- Middleware protects `/dashboard/*`
- Server components verify user with `supabase.auth.getUser()`

## Documentation

Full documentation in `docs/`:
- `getting-started.md` - Setup instructions
- `architecture.md` - Project structure
- `authentication.md` - Auth implementation
- `project-wizard.md` - Wizard details
- `ai-integration.md` - AI API usage
- `api-reference.md` - All API routes
- `components.md` - Component reference
- `deployment.md` - Production deployment
- `styleguide.md` - Full coding standards
