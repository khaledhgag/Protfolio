import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { contactSchema } from "@/lib/validations";

// GET all messages (for admin)
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const messages = await db
      .collection("messages")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST create new message (contact form)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

    const client = await clientPromise;
    const db = client.db();

    const message = {
      ...validated,
      read: false,
      createdAt: new Date(),
    };

    const result = await db.collection("messages").insertOne(message);

    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
