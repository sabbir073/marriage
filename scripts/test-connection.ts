/**
 * Test Supabase connection with all env variables.
 * Usage: pnpm tsx scripts/test-connection.ts
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("🔍 Testing Supabase .env.local configuration...\n");

// 1. Check env vars are present
let allPresent = true;

if (!SUPABASE_URL) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL is missing");
  allPresent = false;
} else {
  console.log(`✅ NEXT_PUBLIC_SUPABASE_URL = ${SUPABASE_URL}`);
}

if (!ANON_KEY) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing");
  allPresent = false;
} else {
  console.log(`✅ NEXT_PUBLIC_SUPABASE_ANON_KEY = ${ANON_KEY.slice(0, 20)}...`);
}

if (!SERVICE_ROLE_KEY) {
  console.error("❌ SUPABASE_SERVICE_ROLE_KEY is missing");
  allPresent = false;
} else {
  console.log(`✅ SUPABASE_SERVICE_ROLE_KEY = ${SERVICE_ROLE_KEY.slice(0, 20)}...`);
}

if (!allPresent) {
  console.error("\n❌ Some env variables are missing. Fill in .env.local and try again.");
  process.exit(1);
}

async function testConnection() {
  console.log("\n─── Test 1: Anon key connection ───");
  try {
    const anonClient = createClient(SUPABASE_URL!, ANON_KEY!);
    // Try a simple health check — query auth settings
    const { data, error } = await anonClient.auth.getSession();
    if (error) {
      console.error("❌ Anon client auth check failed:", error.message);
    } else {
      console.log("✅ Anon client connected successfully (auth.getSession works)");
    }
  } catch (err: any) {
    console.error("❌ Anon client connection failed:", err.message);
  }

  console.log("\n─── Test 2: Service role key connection ───");
  try {
    const adminClient = createClient(SUPABASE_URL!, SERVICE_ROLE_KEY!, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Service role should be able to list users
    const { data, error } = await adminClient.auth.admin.listUsers({ page: 1, perPage: 1 });
    if (error) {
      console.error("❌ Service role admin API failed:", error.message);
      console.error("   This likely means SUPABASE_SERVICE_ROLE_KEY is wrong.");
      console.error("   The service_role key is different from the anon key!");
      console.error("   Find it at: Supabase Dashboard → Settings → API → service_role (secret)");
    } else {
      console.log(`✅ Service role client connected (found ${data.users.length} user(s))`);
    }
  } catch (err: any) {
    console.error("❌ Service role connection failed:", err.message);
  }

  console.log("\n─── Test 3: Database query (public tables) ───");
  try {
    const anonClient = createClient(SUPABASE_URL!, ANON_KEY!);
    // Try to query the profiles table — will fail if schema.sql hasn't been run yet
    const { data, error } = await anonClient.from("profiles").select("id").limit(1);
    if (error) {
      if (error.message.includes("does not exist") || error.code === "42P01") {
        console.log("⚠️  'profiles' table does not exist yet — run schema.sql in Supabase SQL Editor first");
      } else {
        console.error("❌ Database query failed:", error.message);
      }
    } else {
      console.log(`✅ Database query works — profiles table exists (${data.length} row(s) found)`);
    }
  } catch (err: any) {
    console.error("❌ Database query failed:", err.message);
  }

  console.log("\n─── Test 4: Check if schema tables exist ───");
  try {
    const adminClient = createClient(SUPABASE_URL!, SERVICE_ROLE_KEY!, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const tables = ["profiles", "jurisdictions", "kazi_profiles"];
    for (const table of tables) {
      const { error } = await adminClient.from(table).select("id").limit(1);
      if (error) {
        console.log(`  ⚠️  ${table} — not found (run schema.sql first)`);
      } else {
        console.log(`  ✅ ${table} — exists`);
      }
    }
  } catch (err: any) {
    console.error("❌ Table check failed:", err.message);
  }

  console.log("\n───────────────────────────────────────────");
  console.log("Done! If all tests pass, your .env.local is correctly configured.");
}

testConnection().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
