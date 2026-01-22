# SaaSistent Style Guide

Comprehensive coding standards and conventions for the SaaSistent project.

## Table of Contents

1. [TypeScript](#typescript)
2. [React Components](#react-components)
3. [File Organization](#file-organization)
4. [Naming Conventions](#naming-conventions)
5. [Styling with Tailwind](#styling-with-tailwind)
6. [State Management](#state-management)
7. [API & Data Fetching](#api--data-fetching)
8. [Error Handling](#error-handling)
9. [Accessibility](#accessibility)
10. [Performance](#performance)

---

## TypeScript

### Strict Mode

TypeScript strict mode is enabled. Never use `any` without justification.

```typescript
// Bad
const data: any = fetchData()

// Good
interface ProjectData {
  id: string
  name: string
}
const data: ProjectData = fetchData()
```

### Interfaces vs Types

Use `interface` for object shapes, `type` for unions/primitives.

```typescript
// Interface for objects
interface User {
  id: string
  email: string
  name?: string
}

// Type for unions
type Status = "draft" | "configured" | "generated"

// Type for primitives/utilities
type ID = string
type Nullable<T> = T | null
```

### Props Interfaces

Name component props as `ComponentNameProps`.

```typescript
interface ButtonProps {
  variant?: "default" | "destructive" | "outline"
  size?: "default" | "sm" | "lg"
  children: React.ReactNode
}

export function Button({ variant = "default", size = "default", children }: ButtonProps) {
  // ...
}
```

### Generic Types

Use descriptive names for generics.

```typescript
// Bad
function fetch<T>(url: string): Promise<T>

// Good
function fetch<ResponseData>(url: string): Promise<ResponseData>
```

### Null Handling

Prefer `undefined` over `null`. Use optional chaining and nullish coalescing.

```typescript
// Optional properties
interface Config {
  name: string
  description?: string  // undefined, not null
}

// Nullish coalescing
const displayName = user.name ?? "Anonymous"

// Optional chaining
const avatar = user.profile?.avatar?.url
```

---

## React Components

### Component Structure

Follow this order in component files:

```typescript
"use client" // 1. Directive (if needed)

import { useState } from "react" // 2. React imports
import { useRouter } from "next/navigation" // 3. Next.js imports
import { Button } from "@/components/ui/button" // 4. Internal imports
import { cn } from "@/lib/utils" // 5. Utilities
import type { User } from "@/types" // 6. Types

// 7. Types/Interfaces
interface ComponentProps {
  user: User
  className?: string
}

// 8. Constants
const DEFAULT_LIMIT = 10

// 9. Component
export function Component({ user, className }: ComponentProps) {
  // a. Hooks
  const router = useRouter()
  const [state, setState] = useState(false)

  // b. Derived state
  const isActive = user.status === "active"

  // c. Handlers
  const handleClick = () => {
    setState(true)
  }

  // d. Effects (if any)

  // e. Render
  return (
    <div className={cn("base-styles", className)}>
      {/* content */}
    </div>
  )
}
```

### Server vs Client Components

Default to Server Components. Add `"use client"` only when needed.

```typescript
// Server Component (default) - for static content, data fetching
export default async function Page() {
  const data = await fetchData()
  return <div>{data.name}</div>
}

// Client Component - for interactivity
"use client"
export function InteractiveForm() {
  const [value, setValue] = useState("")
  return <input value={value} onChange={(e) => setValue(e.target.value)} />
}
```

**Use Client Components for:**
- `useState`, `useEffect`, `useReducer`
- Event handlers (`onClick`, `onChange`)
- Browser APIs (`localStorage`, `window`)
- Custom hooks with state

### Composition Pattern

Break complex components into subcomponents.

```typescript
// card.tsx
export function Card({ children, className }: CardProps) {
  return <div className={cn("rounded-lg border", className)}>{children}</div>
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="p-6 pb-0">{children}</div>
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-6">{children}</div>
}

// Usage
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Forwarding Refs

Use `forwardRef` for components that wrap native elements.

```typescript
import { forwardRef } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div>
        {label && <label>{label}</label>}
        <input ref={ref} className={cn("base-styles", className)} {...props} />
      </div>
    )
  }
)
Input.displayName = "Input"
```

---

## File Organization

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route groups (no URL segment)
│   ├── api/               # API routes
│   └── dashboard/         # Dashboard routes
├── components/
│   ├── ui/                # Base UI components (shadcn)
│   ├── auth/              # Auth-specific components
│   ├── dashboard/         # Dashboard components
│   └── [feature]/         # Feature-specific components
├── lib/
│   ├── supabase/          # Supabase clients
│   ├── ai/                # AI integration
│   └── utils.ts           # Shared utilities
├── hooks/                 # Custom React hooks
├── types/                 # Shared TypeScript types
└── styles/                # Global styles (if needed)
```

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | kebab-case | `user-menu.tsx` |
| Pages | `page.tsx` | `app/dashboard/page.tsx` |
| Layouts | `layout.tsx` | `app/dashboard/layout.tsx` |
| API Routes | `route.ts` | `app/api/users/route.ts` |
| Utilities | kebab-case | `format-date.ts` |
| Types | kebab-case | `user-types.ts` |
| Hooks | camelCase with `use` | `useAuth.ts` |

### Barrel Exports

Use index files sparingly, only for public APIs.

```typescript
// components/ui/index.ts
export { Button } from "./button"
export { Card } from "./card"
export { Input } from "./input"
```

---

## Naming Conventions

### Variables & Functions

```typescript
// camelCase for variables and functions
const userName = "John"
const isActive = true
function getUserById(id: string) {}

// PascalCase for components and types
function UserProfile() {}
interface UserData {}
type UserStatus = "active" | "inactive"

// SCREAMING_SNAKE_CASE for constants
const MAX_RETRIES = 3
const API_BASE_URL = "/api"
```

### Boolean Variables

Prefix with `is`, `has`, `can`, `should`.

```typescript
const isLoading = true
const hasError = false
const canEdit = user.role === "admin"
const shouldRefetch = data.stale
```

### Event Handlers

Prefix with `handle` for handlers, `on` for props.

```typescript
// In component
const handleClick = () => {}
const handleSubmit = (e: FormEvent) => {}

// As props
interface ButtonProps {
  onClick?: () => void
  onSubmit?: (data: FormData) => void
}
```

### API Functions

Use verb prefixes describing the action.

```typescript
// CRUD operations
async function getUser(id: string) {}
async function createProject(data: ProjectData) {}
async function updateProject(id: string, data: Partial<ProjectData>) {}
async function deleteProject(id: string) {}

// Other actions
async function fetchProjects() {}
async function sendEmail(to: string, body: string) {}
async function validateToken(token: string) {}
```

---

## Styling with Tailwind

### Class Organization

Order classes logically: layout → sizing → spacing → appearance → state.

```tsx
<div className="
  flex flex-col             // Layout
  w-full max-w-md           // Sizing
  p-4 gap-2                 // Spacing
  bg-card rounded-lg border // Appearance
  hover:shadow-md           // State
  transition-shadow         // Animation
">
```

### Using cn() Utility

Always use `cn()` for conditional classes.

```tsx
import { cn } from "@/lib/utils"

<button
  className={cn(
    "px-4 py-2 rounded-lg font-medium",
    "bg-primary text-primary-foreground",
    "hover:bg-primary/90",
    isDisabled && "opacity-50 cursor-not-allowed",
    className
  )}
/>
```

### Responsive Design

Mobile-first approach with breakpoint prefixes.

```tsx
<div className="
  grid
  grid-cols-1              // Mobile: 1 column
  md:grid-cols-2           // Tablet: 2 columns
  lg:grid-cols-3           // Desktop: 3 columns
  gap-4
">
```

### Dark Mode

Use `dark:` prefix for dark mode styles.

```tsx
<div className="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-gray-100
  border-gray-200 dark:border-gray-800
">
```

### CSS Variables

Use theme variables for consistent theming.

```tsx
// Use semantic color names
<div className="bg-background text-foreground">
<div className="bg-card border-border">
<div className="bg-primary text-primary-foreground">
<div className="text-muted-foreground">

// Not raw colors (unless intentional)
// Avoid: bg-slate-100 text-slate-900
```

### Component Variants with CVA

```typescript
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode
}
```

---

## State Management

### Local State

Use `useState` for component-local state.

```typescript
const [isOpen, setIsOpen] = useState(false)
const [formData, setFormData] = useState({ name: "", email: "" })
```

### Form State

For complex forms, use controlled components with proper typing.

```typescript
interface FormState {
  name: string
  email: string
  errors: Record<string, string>
}

const [form, setForm] = useState<FormState>({
  name: "",
  email: "",
  errors: {},
})

const updateField = (field: keyof FormState, value: string) => {
  setForm(prev => ({ ...prev, [field]: value }))
}
```

### Lifting State

Lift state to the nearest common ancestor.

```typescript
// Parent manages state
function WizardContainer() {
  const [config, setConfig] = useState<ProjectConfig>(initialConfig)

  const updateConfig = (updates: Partial<ProjectConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  return <StepIdea config={config} updateConfig={updateConfig} />
}

// Child receives props
function StepIdea({ config, updateConfig }: StepProps) {
  return (
    <input
      value={config.name}
      onChange={(e) => updateConfig({ name: e.target.value })}
    />
  )
}
```

### URL State

Use URL params for shareable/bookmarkable state.

```typescript
import { useSearchParams } from "next/navigation"

function FilteredList() {
  const searchParams = useSearchParams()
  const filter = searchParams.get("filter") ?? "all"

  // Update URL
  const setFilter = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("filter", value)
    router.push(`?${params.toString()}`)
  }
}
```

---

## API & Data Fetching

### Server Components (Preferred)

Fetch data directly in Server Components.

```typescript
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false })

  return <ProjectList projects={projects ?? []} />
}
```

### API Route Handlers

Structure API routes consistently.

```typescript
// app/api/projects/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Validate body...
    // Create resource...
    return NextResponse.json({ data: created }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}
```

### Client-Side Fetching

Use proper loading and error states.

```typescript
"use client"

function DataComponent() {
  const [data, setData] = useState<Data | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/data")
        if (!res.ok) throw new Error("Failed to fetch")
        const json = await res.json()
        setData(json.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) return <Skeleton />
  if (error) return <ErrorMessage message={error} />
  if (!data) return null

  return <DataDisplay data={data} />
}
```

---

## Error Handling

### Try-Catch Pattern

Always handle errors gracefully.

```typescript
async function handleSubmit() {
  setIsLoading(true)
  setError(null)

  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Request failed")
    }

    const result = await response.json()
    onSuccess(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    setError(message)
  } finally {
    setIsLoading(false)
  }
}
```

### Error Boundaries

Use error boundaries for component-level errors.

```typescript
// app/dashboard/error.tsx
"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <p className="text-muted-foreground">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
```

### Form Validation

Validate before submission.

```typescript
interface ValidationErrors {
  [key: string]: string
}

function validateForm(data: FormData): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!data.name.trim()) {
    errors.name = "Name is required"
  }

  if (!data.email.includes("@")) {
    errors.email = "Invalid email address"
  }

  if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters"
  }

  return errors
}
```

---

## Accessibility

### Semantic HTML

Use proper HTML elements.

```tsx
// Good
<button onClick={handleClick}>Submit</button>
<nav><ul><li><a href="/home">Home</a></li></ul></nav>
<main><article><h1>Title</h1></article></main>

// Bad
<div onClick={handleClick}>Submit</div>
<div><div><div><span>Home</span></div></div></div>
```

### ARIA Labels

Add labels for interactive elements.

```tsx
<button aria-label="Close dialog">
  <X className="h-4 w-4" />
</button>

<input
  aria-label="Search projects"
  aria-describedby="search-hint"
/>
<p id="search-hint" className="sr-only">
  Search by project name or description
</p>
```

### Keyboard Navigation

Ensure keyboard accessibility.

```tsx
<button
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleAction()
    }
  }}
>
  Action
</button>
```

### Focus Management

Manage focus for modals and dynamic content.

```tsx
"use client"
import { useEffect, useRef } from "react"

function Modal({ isOpen, onClose }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
    }
  }, [isOpen])

  return (
    <dialog open={isOpen}>
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
    </dialog>
  )
}
```

---

## Performance

### Image Optimization

Use Next.js Image component.

```tsx
import Image from "next/image"

<Image
  src="/hero.png"
  alt="Hero image"
  width={800}
  height={600}
  priority // For above-the-fold images
/>
```

### Code Splitting

Use dynamic imports for large components.

```tsx
import dynamic from "next/dynamic"

const HeavyChart = dynamic(() => import("./heavy-chart"), {
  loading: () => <Skeleton className="h-64" />,
  ssr: false, // If client-only
})
```

### Memoization

Memoize expensive computations and callbacks.

```tsx
import { useMemo, useCallback } from "react"

function FilteredList({ items, filter }) {
  // Memoize expensive filtering
  const filteredItems = useMemo(
    () => items.filter(item => item.status === filter),
    [items, filter]
  )

  // Memoize callbacks passed to children
  const handleSelect = useCallback((id: string) => {
    setSelected(id)
  }, [])

  return <List items={filteredItems} onSelect={handleSelect} />
}
```

### Avoiding Re-renders

Prevent unnecessary re-renders.

```tsx
// Extract static content
const StaticHeader = () => <h1>Dashboard</h1>

// Use React.memo for pure components
const ProjectCard = React.memo(function ProjectCard({ project }) {
  return <Card>{project.name}</Card>
})

// Keep state as local as possible
function Parent() {
  // Don't lift state here if only Child needs it
  return <Child />
}
```

---

## Git Conventions

### Commit Messages

```
<type>: <short description>

<body - what and why>

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no code change)
- `refactor`: Code restructure
- `test`: Tests
- `chore`: Maintenance

### Branch Naming

```
feature/add-user-auth
fix/login-redirect-loop
docs/update-readme
refactor/extract-api-client
```
