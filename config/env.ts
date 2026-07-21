import { z } from "zod";

const DEFAULT_SUPABASE_URL = "https://krctmlzaxmqaaqjvcowj.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyY3RtbHpheG1xYWFxanZjb3dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0NDM2MTgsImV4cCI6MjEwMDAxOTYxOH0.X4-3I_Qx0HH2mMdEYx9eD80li9Phwdwt62f6GXk8rWo";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().default(DEFAULT_SUPABASE_URL),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).default(DEFAULT_SUPABASE_ANON_KEY),
});

let envCheck = {
  NEXT_PUBLIC_SUPABASE_URL: DEFAULT_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: DEFAULT_SUPABASE_ANON_KEY,
};

try {
  envCheck = envSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY,
  });
} catch (error) {
  console.warn("⚠️ Environment variables validation warning:", error);
}

export const env = envCheck;

