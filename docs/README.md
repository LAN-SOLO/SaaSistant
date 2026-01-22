# SaaSistent Documentation

SaaSistent is an AI-powered SaaS application builder that helps you configure and generate production-ready project specifications.

## Table of Contents

1. [Getting Started](./getting-started.md)
2. [Architecture](./architecture.md)
3. [Authentication](./authentication.md)
4. [Project Wizard](./project-wizard.md)
5. [AI Integration](./ai-integration.md)
6. [API Reference](./api-reference.md)
7. [Components](./components.md)
8. [Deployment](./deployment.md)

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI |
| Authentication | Supabase Auth |
| Database | Supabase (PostgreSQL) |
| AI | Anthropic Claude API |

## Project Structure

```
saasistantdev/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (grouped route)
│   ├── api/               # API routes
│   ├── auth/              # Auth callbacks
│   ├── dashboard/         # Protected dashboard
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── auth/              # Authentication forms
│   ├── dashboard/         # Dashboard components
│   ├── landing/           # Landing page sections
│   ├── project-wizard/    # Wizard steps
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── ai/                # AI integration
│   ├── supabase/          # Supabase clients
│   └── utils.ts           # Utilities
├── docs/                  # Documentation
└── middleware.ts          # Route protection
```

## Features

- **Landing Page**: Marketing site with features, pricing, and CTAs
- **Authentication**: Email/password auth with Supabase
- **Dashboard**: Project management interface
- **Project Wizard**: 8-step AI-powered configuration
- **AI Generation**: MVP scope, MAX scope, and init prompts

## License

MIT
