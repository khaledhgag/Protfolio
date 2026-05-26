import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  longDescription?: string;
  images: string[];
  techStack: string[];
  category: "web" | "mobile" | "desktop" | "api" | "other";
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    techStack: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      enum: ["web", "mobile", "desktop", "api", "other"],
      default: "web",
    },
    githubUrl: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
