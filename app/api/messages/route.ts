import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Message from "@/models/Message"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const messages = await Message.find().sort({ createdAt: -1 })
    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Message ID required" }, { status: 400 })
    }

    await dbConnect()
    await Message.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const body = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Message ID required" }, { status: 400 })
    }

    await dbConnect()
    const message = await Message.findByIdAndUpdate(id, body, { new: true })
    return NextResponse.json(message)
  } catch (error) {
    console.error("Error updating message:", error)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}
