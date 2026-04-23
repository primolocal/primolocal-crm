import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient<any, "public", any> | null = null;

export function getSupabase(): SupabaseClient<any, "public", any> {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) throw new Error("Supabase URL and anon key are required.");
  client = createClient(url, key);
  return client;
}
