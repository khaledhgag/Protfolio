import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAbout extends Document {
  bio: string;
  shortBio?: string;
  profileImage?: string;
  resumeUrl?: string;
  yearsLearning: number;
  projectsCompleted: number;
  technologiesUsed: number;
  location?: string;
  email?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
  {
    bio: {
      type: String,
      required: true,
    },
    shortBio: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    resumeUrl: {
      type: String,
    },
    yearsLearning: {
      type: Number,
      default: 0,
    },
    projectsCompleted: {
      type: Number,
      default: 0,
    },
    technologiesUsed: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const About: Model<IAbout> =
  mongoose.models.About || mongoose.model<IAbout>("About", AboutSchema);

export default About;
