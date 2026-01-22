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

- **Framework**: Next.js 16 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with CSS variables (OKLch color space), dark mode support
- **UI Components**: shadcn/ui + Radix UI primitives + lucide-react icons
- **Backend**: Supabase (configured via MCP in .mcp.json)
- **Utilities**: class-variance-authority (CVA) for variants, tailwind-merge + clsx via `cn()`

## Architecture

### App Router Structure
- `app/` - Next.js App Router pages and layouts
- `components/ui/` - shadcn/ui components (Button, Card, Dialog, Input, etc.)
- `lib/utils.ts` - Utility functions, primarily `cn()` for class merging

### Component Patterns

**Slot-based identification** - Components use `data-slot` attributes:
```tsx
<div data-slot="card" className={cn(...)} />
```

**Composition pattern** - Complex components split into subcomponents:
```tsx
<Card>
  <CardHeader><CardTitle>Title</CardTitle></CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

**CVA for variants** - Type-safe variant management:
```tsx
const buttonVariants = cva(baseStyles, {
  variants: { variant: {...}, size: {...} },
  defaultVariants: { variant: "default", size: "default" }
})
```

### Path Aliases
- `@/*` maps to project root (configured in tsconfig.json)
- `@/components/ui` for UI components
- `@/lib/utils` for utilities

### Server vs Client Components
- Default to Server Components
- Add `"use client"` directive only for interactive components (Dialog, DropdownMenu, etc.)

## Styling

- Theme variables defined in `app/globals.css` using OKLch color space
- Dark mode via `.dark` class and `dark:` Tailwind prefix
- Use `cn()` utility from `lib/utils.ts` for conditional class merging

## Database

Supabase integration via:
- `@supabase/supabase-js` - Client SDK
- `@supabase/ssr` - Server-side rendering support
- Environment variables in `.env.local` (not tracked in git)
