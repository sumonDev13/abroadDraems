// Seed script: Run with `npx tsx scripts/seed.ts`
// This seeds your Supabase database with data from the JSON files

import { createClient } from '@supabase/supabase-js';
import countries from '../src/data/countries.json';
import visaPrograms from '../src/data/visaPrograms.json';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing env variables. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log('Seeding countries...');

  const countryData = countries.map((c) => ({
    id: c.id,
    name: c.name,
    flag: c.flag,
    currency: c.currency,
    region: c.region,
  }));

  const { error: countryError } = await supabase
    .from('countries')
    .upsert(countryData, { onConflict: 'id' });

  if (countryError) {
    console.error('Error seeding countries:', countryError);
    process.exit(1);
  }
  console.log(`✓ Seeded ${countryData.length} countries`);

  console.log('Seeding visa programs...');

  const programData = visaPrograms.map((p) => ({
    id: p.id,
    country_id: p.countryId,
    category: p.category,
    spouse_can_accompany: p.spouseCanAccompany,
    spouse_join_delay: p.spouseJoinDelay,
    spouse_work_rights: p.spouseWorkRights,
    pr_pathway: p.prPathway,
    time_to_pr: p.timeToPr,
    work_permit_hours: p.workPermitHours,
    post_study_work_visa: p.postStudyWorkVisa,
    financial_proof_type: p.financialProofType,
    financial_proof_amount: p.financialProofAmount,
    tuition_fee_min: p.tuitionFeeMin,
    tuition_fee_max: p.tuitionFeeMax,
    tuition_currency: p.tuitionCurrency,
    processing_time: p.processingTime,
    language_requirement: p.languageRequirement,
    cost_of_living_index: p.costOfLivingIndex,
    last_updated: p.lastUpdated,
    source_link: p.sourceLink,
  }));

  const { error: programError } = await supabase
    .from('visa_programs')
    .upsert(programData, { onConflict: 'id' });

  if (programError) {
    console.error('Error seeding visa programs:', programError);
    process.exit(1);
  }
  console.log(`✓ Seeded ${programData.length} visa programs`);

  console.log('\nDone! Your Supabase database is now populated.');
}

seed();
