/**
 * Seed script for demo users and jurisdictions.
 *
 * Prerequisites:
 *   1. Run schema.sql in Supabase SQL Editor first
 *   2. Fill in .env.local with your Supabase URL, anon key, and service_role key
 *
 * Usage:
 *   pnpm seed
 *
 * This creates:
 *   - 4 demo users (citizen, kazi, district registrar, admin) with password "password123"
 *   - 8 divisions and 64 districts as jurisdictions
 *   - 1 kazi profile linked to the demo kazi user
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

// Service role client bypasses RLS
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ─── Demo Users ───────────────────────────────────────────────────────────────

const DEMO_USERS = [
  {
    email: "citizen@demo.com",
    password: "password123",
    metadata: {
      full_name_bn: "মোঃ আব্দুল করিম",
      full_name_en: "Md. Abdul Karim",
      nid_number: "1234567890",
      mobile: "01712345678",
      role: "CITIZEN",
    },
  },
  {
    email: "kazi@demo.com",
    password: "password123",
    metadata: {
      full_name_bn: "মাওলানা আব্দুর রহমান",
      full_name_en: "Mawlana Abdur Rahman",
      nid_number: "9876543210",
      mobile: "01812345678",
      role: "KAZI",
    },
  },
  {
    email: "district@demo.com",
    password: "password123",
    metadata: {
      full_name_bn: "জনাব মোঃ ফারুক আহমেদ",
      full_name_en: "Mr. Md. Faruk Ahmed",
      nid_number: "1122334455",
      mobile: "01912345678",
      role: "DISTRICT_REGISTRAR",
    },
  },
  {
    email: "admin@demo.com",
    password: "password123",
    metadata: {
      full_name_bn: "জনাব রফিকুল ইসলাম",
      full_name_en: "Mr. Rafiqul Islam",
      nid_number: "5566778899",
      mobile: "01612345678",
      role: "SUPER_ADMIN",
    },
  },
];

// ─── Jurisdictions (8 Divisions + 64 Districts) ──────────────────────────────

const DIVISIONS: { name_bn: string; name_en: string; code: string; districts: { name_bn: string; name_en: string; code: string }[] }[] = [
  {
    name_bn: "ঢাকা",
    name_en: "Dhaka",
    code: "DIV-10",
    districts: [
      { name_bn: "ঢাকা", name_en: "Dhaka", code: "DIS-1001" },
      { name_bn: "গাজীপুর", name_en: "Gazipur", code: "DIS-1002" },
      { name_bn: "নারায়ণগঞ্জ", name_en: "Narayanganj", code: "DIS-1003" },
      { name_bn: "টাঙ্গাইল", name_en: "Tangail", code: "DIS-1004" },
      { name_bn: "কিশোরগঞ্জ", name_en: "Kishoreganj", code: "DIS-1005" },
      { name_bn: "মানিকগঞ্জ", name_en: "Manikganj", code: "DIS-1006" },
      { name_bn: "মুন্সীগঞ্জ", name_en: "Munshiganj", code: "DIS-1007" },
      { name_bn: "নরসিংদী", name_en: "Narsingdi", code: "DIS-1008" },
    ],
  },
  {
    name_bn: "চট্টগ্রাম",
    name_en: "Chattogram",
    code: "DIV-20",
    districts: [
      { name_bn: "চট্টগ্রাম", name_en: "Chattogram", code: "DIS-2001" },
      { name_bn: "কক্সবাজার", name_en: "Cox's Bazar", code: "DIS-2002" },
      { name_bn: "কুমিল্লা", name_en: "Cumilla", code: "DIS-2003" },
      { name_bn: "ফেনী", name_en: "Feni", code: "DIS-2004" },
      { name_bn: "নোয়াখালী", name_en: "Noakhali", code: "DIS-2005" },
      { name_bn: "লক্ষ্মীপুর", name_en: "Lakshmipur", code: "DIS-2006" },
      { name_bn: "চাঁদপুর", name_en: "Chandpur", code: "DIS-2007" },
      { name_bn: "ব্রাহ্মণবাড়িয়া", name_en: "Brahmanbaria", code: "DIS-2008" },
    ],
  },
  {
    name_bn: "রাজশাহী",
    name_en: "Rajshahi",
    code: "DIV-30",
    districts: [
      { name_bn: "রাজশাহী", name_en: "Rajshahi", code: "DIS-3001" },
      { name_bn: "নাটোর", name_en: "Natore", code: "DIS-3002" },
      { name_bn: "নওগাঁ", name_en: "Naogaon", code: "DIS-3003" },
      { name_bn: "চাঁপাইনবাবগঞ্জ", name_en: "Chapainawabganj", code: "DIS-3004" },
      { name_bn: "পাবনা", name_en: "Pabna", code: "DIS-3005" },
      { name_bn: "সিরাজগঞ্জ", name_en: "Sirajganj", code: "DIS-3006" },
      { name_bn: "বগুড়া", name_en: "Bogura", code: "DIS-3007" },
      { name_bn: "জয়পুরহাট", name_en: "Joypurhat", code: "DIS-3008" },
    ],
  },
  {
    name_bn: "খুলনা",
    name_en: "Khulna",
    code: "DIV-40",
    districts: [
      { name_bn: "খুলনা", name_en: "Khulna", code: "DIS-4001" },
      { name_bn: "যশোর", name_en: "Jashore", code: "DIS-4002" },
      { name_bn: "সাতক্ষীরা", name_en: "Satkhira", code: "DIS-4003" },
      { name_bn: "বাগেরহাট", name_en: "Bagerhat", code: "DIS-4004" },
      { name_bn: "ঝিনাইদহ", name_en: "Jhenaidah", code: "DIS-4005" },
      { name_bn: "মাগুরা", name_en: "Magura", code: "DIS-4006" },
      { name_bn: "নড়াইল", name_en: "Narail", code: "DIS-4007" },
      { name_bn: "কুষ্টিয়া", name_en: "Kushtia", code: "DIS-4008" },
    ],
  },
  {
    name_bn: "বরিশাল",
    name_en: "Barishal",
    code: "DIV-50",
    districts: [
      { name_bn: "বরিশাল", name_en: "Barishal", code: "DIS-5001" },
      { name_bn: "পটুয়াখালী", name_en: "Patuakhali", code: "DIS-5002" },
      { name_bn: "ভোলা", name_en: "Bhola", code: "DIS-5003" },
      { name_bn: "পিরোজপুর", name_en: "Pirojpur", code: "DIS-5004" },
      { name_bn: "ঝালকাঠি", name_en: "Jhalokati", code: "DIS-5005" },
      { name_bn: "বরগুনা", name_en: "Barguna", code: "DIS-5006" },
      { name_bn: "গোপালগঞ্জ", name_en: "Gopalganj", code: "DIS-5007" },
      { name_bn: "মাদারীপুর", name_en: "Madaripur", code: "DIS-5008" },
    ],
  },
  {
    name_bn: "সিলেট",
    name_en: "Sylhet",
    code: "DIV-60",
    districts: [
      { name_bn: "সিলেট", name_en: "Sylhet", code: "DIS-6001" },
      { name_bn: "মৌলভীবাজার", name_en: "Moulvibazar", code: "DIS-6002" },
      { name_bn: "হবিগঞ্জ", name_en: "Habiganj", code: "DIS-6003" },
      { name_bn: "সুনামগঞ্জ", name_en: "Sunamganj", code: "DIS-6004" },
      { name_bn: "শেরপুর", name_en: "Sherpur", code: "DIS-6005" },
      { name_bn: "ময়মনসিংহ", name_en: "Mymensingh", code: "DIS-6006" },
      { name_bn: "জামালপুর", name_en: "Jamalpur", code: "DIS-6007" },
      { name_bn: "নেত্রকোনা", name_en: "Netrokona", code: "DIS-6008" },
    ],
  },
  {
    name_bn: "রংপুর",
    name_en: "Rangpur",
    code: "DIV-70",
    districts: [
      { name_bn: "রংপুর", name_en: "Rangpur", code: "DIS-7001" },
      { name_bn: "দিনাজপুর", name_en: "Dinajpur", code: "DIS-7002" },
      { name_bn: "কুড়িগ্রাম", name_en: "Kurigram", code: "DIS-7003" },
      { name_bn: "লালমনিরহাট", name_en: "Lalmonirhat", code: "DIS-7004" },
      { name_bn: "নীলফামারী", name_en: "Nilphamari", code: "DIS-7005" },
      { name_bn: "গাইবান্ধা", name_en: "Gaibandha", code: "DIS-7006" },
      { name_bn: "ঠাকুরগাঁও", name_en: "Thakurgaon", code: "DIS-7007" },
      { name_bn: "পঞ্চগড়", name_en: "Panchagarh", code: "DIS-7008" },
    ],
  },
  {
    name_bn: "ময়মনসিংহ",
    name_en: "Mymensingh",
    code: "DIV-80",
    districts: [
      { name_bn: "ময়মনসিংহ", name_en: "Mymensingh", code: "DIS-8001" },
      { name_bn: "জামালপুর", name_en: "Jamalpur", code: "DIS-8002" },
      { name_bn: "শেরপুর", name_en: "Sherpur", code: "DIS-8003" },
      { name_bn: "নেত্রকোনা", name_en: "Netrokona", code: "DIS-8004" },
      { name_bn: "রাজবাড়ী", name_en: "Rajbari", code: "DIS-8005" },
      { name_bn: "শরীয়তপুর", name_en: "Shariatpur", code: "DIS-8006" },
      { name_bn: "ফরিদপুর", name_en: "Faridpur", code: "DIS-8007" },
      { name_bn: "মেহেরপুর", name_en: "Meherpur", code: "DIS-8008" },
    ],
  },
];

// ─── Main Seed Function ───────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Starting seed...\n");

  // 1. Seed jurisdictions
  console.log("📍 Seeding jurisdictions...");
  let dhakaDistrictId: string | null = null;

  for (const division of DIVISIONS) {
    // Insert division
    const { data: divData, error: divError } = await supabase
      .from("jurisdictions")
      .upsert(
        {
          name_bn: division.name_bn,
          name_en: division.name_en,
          type: "DIVISION",
          code: division.code,
          is_active: true,
        },
        { onConflict: "code" }
      )
      .select("id")
      .single();

    if (divError) {
      console.error(`  ❌ Division ${division.name_en}:`, divError.message);
      continue;
    }

    console.log(`  ✅ Division: ${division.name_en}`);

    // Insert districts under this division
    for (const district of division.districts) {
      const { data: distData, error: distError } = await supabase
        .from("jurisdictions")
        .upsert(
          {
            name_bn: district.name_bn,
            name_en: district.name_en,
            type: "DISTRICT",
            parent_id: divData.id,
            code: district.code,
            is_active: true,
          },
          { onConflict: "code" }
        )
        .select("id")
        .single();

      if (distError) {
        console.error(`    ❌ District ${district.name_en}:`, distError.message);
      }

      // Save Dhaka district ID for kazi assignment
      if (district.code === "DIS-1001" && distData) {
        dhakaDistrictId = distData.id;
      }
    }
  }

  console.log(`\n  Total: 8 divisions + 64 districts\n`);

  // 2. Seed demo users
  console.log("👤 Seeding demo users...");

  for (const demoUser of DEMO_USERS) {
    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existing = existingUsers?.users?.find((u) => u.email === demoUser.email);

    if (existing) {
      console.log(`  ⏭️  ${demoUser.email} already exists, updating profile...`);

      // Update profile with all metadata
      await supabase
        .from("profiles")
        .upsert({
          id: existing.id,
          full_name_bn: demoUser.metadata.full_name_bn,
          full_name_en: demoUser.metadata.full_name_en,
          nid_number: demoUser.metadata.nid_number,
          mobile: demoUser.metadata.mobile,
          role: demoUser.metadata.role,
          is_active: true,
        });

      // Handle kazi profile
      if (demoUser.metadata.role === "KAZI") {
        await createKaziProfile(existing.id, dhakaDistrictId);
      }

      continue;
    }

    // Create new user via admin API
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: demoUser.email,
      password: demoUser.password,
      email_confirm: true, // Skip email confirmation
      user_metadata: demoUser.metadata,
    });

    if (authError) {
      console.error(`  ❌ ${demoUser.email}:`, authError.message);
      continue;
    }

    console.log(`  ✅ ${demoUser.email} (${demoUser.metadata.role})`);

    // The trigger should auto-create profile, but let's also update with full data
    await supabase
      .from("profiles")
      .upsert({
        id: authData.user.id,
        full_name_bn: demoUser.metadata.full_name_bn,
        full_name_en: demoUser.metadata.full_name_en,
        nid_number: demoUser.metadata.nid_number,
        mobile: demoUser.metadata.mobile,
        role: demoUser.metadata.role,
        is_active: true,
      });

    // Create kazi profile for the kazi user
    if (demoUser.metadata.role === "KAZI") {
      await createKaziProfile(authData.user.id, dhakaDistrictId);
    }
  }

  console.log("\n🎉 Seed complete!\n");
  console.log("Demo credentials (password: password123):");
  console.log("  citizen@demo.com  → /citizen/dashboard");
  console.log("  kazi@demo.com     → /kazi/dashboard");
  console.log("  district@demo.com → /district/dashboard");
  console.log("  admin@demo.com    → /admin/dashboard");
}

async function createKaziProfile(userId: string, jurisdictionId: string | null) {
  const { error } = await supabase.from("kazi_profiles").upsert(
    {
      user_id: userId,
      registration_number: "KZ-DHK-2024-0001",
      kazi_type: "MUSLIM",
      jurisdiction_id: jurisdictionId,
      status: "ACTIVE",
      appointed_date: "2020-01-15",
    },
    { onConflict: "user_id" }
  );

  if (error) {
    console.error("  ❌ Kazi profile:", error.message);
  } else {
    console.log("  ✅ Kazi profile created (KZ-DHK-2024-0001)");
  }
}

// Run
seed().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
