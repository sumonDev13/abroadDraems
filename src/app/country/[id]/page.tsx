import { notFound } from 'next/navigation';
import Link from 'next/link';
import countries from '@/data/countries.json';
import visaPrograms from '@/data/visaPrograms.json';

const categoryLabels: Record<string, string> = {
  student_masters: 'Student Visa (Masters)',
  skilled_worker: 'Skilled Worker Visa',
  job_seeker: 'Job Seeker Visa',
};

export function generateStaticParams() {
  return visaPrograms.map((program) => ({
    id: program.id,
  }));
}

export default async function CountryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const program = visaPrograms.find((p) => p.id === id);
  
  if (!program) {
    notFound();
  }

  const country = countries.find((c) => c.id === program.countryId);
  
  if (!country) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-slate-900">
              AbroadDreams
            </Link>
            <Link href="/explore" className="text-slate-600 hover:text-slate-900 font-medium">
              ← Back to Explore
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Country Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{country.flag}</span>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{country.name}</h1>
              <p className="text-slate-600">{categoryLabels[program.category]}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
              {country.region}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
              {country.currency}
            </span>
            {program.prPathway && (
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
                <span className={`font-semibold ${program.spouseCanAccompany ? 'text-emerald-600' : 'text-red-600'}`}>
                  {program.spouseCanAccompany ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Join Delay</span>
                <span className="font-semibold text-slate-900">{program.spouseJoinDelay}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Work Rights</span>
                <span className="font-semibold text-slate-900 text-right text-sm">{program.spouseWorkRights}</span>
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
                <span className="font-semibold text-slate-900 text-right text-sm">{program.workPermitHours}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Post-Study Work</span>
                <span className="font-semibold text-slate-900 text-right text-sm">{program.postStudyWorkVisa}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Language Requirement</span>
                <span className="font-semibold text-slate-900 text-right text-sm">{program.languageRequirement}</span>
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
                <span className="font-semibold text-slate-900">{program.financialProofType}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Amount Required</span>
                <span className="font-semibold text-slate-900">{program.financialProofAmount}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Tuition Fee Range</span>
                <span className="font-semibold text-slate-900">
                  {program.tuitionFeeMin === 0 && program.tuitionFeeMax === 0
                    ? 'Free'
                    : `${program.tuitionCurrency} ${program.tuitionFeeMin.toLocaleString()} - ${program.tuitionFeeMax.toLocaleString()}`}
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
                <span className={`font-semibold ${program.prPathway ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {program.prPathway ? `Yes - ${program.timeToPr}` : 'Not available'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Processing Time</span>
                <span className="font-semibold text-slate-900">{program.processingTime}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Cost of Living Index</span>
                <span className="font-semibold text-slate-900">{program.costOfLivingIndex}/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Source & Disclaimer */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-sm text-slate-500">
                Last Updated: {program.lastUpdated}
              </p>
              <a
                href={program.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Official Source →
              </a>
            </div>
            <Link
              href={`/explore?category=${program.category}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
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
