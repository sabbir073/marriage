-- ============================================================
-- Bangladesh Marriage & Divorce Registration System
-- Database Schema — Run this in Supabase SQL Editor
-- ============================================================

-- 1. PROFILES TABLE (extends Supabase auth.users)
-- ============================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name_bn TEXT NOT NULL DEFAULT 'নতুন ব্যবহারকারী',
  full_name_en TEXT,
  nid_number TEXT UNIQUE,
  mobile TEXT,
  role TEXT NOT NULL DEFAULT 'CITIZEN'
    CHECK (role IN ('CITIZEN', 'KAZI', 'DISTRICT_REGISTRAR', 'MINISTRY_ADMIN', 'SUPER_ADMIN')),
  is_active BOOLEAN DEFAULT TRUE,
  language_pref TEXT DEFAULT 'bn',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Any authenticated user can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Admins and district registrars can read all profiles
-- Uses JWT user_metadata to avoid infinite recursion (no subquery on profiles)
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') IN ('MINISTRY_ADMIN', 'SUPER_ADMIN', 'DISTRICT_REGISTRAR', 'KAZI')
  );

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow authenticated users to insert their own profile (for registration)
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Auto-create profile on auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name_bn, full_name_en, nid_number, mobile, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name_bn', 'নতুন ব্যবহারকারী'),
    NEW.raw_user_meta_data->>'full_name_en',
    NEW.raw_user_meta_data->>'nid_number',
    NEW.raw_user_meta_data->>'mobile',
    COALESCE(NEW.raw_user_meta_data->>'role', 'CITIZEN')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if re-running
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


-- 2. JURISDICTIONS TABLE (division → district → upazila → union → ward)
-- ============================================================
CREATE TABLE public.jurisdictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_bn TEXT NOT NULL,
  name_en TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('DIVISION', 'DISTRICT', 'UPAZILA', 'UNION', 'WARD', 'CITY_CORP', 'MUNICIPALITY')),
  parent_id UUID REFERENCES public.jurisdictions(id),
  code TEXT UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.jurisdictions ENABLE ROW LEVEL SECURITY;

-- Everyone can read jurisdictions (public reference data)
CREATE POLICY "Anyone can read jurisdictions"
  ON public.jurisdictions FOR SELECT
  USING (true);

-- Only admins can modify jurisdictions
CREATE POLICY "Admins can manage jurisdictions"
  ON public.jurisdictions FOR ALL
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') IN ('MINISTRY_ADMIN', 'SUPER_ADMIN')
  );


-- 3. KAZI PROFILES TABLE
-- ============================================================
CREATE TABLE public.kazi_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  registration_number TEXT UNIQUE NOT NULL,
  kazi_type TEXT NOT NULL CHECK (kazi_type IN ('MUSLIM', 'HINDU', 'SPECIAL', 'CHRISTIAN')),
  jurisdiction_id UUID REFERENCES public.jurisdictions(id),
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED', 'RETIRED')),
  appointed_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.kazi_profiles ENABLE ROW LEVEL SECURITY;

-- Kazis can view their own kazi profile
CREATE POLICY "Kazis can view own kazi profile"
  ON public.kazi_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Admins and district registrars can view all kazi profiles
CREATE POLICY "Admins can view all kazi profiles"
  ON public.kazi_profiles FOR SELECT
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') IN ('MINISTRY_ADMIN', 'SUPER_ADMIN', 'DISTRICT_REGISTRAR')
  );

-- Admins can manage kazi profiles
CREATE POLICY "Admins can manage kazi profiles"
  ON public.kazi_profiles FOR ALL
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') IN ('MINISTRY_ADMIN', 'SUPER_ADMIN')
  );

CREATE TRIGGER kazi_profiles_updated_at
  BEFORE UPDATE ON public.kazi_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_nid ON public.profiles(nid_number);
CREATE INDEX idx_jurisdictions_parent ON public.jurisdictions(parent_id);
CREATE INDEX idx_jurisdictions_type ON public.jurisdictions(type);
CREATE INDEX idx_kazi_profiles_jurisdiction ON public.kazi_profiles(jurisdiction_id);
CREATE INDEX idx_kazi_profiles_status ON public.kazi_profiles(status);
