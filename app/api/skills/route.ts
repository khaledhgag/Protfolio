import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";

// GET skills
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const skills = await db
      .collection("skills")
      .find()
      .sort({ category: 1, order: 1 })
      .toArray();

    return NextResponse.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// PUT update all skills (protected)
export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { skills } = body;

    if (!Array.isArray(skills)) {
      return NextResponse.json(
        { error: "Skills must be an array" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Replace all skills
    await db.collection("skills").deleteMany({});
    
    if (skills.length > 0) {
      const skillsWithTimestamp = skills.map((skill, index) => ({
        ...skill,
        order: index,
        updatedAt: new Date(),
      }));
      await db.collection("skills").insertMany(skillsWithTimestamp);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating skills:", error);
    return NextResponse.json(
      { error: "Failed to update skills" },
      { status: 500 }
    );
  }
}
