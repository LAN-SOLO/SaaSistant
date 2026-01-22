# API Reference

Complete reference for all API routes in SaaSistent.

## Authentication Routes

### GET `/auth/callback`

Handles OAuth code exchange after email confirmation or OAuth login.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `code` | string | OAuth authorization code |
| `next` | string | Redirect path after auth (default: `/dashboard`) |

**Response:**
- Success: Redirect to `next` path
- Error: Redirect to `/login?error=auth_callback_error`

**Example:**
```
GET /auth/callback?code=abc123&next=/dashboard/new
```

---

### POST `/auth/signout`

Server-side logout handler. Clears session cookies.

**Request:**
- Method: POST
- Body: None

**Response:**
- Redirect to `/login` (302)

**Usage:**
```typescript
// Must be called via form submission or POST request
const form = document.createElement("form")
form.method = "POST"
form.action = "/auth/signout"
document.body.appendChild(form)
form.submit()
```

---

## AI Routes

### POST `/api/ai/expand-idea`

Expands a project description using Claude AI.

**Request:**
```typescript
{
  description: string  // Project description to expand
}
```

**Response:**
```typescript
// Success (200)
{
  expanded: string  // AI-expanded description
}

// Error (400)
{
  error: "Description is required"
}

// Error (500)
{
  error: "Failed to expand idea"
}
```

**Example:**
```typescript
const response = await fetch("/api/ai/expand-idea", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    description: "A task management app for developers"
  }),
})

const { expanded } = await response.json()
```

---

### POST `/api/ai/generate-outputs`

Generates project specification documents.

**Request:**
```typescript
{
  name: string                  // Project name
  description: string           // Project description
  expandedDescription?: string  // AI-expanded description
  componentLibrary: string      // "shadcn" | "chakra" | "mantine" | "radix"
  applicationPattern: string    // "dashboard" | "landing" | "marketplace" | etc.
  designStyle: string           // "minimal" | "modern" | "corporate" | etc.
  framework: string             // "nextjs" | "remix" | "nuxt" | "sveltekit"
  database: string              // "supabase" | "planetscale" | "mongodb" | "firebase"
  auth: string                  // "supabase" | "clerk" | "nextauth" | "auth0"
  storage: string               // "supabase" | "cloudflare" | "aws" | "uploadthing"
  aiProvider: string            // "anthropic" | "openai" | "cohere" | "none"
  aiFeatures: string[]          // ["chat", "search", "summarization", etc.]
}
```

**Response:**
```typescript
// Success (200)
{
  mvpScope: string    // MVP specification markdown
  maxScope: string    // Full specification markdown
  initPrompt: string  // Claude Code init prompt
}

// Error (400)
{
  error: "Project name and description are required"
}

// Error (500)
{
  error: "Failed to generate outputs"
}
```

**Example:**
```typescript
const response = await fetch("/api/ai/generate-outputs", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "TeamSync",
    description: "Project management for remote teams",
    componentLibrary: "shadcn",
    applicationPattern: "dashboard",
    designStyle: "modern",
    framework: "nextjs",
    database: "supabase",
    auth: "supabase",
    storage: "supabase",
    aiProvider: "anthropic",
    aiFeatures: ["chat", "search"],
  }),
})

const { mvpScope, maxScope, initPrompt } = await response.json()
```

---

## Supabase Database API

SaaSistent uses Supabase for database operations. Access via the Supabase client.

### Projects Table

**Schema:**
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft',
  config JSONB DEFAULT '{}',
  outputs JSONB DEFAULT '{}',
  framework TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)
```

**Operations:**

```typescript
import { createClient } from "@/lib/supabase/server"

// List projects
const { data: projects } = await supabase
  .from("projects")
  .select("*")
  .order("updated_at", { ascending: false })

// Get single project
const { data: project } = await supabase
  .from("projects")
  .select("*")
  .eq("id", projectId)
  .single()

// Create project
const { data: project } = await supabase
  .from("projects")
  .insert({
    user_id: userId,
    name: "My Project",
    description: "Description",
    config: { /* ProjectConfig */ },
  })
  .select()
  .single()

// Update project
const { data: project } = await supabase
  .from("projects")
  .update({
    name: "Updated Name",
    status: "configured",
    updated_at: new Date().toISOString(),
  })
  .eq("id", projectId)
  .select()
  .single()

// Delete project
const { error } = await supabase
  .from("projects")
  .delete()
  .eq("id", projectId)
```

### Profiles Table

**Schema:**
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)
```

**Operations:**

```typescript
// Get profile
const { data: profile } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", userId)
  .single()

// Update profile
const { data: profile } = await supabase
  .from("profiles")
  .update({
    full_name: "John Doe",
    avatar_url: "https://...",
    updated_at: new Date().toISOString(),
  })
  .eq("id", userId)
  .select()
  .single()
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Missing or invalid parameters |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server-side error |

---

## Response Format

All API responses follow this format:

**Success:**
```json
{
  "data": { ... }
}
```

**Error:**
```json
{
  "error": "Error message description"
}
```

---

## Authentication

Protected routes require a valid Supabase session. The session is automatically handled via cookies set by the Supabase client.

For API routes that need authentication:

```typescript
export async function GET(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  // Continue with authenticated request...
}
```
