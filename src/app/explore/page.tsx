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

interface Filters {
  spouseCanAccompany: boolean | null;
  prPathway: boolean | null;
  maxTuition: number;
  region: string;
  search: string;
}

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'student_masters';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filters, setFilters] = useState<Filters>({
    spouseCanAccompany: null,
    prPathway: null,
    maxTuition: 100000,
    region: '',
    search: '',
  });
  const [sortBy, setSortBy] = useState<string>('name');
  const [compareList, setCompareList] = useState<string[]>([]);

  const filteredPrograms = useMemo(() => {
    let programs = visaPrograms.filter((p) => p.category === selectedCategory);

    if (filters.spouseCanAccompany !== null) {
      programs = programs.filter((p) => p.spouseCanAccompany === filters.spouseCanAccompany);
    }
    if (filters.prPathway !== null) {
      programs = programs.filter((p) => p.prPathway === filters.prPathway);
    }
    if (filters.region) {
      const countryIds = countries
        .filter((c) => c.region === filters.region)
        .map((c) => c.id);
      programs = programs.filter((p) => countryIds.includes(p.countryId));
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      programs = programs.filter((p) => {
        const country = countries.find((c) => c.id === p.countryId);
        return (
          country?.name.toLowerCase().includes(searchLower) ||
          p.tuitionFeeMin.toString().includes(searchLower) ||
          p.workPermitHours.toLowerCase().includes(searchLower)
        );
      });
    }

    // Sort
    if (sortBy === 'name') {
      programs.sort((a, b) => {
        const countryA = countries.find((c) => c.id === a.countryId)?.name || '';
        const countryB = countries.find((c) => c.id === b.countryId)?.name || '';
        return countryA.localeCompare(countryB);
      });
    } else if (sortBy === 'tuition-low') {
      programs.sort((a, b) => a.tuitionFeeMin - b.tuitionFeeMin);
    } else if (sortBy === 'tuition-high') {
      programs.sort((a, b) => b.tuitionFeeMax - a.tuitionFeeMax);
    }

    return programs;
  }, [selectedCategory, filters, sortBy]);

  const toggleCompare = (programId: string) => {
    setCompareList((prev) =>
      prev.includes(programId) ? prev.filter((id) => id !== programId) : [...prev, programId]
    );
  };

  const getCountry = (countryId: string) => countries.find((c) => c.id === countryId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
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

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <h3 className="font-bold text-slate-900 mb-4">Filters</h3>

            {/* Search */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Country or keyword..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Region */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Region</label>
              <select
                value={filters.region}
                onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Regions</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>

            {/* Spouse */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Spouse Can Accompany
              </label>
              <select
                value={filters.spouseCanAccompany === null ? '' : filters.spouseCanAccompany.toString()}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    spouseCanAccompany: e.target.value === '' ? null : e.target.value === 'true',
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* PR Pathway */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                PR Pathway
              </label>
              <select
                value={filters.prPathway === null ? '' : filters.prPathway.toString()}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    prPathway: e.target.value === '' ? null : e.target.value === 'true',
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Country Name</option>
                <option value="tuition-low">Tuition: Low to High</option>
                <option value="tuition-high">Tuition: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-600">
              {filteredPrograms.length} countries found
            </p>
            {compareList.length > 0 && (
              <button
                onClick={() => setCompareList([])}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Clear selection
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredPrograms.map((program) => {
              const country = getCountry(program.countryId);
              if (!country) return null;
              const isComparing = compareList.includes(program.id);

              return (
                <div
                  key={program.id}
                  className={`bg-white rounded-xl shadow-sm border-2 p-5 transition-all hover:shadow-md ${
                    isComparing ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{country.flag}</span>
                      <div>
                        <h3 className="font-bold text-slate-900">{country.name}</h3>
                        <span className="text-xs text-slate-500">{country.region}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleCompare(program.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        isComparing
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                      title="Add to compare"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Tuition Fee</span>
                      <span className="font-medium text-slate-900">
                        {program.tuitionFeeMin === 0 && program.tuitionFeeMax === 0
                          ? 'Free'
                          : `${program.tuitionCurrency} ${program.tuitionFeeMin.toLocaleString()} - ${program.tuitionFeeMax.toLocaleString()}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Work Permit</span>
                      <span className="font-medium text-slate-900 text-right text-xs">
                        {program.workPermitHours}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Spouse</span>
                      <span className={`font-medium ${program.spouseCanAccompany ? 'text-emerald-600' : 'text-red-600'}`}>
                        {program.spouseCanAccompany ? '✓ Yes' : '✗ No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">PR Pathway</span>
                      <span className={`font-medium ${program.prPathway ? 'text-emerald-600' : 'text-slate-500'}`}>
                        {program.prPathway ? `✓ ${program.timeToPr}` : '✗ Not available'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Post-Study Work</span>
                      <span className="font-medium text-slate-900 text-right text-xs">
                        {program.postStudyWorkVisa}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/country/${program.id}`}
                    className="mt-4 block w-full text-center py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors text-sm"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <p className="text-slate-500 text-lg">No countries match your filters</p>
              <button
                onClick={() =>
                  setFilters({
                    spouseCanAccompany: null,
                    prPathway: null,
                    maxTuition: 100000,
                    region: '',
                    search: '',
                  })
                }
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-slate-900">
              AbroadDreams
            </Link>
          </div>
        </div>
      </header>
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-slate-500">Loading...</div>}>
        <ExploreContent />
      </Suspense>
    </div>
  );
}
