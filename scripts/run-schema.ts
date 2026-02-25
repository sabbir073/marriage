/**
 * Run schema.sql against Supabase via direct PostgreSQL connection.
 *
 * Requires DATABASE_URL in .env.local:
 *   Get from: Supabase Dashboard → Settings → Database → Connection string → URI (Session mode, port 5432)
 *
 * If DATABASE_URL is not set, it will try Supabase's pg endpoint with service_role key.
 *
 * Usage: pnpm tsx scripts/run-schema.ts
 */

import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const DATABASE_URL = process.env.DATABASE_URL;

const schemaPath = path.resolve(__dirname, "../src/lib/supabase/schema.sql");
const sql = fs.readFileSync(schemaPath, "utf-8");

async function runViaPg() {
  if (!DATABASE_URL) {
    console.log("DATABASE_URL not set, skipping direct pg connection.\n");
    return false;
  }

  console.log("🔌 Connecting via PostgreSQL...\n");

  const { Client } = await import("pg");
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("✅ Connected to PostgreSQL\n");

    console.log("📋 Executing schema.sql...\n");
    await client.query(sql);

    console.log("✅ Schema executed successfully!\n");

    // Verify tables
    const { rows } = await client.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log("📊 Tables in public schema:");
    for (const row of rows) {
      console.log(`  ✅ ${row.table_name}`);
    }

    await client.end();
    return true;
  } catch (err: any) {
    console.error("❌ PostgreSQL error:", err.message);
    await client.end().catch(() => {});
    return false;
  }
}

async function runViaSupabaseEndpoint() {
  console.log("🔌 Trying Supabase SQL endpoint...\n");

  // Try multiple known Supabase SQL endpoints
  const endpoints = [
    `${SUPABASE_URL}/pg/sql`,
    `${SUPABASE_URL}/rest/v1/rpc/exec_sql`,
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ query: sql }),
      });

      if (response.ok) {
        console.log(`✅ Schema executed via ${endpoint}`);
        return true;
      }
    } catch {}
  }

  return false;
}

async function main() {
  console.log("🗄️  Running schema.sql against Supabase...\n");

  // Try direct PostgreSQL connection first
  if (await runViaPg()) return;

  // Try Supabase endpoints
  if (await runViaSupabaseEndpoint()) return;

  // Fallback: instructions
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Could not execute SQL automatically. Two options:\n");
  console.log("Option 1: Add DATABASE_URL to .env.local");
  console.log("  1. Go to: Supabase Dashboard → Settings → Database");
  console.log("  2. Copy the 'URI' connection string (Session mode, port 5432)");
  console.log("  3. Add to .env.local: DATABASE_URL=postgresql://postgres.yxbbwpylpwvbaiwzaeua:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres");
  console.log("  4. Re-run: pnpm tsx scripts/run-schema.ts\n");
  console.log("Option 2: Run manually in SQL Editor");
  console.log("  1. Go to: https://supabase.com/dashboard/project/yxbbwpylpwvbaiwzaeua/sql/new");
  console.log("  2. Paste contents of: src/lib/supabase/schema.sql");
  console.log("  3. Click 'Run'");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
