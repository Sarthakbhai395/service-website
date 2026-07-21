import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  uid: string; // Supabase authentication UUID
  email: string;
  role: "Client" | "Editor" | "Admin" | "SuperAdmin";
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    uid: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    role: {
      type: String,
      enum: ["Client", "Editor", "Admin", "SuperAdmin"],
      default: "Client",
    },
    firstName: { type: String },
    lastName: { type: String },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
