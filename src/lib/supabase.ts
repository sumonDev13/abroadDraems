import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Country = {
  id: string;
  name: string;
  flag: string;
  currency: string;
  region: string;
};

export type VisaProgram = {
  id: string;
  country_id: string;
  category: string;
  spouse_can_accompany: boolean;
  spouse_join_delay: string;
  spouse_work_rights: string;
  pr_pathway: boolean;
  time_to_pr: string;
  work_permit_hours: string;
  post_study_work_visa: string;
  financial_proof_type: string;
  financial_proof_amount: string;
  tuition_fee_min: number;
  tuition_fee_max: number;
  tuition_currency: string;
  processing_time: string;
  language_requirement: string;
  cost_of_living_index: number;
  last_updated: string;
  source_link: string;
};

export type VisaProgramWithCountry = VisaProgram & {
  countries: Country;
};
