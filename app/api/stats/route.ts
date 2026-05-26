import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Project from "@/models/Project"
import Skill from "@/models/Skill"
import Message from "@/models/Message"

export async function GET() {
  try {
    await dbConnect()
    
    const [projectCount, skillCount, messageCount, unreadCount] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ read: false }),
    ])
    
    const recentMessages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email subject createdAt read")
    
    const featuredProjects = await Project.find({ featured: true })
      .sort({ order: 1 })
      .limit(3)
      .select("title category thumbnail")
    
    return NextResponse.json({
      stats: {
        projects: projectCount,
        skills: skillCount,
        messages: messageCount,
        unread: unreadCount,
      },
      recentMessages,
      featuredProjects,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
