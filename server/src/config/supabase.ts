import { createClient } from "@supabase/supabase-js";
import { logger } from "../utils/logger";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://placeholder-url.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-role-key";

if (
  SUPABASE_URL === "https://placeholder-url.supabase.co" ||
  SUPABASE_SERVICE_ROLE_KEY === "placeholder-role-key"
) {
  logger.warn("⚠️ Supabase Backend Admin Client is running with placeholder credentials.");
}

export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
