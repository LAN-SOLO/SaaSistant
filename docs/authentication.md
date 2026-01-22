# Authentication

SaaSistent uses Supabase Auth for secure, email-based authentication.

## Overview

The authentication system provides:

- Email/password registration
- Email confirmation
- Login/logout
- Password reset
- Session management
- Route protection

## Architecture

### Supabase Clients

Three client types for different contexts:

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Browser Client │  │  Server Client  │  │Middleware Client│
│  (client.ts)    │  │  (server.ts)    │  │ (middleware.ts) │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ Client-side     │  │ Server          │  │ Edge runtime    │
│ components      │  │ components      │  │ Session refresh │
│ Form handlers   │  │ Data fetching   │  │ Route protection│
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

#### Browser Client (`lib/supabase/client.ts`)

For client components (forms, interactive UI):

```typescript
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

#### Server Client (`lib/supabase/server.ts`)

For server components and API routes:

```typescript
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

#### Middleware Client (`lib/supabase/middleware.ts`)

For session refresh in middleware:

```typescript
export async function updateSession(request: NextRequest) {
  // Creates client with request/response cookie handling
  // Returns { supabaseResponse, session }
}
```

## Authentication Flows

### Sign Up

```
User                    App                     Supabase
  │                      │                         │
  │─── Submit form ─────>│                         │
  │                      │─── signUp() ───────────>│
  │                      │                         │
  │                      │<── Confirmation email ──│
  │                      │                         │
  │<── Show success ─────│                         │
  │                      │                         │
  │─── Click email link ─────────────────────────>│
  │                      │                         │
  │<───────────── Redirect to /auth/callback ─────│
  │                      │                         │
  │                      │─ exchangeCodeForSession │
  │                      │                         │
  │<── Redirect to /dashboard ────────────────────│
```

**Code** (`components/auth/signup-form.tsx`):

```typescript
const { error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`,
  },
})
```

### Login

```typescript
const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
})

if (!error) {
  router.push("/dashboard")
  router.refresh()
}
```

### Logout

**Important**: Logout MUST be a server-side POST request to properly clear cookies.

```typescript
// components/dashboard/user-menu.tsx
const handleSignOut = async () => {
  const form = document.createElement("form")
  form.method = "POST"
  form.action = "/auth/signout"
  document.body.appendChild(form)
  form.submit()
}
```

```typescript
// app/auth/signout/route.ts
export async function POST(request: Request) {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return NextResponse.redirect(`${origin}/login`, { status: 302 })
}
```

### Password Reset

1. User requests reset at `/reset-password`
2. Email sent with reset link
3. User clicks link → redirected to `/update-password`
4. User sets new password

```typescript
// Request reset
await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: `${window.location.origin}/update-password`,
})

// Update password
await supabase.auth.updateUser({ password })
```

## Route Protection

### Middleware (`middleware.ts`)

```typescript
export async function middleware(request: NextRequest) {
  const { supabaseResponse, session } = await updateSession(request)
  const { pathname } = request.nextUrl

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      const redirectUrl = new URL("/login", request.url)
      redirectUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Redirect authenticated users from auth pages
  if (["/login", "/signup", "/reset-password"].includes(pathname)) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|auth/callback).*)",
  ],
}
```

### Server Component Protection

```typescript
// app/dashboard/layout.tsx
export default async function DashboardLayout({ children }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return <DashboardShell user={user}>{children}</DashboardShell>
}
```

## Auth Callback

The callback route exchanges the OAuth code for a session:

```typescript
// app/auth/callback/route.ts
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/dashboard"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`)
}
```

**Important**: Do NOT add `token_hash` or `type` handling to the callback. The `exchangeCodeForSession` method handles everything.

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| HTTP 431 | Cookie size too large | Clear browser cookies |
| Invalid login | Wrong credentials | Check email/password |
| Email not confirmed | User didn't verify | Resend confirmation |
| Session expired | Token expired | Re-authenticate |

### Error Display

```typescript
{error && (
  <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
    {error}
  </div>
)}
```

## Security Best Practices

1. **Server-side logout**: Always use POST route handler
2. **HTTPS only**: In production, use secure cookies
3. **Row Level Security**: Enable RLS on all tables
4. **Session refresh**: Middleware handles automatic refresh
5. **Redirect validation**: Only allow same-origin redirects
