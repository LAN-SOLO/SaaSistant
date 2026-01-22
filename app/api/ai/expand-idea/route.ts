import { NextResponse } from "next/server"
import { expandIdea } from "@/lib/ai/expand-idea"

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
