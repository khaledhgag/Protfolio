import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  longDescription: z.string().optional(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  techStack: z.array(z.string()).min(1, "At least one technology is required"),
  category: z.enum(["web", "mobile", "desktop", "api", "other"]),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  percentage: z.number().min(0).max(100),
  category: z.enum(["frontend", "backend", "database", "devops", "data", "other"]),
  icon: z.string().optional(),
});

export const aboutSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  shortBio: z.string().optional(),
  profileImage: z.string().optional(),
  resumeUrl: z.string().optional(),
  yearsLearning: z.number().min(0),
  projectsCompleted: z.number().min(0),
  technologiesUsed: z.number().min(0),
  location: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const settingsSchema = z.object({
  siteName: z.string().min(1),
  siteDescription: z.string().optional(),
  siteKeywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),
  accentColor: z.string().optional(),
  socialLinks: z.object({
    github: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    email: z.string().optional(),
  }).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
export type AboutInput = z.infer<typeof aboutSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
