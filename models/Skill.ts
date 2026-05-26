import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISkill extends Document {
  name: string;
  percentage: number;
  category: "frontend" | "backend" | "database" | "devops" | "data" | "other";
  icon?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    category: {
      type: String,
      enum: ["frontend", "backend", "database", "devops", "data", "other"],
      required: true,
    },
    icon: {
      type: String,
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

const Skill: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);

export default Skill;
