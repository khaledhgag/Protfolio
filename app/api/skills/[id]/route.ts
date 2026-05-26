import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Skill from "@/models/Skill"
import { auth } from "@/lib/auth"

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await dbConnect()
    await Skill.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting skill:", error)
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    await dbConnect()
    const skill = await Skill.findByIdAndUpdate(id, body, { new: true })
    return NextResponse.json(skill)
  } catch (error) {
    console.error("Error updating skill:", error)
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 })
  }
}
