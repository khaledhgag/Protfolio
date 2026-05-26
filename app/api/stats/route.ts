import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const [projectCount, skillCount, messageCount, unreadCount] =
      await Promise.all([
        db.collection("projects").countDocuments(),
        db.collection("skills").countDocuments(),
        db.collection("messages").countDocuments(),
        db.collection("messages").countDocuments({ read: false }),
      ]);

    const recentMessages = await db
      .collection("messages")
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .project({ name: 1, email: 1, subject: 1, createdAt: 1, read: 1 })
      .toArray();

    const featuredProjects = await db
      .collection("projects")
      .find({ featured: true })
      .sort({ order: 1 })
      .limit(3)
      .project({ title: 1, category: 1, images: 1 })
      .toArray();

    return NextResponse.json({
      stats: {
        projects: projectCount,
        skills: skillCount,
        messages: messageCount,
        unread: unreadCount,
      },
      recentMessages,
      featuredProjects,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
