import mongoose, { Schema, Document } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  email: string;
  company?: string;
  services: string[];
  budget?: string;
  description: string;
  status: "New" | "Contacted" | "Proposal_Sent" | "Converted" | "Rejected";
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    company: { type: String, trim: true },
    services: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "At least one service type must be specified.",
      },
    },
    budget: { type: String },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["New", "Contacted", "Proposal_Sent", "Converted", "Rejected"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

export const InquiryModel = mongoose.model<IInquiry>("Inquiry", InquirySchema);
