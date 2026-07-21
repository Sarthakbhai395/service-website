import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  content: string; // Dynamic markdown layout representation
  category: string;
  tags: string[];
  clientName?: string;
  thumbnailUrl: string;
  mediaUrls: string[];
  projectUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: { type: String, required: true, trim: true, index: true },
    tags: { type: [String], default: [] },
    clientName: { type: String, trim: true },
    thumbnailUrl: { type: String, required: true },
    mediaUrls: { type: [String], default: [] },
    projectUrl: { type: String, trim: true },
    featured: { type: Boolean, default: false, index: true },
  },
  {
    timestamps: true,
  }
);

export const ProjectModel = mongoose.model<IProject>("Project", ProjectSchema);
