import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { auth } from "@/lib/auth"

export const runtime = "nodejs"

// Configure Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session) {
      console.warn("Upload: Unauthorized access attempt")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Validate Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      console.error("Upload: Cloudinary not configured - missing CLOUDINARY_CLOUD_NAME")
      return NextResponse.json(
        { error: "Upload service not configured" },
        { status: 500 }
      )
    }

    // Parse form data
    let formData
    try {
      formData = await request.formData()
    } catch (e) {
      console.error("Upload: Failed to parse form data:", e)
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      )
    }

    const file = formData.get("file")
    const folder = String(formData.get("folder") || "portfolio")

    // Validate file
    if (!file) {
      console.warn("Upload: No file provided")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!(file instanceof File)) {
      console.warn("Upload: Invalid file type:", typeof file)
      return NextResponse.json({ error: "Invalid file" }, { status: 400 })
    }

    if (file.size === 0) {
      console.warn("Upload: Empty file provided")
      return NextResponse.json({ error: "File is empty" }, { status: 400 })
    }

    // Log upload details
    console.log(`Upload: Starting upload for file: ${file.name} (${file.size} bytes) to folder: ${folder}`)

    // Convert file to buffer
    let buffer
    try {
      const bytes = await file.arrayBuffer()
      buffer = Buffer.from(bytes)
    } catch (e) {
      console.error("Upload: Failed to process file:", e)
      return NextResponse.json(
        { error: "Failed to process file" },
        { status: 400 }
      )
    }

    // Upload to Cloudinary using promise-based approach
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: "auto",
          timeout: 60000,
          max_file_size: 104857600, // 100MB
        },
        (error, result) => {
          if (error) {
            console.error("Upload: Cloudinary upload error:", error)
            return reject(new Error(`Cloudinary error: ${error.message || JSON.stringify(error)}`))
          }
          console.log(`Upload: Success - ${(result as any).public_id}`)
          resolve(result)
        }
      )

      // Handle stream errors
      stream.on("error", (error) => {
        console.error("Upload: Stream error:", error)
        reject(new Error(`Stream error: ${error.message}`))
      })

      // Write buffer to stream
      try {
        stream.end(buffer)
      } catch (e) {
        console.error("Upload: Failed to write to stream:", e)
        reject(new Error(`Failed to write to stream: ${e}`))
      }
    })

    return NextResponse.json({
      url: (result as any).secure_url,
      publicId: (result as any).public_id,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("Upload: Final error:", errorMessage)
    return NextResponse.json(
      { error: errorMessage || "Upload failed" },
      { status: 500 }
    )
  }
}