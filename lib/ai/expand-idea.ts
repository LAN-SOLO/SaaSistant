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

Keep the response concise but insightful. Format as clear paragraphs, not bullet points.

Product idea: ${description}`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type === "text") {
    return content.text
  }

  return "Unable to expand idea. Please try again."
}
