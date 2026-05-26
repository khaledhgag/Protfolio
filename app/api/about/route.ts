import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { aboutSchema } from "@/lib/validations";

// GET about info
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const about = await db.collection("about").findOne({});

    return NextResponse.json(about || {});
  } catch (error) {
    console.error("Error fetching about:", error);
    return NextResponse.json(
      { error: "Failed to fetch about info" },
      { status: 500 }
    );
  }
}

// PUT update about info (protected)
export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = aboutSchema.parse(body);

    const client = await clientPromise;
    const db = client.db();

    await db.collection("about").updateOne(
      {},
      {
        $set: {
          ...validated,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating about:", error);
    return NextResponse.json(
      { error: "Failed to update about info" },
      { status: 500 }
    );
  }
}
