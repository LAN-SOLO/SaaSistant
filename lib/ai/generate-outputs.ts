import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface ProjectConfig {
  name: string
  description: string
  expandedDescription?: string
  componentLibrary: string
  applicationPattern: string
  designStyle: string
  framework: string
  database: string
  auth: string
  storage: string
  aiProvider: string
  aiFeatures: string[]
}

export async function generateMvpScope(config: ProjectConfig): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Generate an MVP (Minimum Viable Product) scope document for the following SaaS application:

Project: ${config.name}
Description: ${config.description}
${config.expandedDescription ? `Expanded: ${config.expandedDescription}` : ""}

Tech Stack:
- Framework: ${config.framework}
- UI: ${config.componentLibrary}
- Pattern: ${config.applicationPattern}
- Design: ${config.designStyle}
- Database: ${config.database}
- Auth: ${config.auth}
- Storage: ${config.storage}
${config.aiProvider !== "none" ? `- AI: ${config.aiProvider} (${config.aiFeatures.join(", ")})` : ""}

Create a focused MVP scope that includes:
1. Core features only (what's absolutely necessary)
2. User stories for each feature
3. Database schema (simplified)
4. API endpoints needed
5. Pages/routes required

Keep it minimal and focused on getting to market quickly. Format as markdown.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type === "text") {
    return content.text
  }

  return "# MVP Scope\n\nUnable to generate scope. Please try again."
}

export async function generateMaxScope(config: ProjectConfig): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 3000,
    messages: [
      {
        role: "user",
        content: `Generate a comprehensive MAX scope document for the following SaaS application:

Project: ${config.name}
Description: ${config.description}
${config.expandedDescription ? `Expanded: ${config.expandedDescription}` : ""}

Tech Stack:
- Framework: ${config.framework}
- UI: ${config.componentLibrary}
- Pattern: ${config.applicationPattern}
- Design: ${config.designStyle}
- Database: ${config.database}
- Auth: ${config.auth}
- Storage: ${config.storage}
${config.aiProvider !== "none" ? `- AI: ${config.aiProvider} (${config.aiFeatures.join(", ")})` : ""}

Create a full-featured scope that includes:
1. All features (comprehensive feature set)
2. Advanced user stories
3. Complete database schema with relationships
4. Full API specification
5. All pages/routes
6. Admin dashboard features
7. Analytics and reporting
8. Integration points
9. Security considerations
10. Performance optimizations

Format as detailed markdown with clear sections.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type === "text") {
    return content.text
  }

  return "# MAX Scope\n\nUnable to generate scope. Please try again."
}

export async function generateInitPrompt(config: ProjectConfig): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Generate a Claude Code initialization prompt for the following SaaS application. This prompt will be used to initialize a new project with Claude Code.

Project: ${config.name}
Description: ${config.description}
${config.expandedDescription ? `Expanded: ${config.expandedDescription}` : ""}

Tech Stack:
- Framework: ${config.framework}
- UI: ${config.componentLibrary}
- Pattern: ${config.applicationPattern}
- Design: ${config.designStyle}
- Database: ${config.database}
- Auth: ${config.auth}
- Storage: ${config.storage}
${config.aiProvider !== "none" ? `- AI: ${config.aiProvider} (${config.aiFeatures.join(", ")})` : ""}

Create a detailed initialization prompt that:
1. Clearly describes the project
2. Lists all technologies to use
3. Defines the folder structure
4. Specifies coding conventions
5. Outlines the initial setup steps
6. Includes important configuration details
7. Mentions key dependencies to install

Format as a clear, actionable prompt that Claude Code can follow to set up the project. Start with "Create a new ${config.framework} application called ${config.name}..."`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type === "text") {
    return content.text
  }

  return `# ${config.name} Initialization Prompt\n\nUnable to generate prompt. Please try again.`
}
