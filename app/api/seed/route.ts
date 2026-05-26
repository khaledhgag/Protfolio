import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// Seed data for initial setup
const seedData = {
  projects: [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, shopping cart, secure checkout, and order tracking capabilities.",
      longDescription:
        "Built a comprehensive e-commerce solution featuring user authentication, product catalog with advanced filtering, shopping cart functionality, Stripe payment integration, and real-time order tracking. Implemented admin dashboard for inventory management and sales analytics.",
      category: "web",
      techStack: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Tailwind CSS"],
      images: ["/images/ecommerce-1.jpg", "/images/ecommerce-2.jpg"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      featured: true,
      published: true,
      order: 1,
    },
    {
      title: "Pharmacy Management System",
      description:
        "Complete pharmacy management solution with inventory tracking, prescription management, and POS integration.",
      longDescription:
        "Developed a comprehensive pharmacy management system that handles inventory management, prescription tracking, customer records, billing, and reporting. Features include drug interaction checking, expiry date alerts, and integration with insurance providers.",
      category: "web",
      techStack: ["React", "Node.js", "PostgreSQL", "Express", "Chart.js"],
      images: ["/images/pharmacy-1.jpg", "/images/pharmacy-2.jpg"],
      githubUrl: "https://github.com",
      liveUrl: "",
      featured: true,
      published: true,
      order: 2,
    },
    {
      title: "Shipping & Logistics System",
      description:
        "Real-time shipment tracking and logistics management platform for businesses.",
      longDescription:
        "Created a logistics management platform featuring real-time GPS tracking, route optimization, delivery scheduling, and automated notifications. Includes driver mobile app, customer tracking portal, and admin dashboard with analytics.",
      category: "web",
      techStack: ["Next.js", "Node.js", "MongoDB", "Socket.io", "Google Maps API"],
      images: ["/images/logistics-1.jpg", "/images/logistics-2.jpg"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      featured: false,
      published: true,
      order: 3,
    },
    {
      title: "Law Firm Management",
      description:
        "Case management and document handling system for legal professionals.",
      longDescription:
        "Built a comprehensive law firm management system with case tracking, document management, client portal, billing, and calendar integration. Features include secure document storage, deadline reminders, and time tracking for billing.",
      category: "web",
      techStack: ["React", "Express", "MySQL", "AWS S3", "DocuSign API"],
      images: ["/images/lawfirm-1.jpg", "/images/lawfirm-2.jpg"],
      githubUrl: "https://github.com",
      liveUrl: "",
      featured: false,
      published: true,
      order: 4,
    },
  ],
  skills: [
    { name: "HTML5 / CSS3", percentage: 95, category: "frontend", order: 1 },
    { name: "JavaScript (ES6+)", percentage: 90, category: "frontend", order: 2 },
    { name: "TypeScript", percentage: 85, category: "frontend", order: 3 },
    { name: "React.js", percentage: 90, category: "frontend", order: 4 },
    { name: "Next.js", percentage: 85, category: "frontend", order: 5 },
    { name: "Tailwind CSS", percentage: 90, category: "frontend", order: 6 },
    { name: "Node.js", percentage: 85, category: "backend", order: 1 },
    { name: "Express.js", percentage: 85, category: "backend", order: 2 },
    { name: "NestJS", percentage: 75, category: "backend", order: 3 },
    { name: "Python", percentage: 70, category: "backend", order: 4 },
    { name: "MongoDB", percentage: 85, category: "database", order: 1 },
    { name: "PostgreSQL", percentage: 80, category: "database", order: 2 },
    { name: "MySQL", percentage: 80, category: "database", order: 3 },
    { name: "Redis", percentage: 70, category: "database", order: 4 },
    { name: "Git / GitHub", percentage: 90, category: "devops", order: 1 },
    { name: "Docker", percentage: 75, category: "devops", order: 2 },
    { name: "AWS Basics", percentage: 65, category: "devops", order: 3 },
    { name: "Vercel / Netlify", percentage: 85, category: "devops", order: 4 },
  ],
  about: {
    bio: `A passionate Full Stack Developer with a strong foundation in modern web technologies. My journey in software development started with curiosity and has evolved into a deep commitment to creating impactful digital solutions.

I specialize in building responsive, user-friendly applications using React, Next.js, Node.js, and various database technologies. I'm constantly learning and exploring new technologies to stay at the forefront of web development.

When I'm not coding, you can find me exploring new tech trends, contributing to open-source projects, or working on personal projects that challenge my skills.`,
    shortBio:
      "Full Stack Developer passionate about creating exceptional digital experiences",
    yearsLearning: 2,
    projectsCompleted: 10,
    technologiesUsed: 15,
    location: "Cairo, Egypt",
    email: "khaledabuelenein@example.com",
    phone: "+20 123 456 7890",
    profileImage: "",
  },
  settings: {
    siteName: "Khaled Abuelenein - Full Stack Developer",
    siteDescription:
      "Professional portfolio of Khaled Abuelenein - Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    siteKeywords: [
      "Full Stack Developer",
      "React Developer",
      "Next.js",
      "Node.js",
      "Portfolio",
    ],
    socialLinks: {
      github: "https://github.com/khaledabuelenein",
      linkedin: "https://linkedin.com/in/khaledabuelenein",
      twitter: "https://twitter.com/khaledabuelenein",
      email: "khaledabuelenein@example.com",
    },
  },
};

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Check if already seeded
    const existingProjects = await db.collection("projects").countDocuments();
    if (existingProjects > 0) {
      return NextResponse.json(
        { message: "Database already seeded" },
        { status: 200 }
      );
    }

    // Seed projects
    await db.collection("projects").insertMany(
      seedData.projects.map((p) => ({
        ...p,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    // Seed skills
    await db.collection("skills").insertMany(
      seedData.skills.map((s) => ({
        ...s,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    // Seed about
    await db.collection("about").insertOne({
      ...seedData.about,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Seed settings
    await db.collection("settings").insertOne({
      ...seedData.settings,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { message: "Database seeded successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
