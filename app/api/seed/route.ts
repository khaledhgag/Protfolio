import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

// Seed data for initial setup
const seedData = {
  projects: [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, shopping cart, secure checkout, and order tracking capabilities.",
      longDescription:
        "Built a comprehensive e-commerce solution featuring user authentication, product catalog with advanced filtering, shopping cart functionality, Stripe payment integration, and real-time order tracking.",
      category: "web",
      techStack: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Tailwind CSS"],
      images: ["/images/ecommerce-1.jpg", "/images/ecommerce-2.jpg"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      featured: true,
      published: true,
      order: 1,
    },
  ],

  skills: [
    { name: "HTML5 / CSS3", percentage: 95, category: "frontend", order: 1 },
    { name: "JavaScript", percentage: 90, category: "frontend", order: 2 },
    { name: "TypeScript", percentage: 85, category: "frontend", order: 3 },
    { name: "React.js", percentage: 90, category: "frontend", order: 4 },
    { name: "Next.js", percentage: 85, category: "frontend", order: 5 },
  ],

  about: {
    bio: "Full Stack Developer passionate about building modern web applications.",
    shortBio: "Full Stack Developer",
    yearsLearning: 2,
    projectsCompleted: 10,
    technologiesUsed: 15,
    location: "Cairo, Egypt",
    email: "khaledhgag39@gmail.com",
    phone: "+20",
    profileImage: "",
  },

  settings: {
    siteName: "Khaled Hgag Portfolio",
    siteDescription: "Professional portfolio website",
    siteKeywords: ["Portfolio", "Developer", "Next.js"],
    socialLinks: {
      github: "https://github.com/khaledhgag",
      linkedin: "",
      twitter: "",
      email: "khaledhgag39@gmail.com",
    },
  },
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Seed projects
    const existingProjects = await db.collection("projects").countDocuments();
    if (existingProjects === 0) {
      await db.collection("projects").insertMany(
        seedData.projects.map((p) => ({
          ...p,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
      );
    }

    // Seed skills
    const existingSkills = await db.collection("skills").countDocuments();
    if (existingSkills === 0) {
      await db.collection("skills").insertMany(
        seedData.skills.map((s) => ({
          ...s,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
      );
    }

    // Seed about
    const existingAbout = await db.collection("about").countDocuments();
    if (existingAbout === 0) {
      await db.collection("about").insertOne({
        ...seedData.about,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Seed settings
    const existingSettings = await db.collection("settings").countDocuments();
    if (existingSettings === 0) {
      await db.collection("settings").insertOne({
        ...seedData.settings,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Seed admin user
    const existingAdmin = await db.collection("users").findOne({
      email: "admin@khaled.com",
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("12345678", 10);

      await db.collection("users").insertOne({
        name: "Khaled Admin",
        email: "admin@khaled.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return NextResponse.json({
      message: "Database seeded successfully",
      admin: {
        email: "admin@khaled.com",
        password: "12345678",
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}