import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { settingsSchema } from "@/lib/validations";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    let settings = await db.collection("settings").findOne({});

    if (!settings) {
      const defaultSettings = {
        siteName: "Khaled Abuelenein",
        siteDescription: "Full Stack Developer Portfolio",
        socialLinks: {
          github: "https://github.com",
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
        },
        accentColor: "#3b82f6",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await db.collection("settings").insertOne(defaultSettings);
      settings = defaultSettings;
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = settingsSchema.parse(body);

    const client = await clientPromise;
    const db = client.db();

    await db.collection("settings").updateOne(
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
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
