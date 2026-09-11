-- AbroadDreams Database Schema
-- Run this in Supabase SQL Editor

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  flag TEXT NOT NULL,
  currency TEXT NOT NULL,
  region TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create visa_programs table
CREATE TABLE IF NOT EXISTS visa_programs (
  id TEXT PRIMARY KEY,
  country_id TEXT REFERENCES countries(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  
  -- spouse info
  spouse_can_accompany BOOLEAN DEFAULT FALSE,
  spouse_join_delay TEXT,
  spouse_work_rights TEXT,
  
  -- PR
  pr_pathway BOOLEAN DEFAULT FALSE,
  time_to_pr TEXT,
  
  -- work
  work_permit_hours TEXT,
  post_study_work_visa TEXT,
  
  -- financial
  financial_proof_type TEXT,
  financial_proof_amount TEXT,
  tuition_fee_min NUMERIC DEFAULT 0,
  tuition_fee_max NUMERIC DEFAULT 0,
  tuition_currency TEXT,
  
  -- other
  processing_time TEXT,
  language_requirement TEXT,
  cost_of_living_index NUMERIC DEFAULT 0,
  
  -- meta
  last_updated TEXT,
  source_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE visa_programs ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can read, only authenticated users can write)
CREATE POLICY "Public read access" ON countries
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON visa_programs
  FOR SELECT USING (true);

-- Authenticated write access (for admin)
CREATE POLICY "Authenticated insert" ON countries
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated update" ON countries
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated delete" ON countries
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated insert" ON visa_programs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated update" ON visa_programs
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated delete" ON visa_programs
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_visa_programs_country_id ON visa_programs(country_id);
CREATE INDEX IF NOT EXISTS idx_visa_programs_category ON visa_programs(category);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update updated_at
CREATE TRIGGER update_countries_updated_at
  BEFORE UPDATE ON countries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_visa_programs_updated_at
  BEFORE UPDATE ON visa_programs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
