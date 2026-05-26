import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { projectSchema } from "@/lib/validations";
import { auth } from "@/lib/auth";

// GET all projects (public)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const published = searchParams.get("published");

    const client = await clientPromise;
    const db = client.db();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};
    if (featured === "true") query.featured = true;
    if (published !== "false") query.published = true; // Default to published only

    const projects = await db
      .collection("projects")
      .find(query)
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST create new project (protected)
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = projectSchema.parse(body);

    const client = await clientPromise;
    const db = client.db();

    const project = {
      ...validated,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("projects").insertOne(project);

    return NextResponse.json(
      { ...project, _id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
