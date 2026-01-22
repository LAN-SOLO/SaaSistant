import { NextResponse } from "next/server"
import {
  generateMvpScope,
  generateMaxScope,
  generateInitPrompt,
} from "@/lib/ai/generate-outputs"

export async function POST(request: Request) {
  try {
    const config = await request.json()

    if (!config.name || !config.description) {
      return NextResponse.json(
        { error: "Project name and description are required" },
        { status: 400 }
      )
    }

    // Generate all outputs in parallel
    const [mvpScope, maxScope, initPrompt] = await Promise.all([
      generateMvpScope(config),
      generateMaxScope(config),
      generateInitPrompt(config),
    ])

    return NextResponse.json({
      mvpScope,
      maxScope,
      initPrompt,
    })
  } catch (error) {
    console.error("Error generating outputs:", error)
    return NextResponse.json(
      { error: "Failed to generate outputs" },
      { status: 500 }
    )
  }
}
