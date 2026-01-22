# Project Wizard

The project wizard is an 8-step AI-powered configuration system for creating SaaS project specifications.

## Overview

The wizard guides users through:

1. **Idea** - Project name and description
2. **UX** - Component library selection
3. **Patterns** - Application type
4. **Design** - Visual style
5. **Framework** - Frontend framework
6. **Backend** - Database, auth, storage
7. **AI** - AI provider and features
8. **Review** - Generate outputs

## Architecture

### State Management

The wizard uses React state in `wizard-container.tsx`:

```typescript
interface ProjectConfig {
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
```

### Component Structure

```
wizard-container.tsx       # State + navigation
├── step-idea.tsx         # Text inputs + AI expansion
├── step-ux.tsx           # Radio selection
├── step-patterns.tsx     # Icon cards
├── step-design.tsx       # Visual preview cards
├── step-framework.tsx    # Feature badges
├── step-backend.tsx      # Multi-section selection
├── step-ai.tsx           # Provider + checkboxes
└── step-review.tsx       # Summary + generation
```

## Step Details

### Step 1: Idea

Collects project basics with AI-powered expansion.

**Fields:**
- Project Name (required)
- Description (required)
- Expanded Description (AI-generated)

**AI Feature:**
```typescript
const handleExpandIdea = async () => {
  const response = await fetch("/api/ai/expand-idea", {
    method: "POST",
    body: JSON.stringify({ description: config.description }),
  })
  const { expanded } = await response.json()
  updateConfig({ expandedDescription: expanded })
}
```

### Step 2: UX (Component Library)

| Option | Description |
|--------|-------------|
| shadcn/ui | Radix UI + Tailwind, fully customizable |
| Chakra UI | Themeable, accessible components |
| Mantine | 100+ components with hooks |
| Radix Primitives | Unstyled, accessible primitives |

### Step 3: Patterns (Application Type)

| Pattern | Description | Icon |
|---------|-------------|------|
| Dashboard App | Admin with data viz, tables | LayoutDashboard |
| Landing + App | Marketing + protected area | Globe |
| Marketplace | Multi-vendor, listings, search | ShoppingCart |
| Social Platform | Profiles, feeds, connections | Users |
| Content Platform | Blog, CMS, documentation | FileText |
| Gamified App | Points, badges, leaderboards | Gamepad2 |

### Step 4: Design (Visual Style)

| Style | Description | Preview |
|-------|-------------|---------|
| Minimal | Clean, spacious, subtle | Light gradient |
| Modern | Bold, vibrant, shadows | Purple gradient |
| Corporate | Professional, trustworthy | Blue gradient |
| Playful | Rounded, bright, friendly | Pink-orange gradient |
| Dark Mode First | Optimized for dark UI | Dark gradient |
| Glassmorphism | Frosted glass, blur | Translucent cyan |

### Step 5: Framework

| Framework | Version | Features |
|-----------|---------|----------|
| Next.js | 16 | Server Components, App Router, Edge |
| Remix | 2 | Nested Routes, Data Loading |
| Nuxt | 3 | Vue 3, SSR/SSG, Auto-imports |
| SvelteKit | 2 | Svelte 5, SSR/SSG, Routing |

### Step 6: Backend

**Database:**
- Supabase (PostgreSQL)
- PlanetScale (MySQL)
- MongoDB Atlas
- Firebase

**Authentication:**
- Supabase Auth
- Clerk
- NextAuth.js
- Auth0

**Storage:**
- Supabase Storage
- Cloudflare R2
- AWS S3
- UploadThing

### Step 7: AI

**Providers:**
- Anthropic Claude
- OpenAI GPT
- Cohere
- No AI

**Features (multi-select):**
- Chat Interface
- Semantic Search
- Summarization
- Content Generation
- Classification
- Embeddings

### Step 8: Review

Displays configuration summary and generates:

1. **Init Prompt** - Claude Code initialization instructions
2. **MVP Scope** - Minimal viable product specification
3. **MAX Scope** - Full-featured specification

**Actions:**
- Copy to clipboard
- Download as markdown

## Navigation

### Progress Indicator

```typescript
const progress = (currentStep / steps.length) * 100
<Progress value={progress} className="h-2" />
```

### Step Validation

```typescript
const canProceed = () => {
  switch (currentStep) {
    case 1:
      return config.name.trim().length > 0 &&
             config.description.trim().length > 0
    default:
      return true
  }
}
```

### Navigation Buttons

```typescript
<Button onClick={handleBack} disabled={currentStep === 1}>
  Back
</Button>
<Button onClick={handleNext} disabled={!canProceed()}>
  Next
</Button>
```

## Styling Patterns

### Selection Cards

```tsx
<button
  onClick={() => updateConfig({ field: value })}
  className={cn(
    "relative flex flex-col rounded-lg border p-4 text-left transition-all hover:border-primary",
    config.field === value && "border-primary bg-primary/5"
  )}
>
  {config.field === value && (
    <Check className="absolute right-4 top-4 h-5 w-5 text-primary" />
  )}
  {/* Content */}
</button>
```

### Feature Badges

```tsx
<div className="flex flex-wrap gap-2">
  {features.map((feature) => (
    <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
      {feature}
    </span>
  ))}
</div>
```

## Extending the Wizard

### Adding a New Step

1. Create step component in `components/project-wizard/`:

```typescript
// step-custom.tsx
interface StepCustomProps {
  config: ProjectConfig
  updateConfig: (updates: Partial<ProjectConfig>) => void
}

export function StepCustom({ config, updateConfig }: StepCustomProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Step Title</h2>
        <p className="text-muted-foreground">Step description</p>
      </div>
      {/* Step content */}
    </div>
  )
}
```

2. Add to `ProjectConfig` interface
3. Add to `steps` array in `wizard-container.tsx`
4. Add case in `renderStep()` switch statement
5. Update validation in `canProceed()` if needed

### Adding New Options

Add to the options array in the relevant step:

```typescript
const options = [
  { id: "new-option", name: "New Option", description: "Description" },
  // ...
]
```
