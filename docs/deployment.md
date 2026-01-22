# Deployment

Guide for deploying SaaSistent to production.

## Deployment Options

| Platform | Difficulty | Best For |
|----------|------------|----------|
| Vercel | Easy | Next.js native, recommended |
| Netlify | Easy | Alternative to Vercel |
| Railway | Medium | Full-stack with database |
| AWS Amplify | Medium | AWS ecosystem |
| Docker | Advanced | Self-hosted, custom infra |

## Vercel Deployment (Recommended)

### 1. Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the `saasistantdev` directory as root

### 2. Configure Environment Variables

Add these in Vercel's Environment Variables section:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ANTHROPIC_API_KEY=your-anthropic-key
```

### 3. Configure Build Settings

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

### 4. Deploy

Click "Deploy" and Vercel will:
1. Install dependencies
2. Run the build
3. Deploy to edge network
4. Provide a production URL

### 5. Configure Domain

1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Enable HTTPS (automatic)

### 6. Update Supabase URLs

In Supabase Dashboard:
1. Go to Authentication > URL Configuration
2. Add your production URL to:
   - Site URL: `https://yourdomain.com`
   - Redirect URLs: `https://yourdomain.com/auth/callback`

---

## Environment Variables

### Required Variables

| Variable | Description | Where Used |
|----------|-------------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Client & Server |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Client & Server |
| `ANTHROPIC_API_KEY` | Anthropic API key | Server only |

### Security Notes

- `NEXT_PUBLIC_*` variables are exposed to the browser
- Non-prefixed variables are server-only
- Never expose `ANTHROPIC_API_KEY` to the client
- Use Supabase Row Level Security for data protection

---

## Supabase Production Setup

### 1. Create Production Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project for production
3. Choose a region close to your users

### 2. Run Migrations

In Supabase SQL Editor, run the schema from [Getting Started](./getting-started.md):

```sql
-- profiles table
-- projects table
-- RLS policies
-- trigger for new users
```

### 3. Configure Auth

1. **Email Templates**: Customize confirmation and reset emails
2. **SMTP Settings**: Use custom SMTP for branded emails
3. **Auth Providers**: Add OAuth providers if needed
4. **URL Configuration**: Set production URLs

### 4. Enable Security Features

```sql
-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Verify policies exist
SELECT * FROM pg_policies WHERE tablename IN ('profiles', 'projects');
```

---

## Performance Optimization

### Next.js Optimizations

```typescript
// next.config.ts
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Image optimization
  images: {
    domains: ['your-supabase-url.supabase.co'],
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ]
  },
}
```

### Caching Strategy

1. **Static Pages**: Automatically cached by Vercel
2. **API Routes**: Add cache headers for appropriate endpoints
3. **Supabase**: Use connection pooling for database

### Bundle Size

Monitor and optimize:

```bash
npm run build
# Check .next/analyze for bundle analysis
```

---

## Monitoring

### Vercel Analytics

1. Enable in Project Settings > Analytics
2. Add to layout:

```tsx
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Error Tracking

Consider adding Sentry:

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Supabase Monitoring

1. Enable in Project Settings > Database > Logs
2. Monitor queries in SQL Editor > Query Performance

---

## CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: saasistantdev/package-lock.json

      - name: Install dependencies
        run: npm ci
        working-directory: saasistantdev

      - name: Run linter
        run: npm run lint
        working-directory: saasistantdev

      - name: Build
        run: npm run build
        working-directory: saasistantdev
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: saasistantdev
```

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Build fails | Missing env vars | Add all required variables |
| Auth not working | Wrong redirect URLs | Update Supabase URL config |
| 500 errors | API key issues | Check server-side env vars |
| Slow performance | No caching | Enable Vercel caching |

### Debug Mode

Enable debug logging:

```typescript
// In development
console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)

// Check if env var exists (don't log the actual value)
console.log("API Key exists:", !!process.env.ANTHROPIC_API_KEY)
```

### Health Check Endpoint

Add a health check route:

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    env: {
      supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      anthropic: !!process.env.ANTHROPIC_API_KEY,
    },
  })
}
```

---

## Scaling Considerations

### Database

- Enable connection pooling in Supabase
- Add indexes for frequently queried columns
- Consider read replicas for high traffic

### API Rate Limiting

Implement rate limiting for AI endpoints:

```typescript
// Use Vercel KV or Upstash Redis for distributed rate limiting
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
})
```

### CDN & Edge

- Vercel Edge Network handles this automatically
- For custom hosting, use Cloudflare or similar CDN
