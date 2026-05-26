import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Settings from "@/models/Settings"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    await dbConnect()
    let settings = await Settings.findOne()
    
    if (!settings) {
      settings = await Settings.create({
        siteName: "Khaled Abuelenein",
        siteDescription: "Full Stack Developer Portfolio",
        socialLinks: {
          github: "https://github.com",
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
        },
        contactEmail: "contact@example.com",
        maintenanceMode: false,
      })
    }
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    await dbConnect()
    
    let settings = await Settings.findOne()
    if (settings) {
      settings = await Settings.findByIdAndUpdate(settings._id, body, { new: true })
    } else {
      settings = await Settings.create(body)
    }
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
