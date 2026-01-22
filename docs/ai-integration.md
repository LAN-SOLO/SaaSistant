# AI Integration

SaaSistent uses the Anthropic Claude API for intelligent project configuration assistance.

## Overview

AI features include:

- **Idea Expansion**: Enhance project descriptions with product insights
- **MVP Scope Generation**: Create minimal viable product specifications
- **MAX Scope Generation**: Create comprehensive feature specifications
- **Init Prompt Generation**: Create Claude Code initialization prompts

## Setup

### Environment Variables

```env
ANTHROPIC_API_KEY=your-api-key
```

### Installation

The Anthropic SDK is already installed:

```bash
npm install @anthropic-ai/sdk
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Components                     │
│  ┌─────────────────┐      ┌─────────────────────────┐   │
│  │   step-idea.tsx │      │    step-review.tsx      │   │
│  │  "Expand with   │      │  "Generate Outputs"     │   │
│  │      AI"        │      │                         │   │
│  └────────┬────────┘      └───────────┬─────────────┘   │
└───────────┼───────────────────────────┼─────────────────┘
            │                           │
            ▼                           ▼
┌───────────────────────┐   ┌─────────────────────────────┐
│ /api/ai/expand-idea   │   │  /api/ai/generate-outputs   │
│      route.ts         │   │        route.ts             │
└───────────┬───────────┘   └───────────┬─────────────────┘
            │                           │
            ▼                           ▼
┌───────────────────────┐   ┌─────────────────────────────┐
│  lib/ai/expand-idea   │   │  lib/ai/generate-outputs    │
│        .ts            │   │          .ts                │
└───────────┬───────────┘   └───────────┬─────────────────┘
            │                           │
            └─────────────┬─────────────┘
                          ▼
              ┌─────────────────────┐
              │   Anthropic Claude  │
              │        API          │
              └─────────────────────┘
```

## API Routes

### POST `/api/ai/expand-idea`

Expands a project description with product insights.

**Request:**
```json
{
  "description": "A project management tool for remote teams"
}
```

**Response:**
```json
{
  "expanded": "This project management tool addresses the growing need for..."
}
```

**Implementation:**
```typescript
// app/api/ai/expand-idea/route.ts
export async function POST(request: Request) {
  const { description } = await request.json()
  const expanded = await expandIdea(description)
  return NextResponse.json({ expanded })
}
```

### POST `/api/ai/generate-outputs`

Generates MVP scope, MAX scope, and init prompt.

**Request:**
```json
{
  "name": "TeamSync",
  "description": "Project management for remote teams",
  "componentLibrary": "shadcn",
  "applicationPattern": "dashboard",
  "designStyle": "modern",
  "framework": "nextjs",
  "database": "supabase",
  "auth": "supabase",
  "storage": "supabase",
  "aiProvider": "anthropic",
  "aiFeatures": ["chat", "search"]
}
```

**Response:**
```json
{
  "mvpScope": "# MVP Scope\n\n## Core Features...",
  "maxScope": "# MAX Scope\n\n## Complete Features...",
  "initPrompt": "Create a new Next.js application..."
}
```

## Library Functions

### `expandIdea(description: string)`

Location: `lib/ai/expand-idea.ts`

```typescript
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function expandIdea(description: string): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are a SaaS product expert. Expand on the following product idea, identifying:
- Core value proposition
- Target users
- Key features (3-5 main features)
- Potential monetization strategy
- Technical considerations

Product idea: ${description}`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type === "text") {
    return content.text
  }
  return "Unable to expand idea."
}
```

### `generateMvpScope(config: ProjectConfig)`

Location: `lib/ai/generate-outputs.ts`

Generates a minimal viable product specification including:
- Core features only
- User stories
- Simplified database schema
- Essential API endpoints
- Required pages/routes

### `generateMaxScope(config: ProjectConfig)`

Generates a comprehensive specification including:
- All features
- Advanced user stories
- Complete database schema
- Full API specification
- All pages/routes
- Admin dashboard
- Analytics and reporting
- Security considerations

### `generateInitPrompt(config: ProjectConfig)`

Generates a Claude Code initialization prompt including:
- Project description
- Technology stack
- Folder structure
- Coding conventions
- Setup steps
- Dependencies

## Prompt Engineering

### Best Practices

1. **Be specific**: Include all relevant context
2. **Structure output**: Request specific formats (markdown, sections)
3. **Set constraints**: Specify length, focus areas
4. **Provide examples**: When format matters

### Example Prompt Structure

```typescript
const message = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 2048,
  messages: [
    {
      role: "user",
      content: `Generate an MVP scope document for:

Project: ${config.name}
Description: ${config.description}

Tech Stack:
- Framework: ${config.framework}
- Database: ${config.database}
...

Create a focused MVP scope that includes:
1. Core features only
2. User stories
3. Database schema
4. API endpoints
5. Required pages

Format as markdown.`,
    },
  ],
})
```

## Error Handling

### API Route Error Handling

```typescript
export async function POST(request: Request) {
  try {
    const { description } = await request.json()

    if (!description) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      )
    }

    const expanded = await expandIdea(description)
    return NextResponse.json({ expanded })
  } catch (error) {
    console.error("Error expanding idea:", error)
    return NextResponse.json(
      { error: "Failed to expand idea" },
      { status: 500 }
    )
  }
}
```

### Client-Side Error Handling

```typescript
const handleExpandIdea = async () => {
  setIsExpanding(true)
  try {
    const response = await fetch("/api/ai/expand-idea", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    })

    if (response.ok) {
      const data = await response.json()
      updateConfig({ expandedDescription: data.expanded })
    } else {
      console.error("Failed to expand idea")
    }
  } catch (error) {
    console.error("Network error:", error)
  } finally {
    setIsExpanding(false)
  }
}
```

## Rate Limiting

For production, implement rate limiting:

```typescript
// Example with simple in-memory rate limiting
const rateLimit = new Map<string, number[]>()

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown"
  const now = Date.now()
  const windowMs = 60000 // 1 minute
  const maxRequests = 10

  const requests = rateLimit.get(ip) || []
  const recentRequests = requests.filter(time => now - time < windowMs)

  if (recentRequests.length >= maxRequests) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429 }
    )
  }

  rateLimit.set(ip, [...recentRequests, now])
  // Continue with request...
}
```

## Cost Optimization

1. **Use appropriate models**: Claude Sonnet for most tasks
2. **Limit max_tokens**: Set reasonable limits
3. **Cache responses**: For repeated queries
4. **Batch requests**: Use Promise.all for multiple generations

```typescript
// Parallel generation
const [mvpScope, maxScope, initPrompt] = await Promise.all([
  generateMvpScope(config),
  generateMaxScope(config),
  generateInitPrompt(config),
])
```
