'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase, type Country, type VisaProgram } from '@/lib/supabase';

const categoryLabels: Record<string, string> = {
  student_masters: 'Student Visa (Masters)',
  skilled_worker: 'Skilled Worker Visa',
  job_seeker: 'Job Seeker Visa',
};

type ProgramWithCountry = VisaProgram & { countries: Country };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComparisonField = {
  key: string;
  label: string;
  format?: (v: any, program?: any) => string;
  highlight?: (v: any) => string;
};

const comparisonFields: ComparisonField[] = [
  { key: 'spouse_can_accompany', label: 'Spouse Can Accompany', format: (v: boolean) => v ? '✓ Yes' : '✗ No', highlight: (v: boolean) => v ? 'text-emerald-600' : 'text-red-600' },
  { key: 'spouse_join_delay', label: 'Spouse Join Delay' },
  { key: 'spouse_work_rights', label: 'Spouse Work Rights' },
  { key: 'work_permit_hours', label: 'Work Permit Hours' },
  { key: 'post_study_work_visa', label: 'Post-Study Work Visa' },
  { key: 'financial_proof_type', label: 'Financial Proof Type' },
  { key: 'financial_proof_amount', label: 'Financial Proof Amount' },
  { key: 'tuition_fee_range', label: 'Tuition Fee Range', format: (_v: unknown, program: ProgramWithCountry) =>
    !program.tuition_fee_min && !program.tuition_fee_max ? 'Free' : `${program.tuition_currency} ${(program.tuition_fee_min || 0).toLocaleString()} - ${(program.tuition_fee_max || 0).toLocaleString()}` },
  { key: 'pr_pathway', label: 'PR Pathway', format: (v: boolean, program: ProgramWithCountry) => v ? `✓ ${program.time_to_pr}` : '✗ Not available', highlight: (v: boolean) => v ? 'text-emerald-600' : 'text-slate-500' },
  { key: 'processing_time', label: 'Processing Time' },
  { key: 'language_requirement', label: 'Language Requirement' },
  { key: 'cost_of_living_index', label: 'Cost of Living Index', format: (v: number) => `${v}/100` },
];

function CompareContent() {
  const searchParams = useSearchParams();
  const initialIds = searchParams.get('ids')?.split(',') || [];
  const [selectedCategory, setSelectedCategory] = useState<string>('student_masters');
  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds);
  const [availablePrograms, setAvailablePrograms] = useState<ProgramWithCountry[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<ProgramWithCountry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      setLoading(true);
      const { data, error } = await supabase
        .from('visa_programs')
        .select('*, countries(*)')
        .eq('category', selectedCategory);

      if (error) {
        console.error('Error fetching programs:', error);
        setLoading(false);
        return;
      }

      setAvailablePrograms((data as ProgramWithCountry[]) || []);
      setLoading(false);
    }

    fetchPrograms();
  }, [selectedCategory]);

  useEffect(() => {
    async function fetchSelected() {
      if (selectedIds.length === 0) {
        setSelectedPrograms([]);
        return;
      }

      const { data, error } = await supabase
        .from('visa_programs')
        .select('*, countries(*)')
        .in('id', selectedIds);

      if (error) {
        console.error('Error fetching selected programs:', error);
        return;
      }

      setSelectedPrograms((data as ProgramWithCountry[]) || []);
    }

    fetchSelected();
  }, [selectedIds]);

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
          {loading ? (
            <div className="text-slate-500">Loading countries...</div>
          ) : (
            availablePrograms.map((program) => {
              const country = program.countries;
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
            })
          )}
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
                    const country = program.countries;
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
                      // Handle special computed fields
                      if (field.key === 'tuition_fee_range') {
                        const displayValue = field.format
                          ? field.format(null, program)
                          : 'N/A';
                        return (
                          <td key={program.id} className="py-4 px-6 text-center text-slate-900">
                            {displayValue}
                          </td>
                        );
                      }

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
