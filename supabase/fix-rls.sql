-- Fix RLS policies for Supabase
-- Run this in Supabase SQL Editor AFTER the schema

-- Drop existing write policies
DROP POLICY IF EXISTS "Authenticated insert" ON countries;
DROP POLICY IF EXISTS "Authenticated update" ON countries;
DROP POLICY IF EXISTS "Authenticated delete" ON countries;
DROP POLICY IF EXISTS "Authenticated insert" ON visa_programs;
DROP POLICY IF EXISTS "Authenticated update" ON visa_programs;
DROP POLICY IF EXISTS "Authenticated delete" ON visa_programs;

-- Allow service role full access (for admin/seed)
CREATE POLICY "Service role full access" ON countries
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON visa_programs
  FOR ALL USING (true) WITH CHECK (true);
