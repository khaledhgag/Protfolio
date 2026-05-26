import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { auth } from "@/lib/auth"

export const runtime = "nodejs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file")

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Invalid file" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "portfolio",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        }
      )

      stream.end(buffer)
    })

    return NextResponse.json({
      url: (result as any).secure_url,
      publicId: (result as any).public_id,
    })
  } catch (error) {
    console.error("UPLOAD ERROR:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}