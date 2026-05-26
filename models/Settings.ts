import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettings extends Document {
  siteName: string;
  siteDescription?: string;
  siteKeywords?: string[];
  ogImage?: string;
  accentColor?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    siteName: {
      type: String,
      required: true,
      default: "Khaled Abuelenein - Full Stack Developer",
    },
    siteDescription: {
      type: String,
    },
    siteKeywords: [
      {
        type: String,
      },
    ],
    ogImage: {
      type: String,
    },
    accentColor: {
      type: String,
      default: "#6366f1",
    },
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      email: String,
    },
  },
  {
    timestamps: true,
  }
);

const Settings: Model<ISettings> =
  mongoose.models.Settings ||
  mongoose.model<ISettings>("Settings", SettingsSchema);

export default Settings;
