'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import countries from '@/data/countries.json';
import visaPrograms from '@/data/visaPrograms.json';

const categoryLabels: Record<string, string> = {
  student_masters: 'Student Visa (Masters)',
  skilled_worker: 'Skilled Worker Visa',
  job_seeker: 'Job Seeker Visa',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComparisonField = {
  key: string;
  label: string;
  format?: (v: any, program?: any) => string;
  highlight?: (v: any) => string;
};

const comparisonFields: ComparisonField[] = [
  { key: 'spouseCanAccompany', label: 'Spouse Can Accompany', format: (v: boolean) => v ? '✓ Yes' : '✗ No', highlight: (v: boolean) => v ? 'text-emerald-600' : 'text-red-600' },
  { key: 'spouseJoinDelay', label: 'Spouse Join Delay' },
  { key: 'spouseWorkRights', label: 'Spouse Work Rights' },
  { key: 'workPermitHours', label: 'Work Permit Hours' },
  { key: 'postStudyWorkVisa', label: 'Post-Study Work Visa' },
  { key: 'financialProofType', label: 'Financial Proof Type' },
  { key: 'financialProofAmount', label: 'Financial Proof Amount' },
  { key: 'tuitionFeeRange', label: 'Tuition Fee Range', format: (_v: unknown, program: { tuitionFeeMin: number; tuitionFeeMax: number; tuitionCurrency: string }) =>
    program.tuitionFeeMin === 0 && program.tuitionFeeMax === 0 ? 'Free' : `${program.tuitionCurrency} ${program.tuitionFeeMin.toLocaleString()} - ${program.tuitionFeeMax.toLocaleString()}` },
  { key: 'prPathway', label: 'PR Pathway', format: (v: boolean, program: { timeToPr: string }) => v ? `✓ ${program.timeToPr}` : '✗ Not available', highlight: (v: boolean) => v ? 'text-emerald-600' : 'text-slate-500' },
  { key: 'processingTime', label: 'Processing Time' },
  { key: 'languageRequirement', label: 'Language Requirement' },
  { key: 'costOfLivingIndex', label: 'Cost of Living Index', format: (v: number) => `${v}/100` },
];

function CompareContent() {
  const searchParams = useSearchParams();
  const initialIds = searchParams.get('ids')?.split(',') || [];
  const [selectedCategory, setSelectedCategory] = useState<string>('student_masters');
  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds);

  const availablePrograms = useMemo(() => {
    return visaPrograms.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const selectedPrograms = useMemo(() => {
    return visaPrograms.filter((p) => selectedIds.includes(p.id));
  }, [selectedIds]);

  const getCountry = (countryId: string) => countries.find((c) => c.id === countryId);

  const toggleSelection = (programId: string) => {
    setSelectedIds((prev) =>
      prev.includes(programId) ? prev.filter((id) => id !== programId) : [...prev, programId]
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Compare Countries</h1>

      {/* Category Selection */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => {
              setSelectedCategory(key);
              setSelectedIds([]);
            }}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === key
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Country Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h2 className="font-bold text-slate-900 mb-4">Select countries to compare (max 4)</h2>
        <div className="flex flex-wrap gap-3">
          {availablePrograms.map((program) => {
            const country = getCountry(program.countryId);
            if (!country) return null;
            const isSelected = selectedIds.includes(program.id);

            return (
              <button
                key={program.id}
                onClick={() => {
                  if (!isSelected && selectedIds.length >= 4) return;
                  toggleSelection(program.id);
                }}
                disabled={!isSelected && selectedIds.length >= 4}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Table */}
      {selectedPrograms.length >= 2 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-4 px-6 font-bold text-slate-900 min-w-[200px]">
                    Feature
                  </th>
                  {selectedPrograms.map((program) => {
                    const country = getCountry(program.countryId);
                    return (
                      <th key={program.id} className="text-center py-4 px-6 min-w-[200px]">
                        <div className="flex flex-col items-center">
                          <span className="text-3xl mb-1">{country?.flag}</span>
                          <span className="font-bold text-slate-900">{country?.name}</span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {comparisonFields.map((field, idx) => (
                  <tr
                    key={field.key}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                  >
                    <td className="py-4 px-6 font-medium text-slate-700">{field.label}</td>
                    {selectedPrograms.map((program) => {
                      const value = (program as Record<string, unknown>)[field.key];
                      let displayValue = String(value ?? 'N/A');
                      let highlightClass = '';

                      if (field.format) {
                        displayValue = field.format(value, program);
                      }
                      if (field.highlight) {
                        highlightClass = field.highlight(value);
                      }

                      return (
                        <td key={program.id} className={`py-4 px-6 text-center ${highlightClass || 'text-slate-900'}`}>
                          {displayValue}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <p className="text-slate-500 text-lg">
            Select at least 2 countries to see comparison
          </p>
        </div>
      )}
    </main>
  );
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-slate-50">
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
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-slate-500">Loading...</div>}>
        <CompareContent />
      </Suspense>
    </div>
  );
}
