import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase, type Country, type VisaProgram } from '@/lib/supabase';

const categoryLabels: Record<string, string> = {
  student_masters: "Master's Degree - Student Visa",
};

type ProgramWithCountry = VisaProgram & { countries: Country };

// Generate static params for all visa programs
export async function generateStaticParams() {
  const { data } = await supabase.from('visa_programs').select('id');
  return (data || []).map((p) => ({ id: p.id }));
}

// Allow dynamic params that aren't pre-rendered
export const dynamicParams = true;

export default async function CountryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: program, error } = await supabase
    .from('visa_programs')
    .select('*, countries(*)')
    .eq('id', id)
    .single();

  if (error || !program) {
    notFound();
  }

  const typedProgram = program as ProgramWithCountry;
  const country = typedProgram.countries;

  if (!country) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Country Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{country.flag}</span>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{country.name}</h1>
              <p className="text-slate-600">{categoryLabels[typedProgram.category]}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
              {country.region}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
              {country.currency}
            </span>
            {typedProgram.pr_pathway && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                PR Available
              </span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Spouse Information */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>👨‍👩‍👧</span> Spouse Information
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Can Accompany</span>
                <span className={`font-semibold ${typedProgram.spouse_can_accompany ? 'text-emerald-600' : 'text-red-600'}`}>
                  {typedProgram.spouse_can_accompany ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Join Delay</span>
                <span className="font-semibold text-slate-900">{typedProgram.spouse_join_delay}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Work Rights</span>
                <span className="font-semibold text-slate-900 text-right text-sm">{typedProgram.spouse_work_rights}</span>
              </div>
            </div>
          </div>

          {/* Work & Study */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>💼</span> Work & Study
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Work Permit</span>
                <span className="font-semibold text-slate-900 text-right text-sm">{typedProgram.work_permit_hours}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Post-Study Work</span>
                <span className="font-semibold text-slate-900 text-right text-sm">{typedProgram.post_study_work_visa}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Language Requirement</span>
                <span className="font-semibold text-slate-900 text-right text-sm">{typedProgram.language_requirement}</span>
              </div>
            </div>
          </div>

          {/* Financial Requirements */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>💰</span> Financial Requirements
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Proof Type</span>
                <span className="font-semibold text-slate-900">{typedProgram.financial_proof_type}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Amount Required</span>
                <span className="font-semibold text-slate-900">{typedProgram.financial_proof_amount}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Tuition Fee Range</span>
                <span className="font-semibold text-slate-900">
                  {!typedProgram.tuition_fee_min && !typedProgram.tuition_fee_max
                    ? 'Free'
                    : `${typedProgram.tuition_currency} ${(typedProgram.tuition_fee_min || 0).toLocaleString()} - ${(typedProgram.tuition_fee_max || 0).toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>

          {/* PR & Processing */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>🏛️</span> PR & Processing
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">PR Pathway</span>
                <span className={`font-semibold ${typedProgram.pr_pathway ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {typedProgram.pr_pathway ? `Yes - ${typedProgram.time_to_pr}` : 'Not available'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Processing Time</span>
                <span className="font-semibold text-slate-900">{typedProgram.processing_time}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Cost of Living Index</span>
                <span className="font-semibold text-slate-900">{typedProgram.cost_of_living_index}/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Source & Disclaimer */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-sm text-slate-500">
                Last Updated: {typedProgram.last_updated}
              </p>
              <a
                href={typedProgram.source_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              >
                View Official Source →
              </a>
            </div>
            <Link
              href={`/explore?category=${typedProgram.category}`}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm"
            >
              Compare with Other Countries
            </Link>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-slate-500">
          <p>
            <strong>Disclaimer:</strong> This information is for reference only. Always verify with official government sources.
          </p>
        </div>
      </main>
    </div>
  );
}
