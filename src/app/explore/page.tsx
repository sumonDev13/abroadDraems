'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase, type Country, type VisaProgram } from '@/lib/supabase';

const subcategoryLabels: Record<string, string> = {
  masters: "Master's Degree",
  bachelor: "Bachelor's Degree",
};

interface Filters {
  spouseCanAccompany: boolean | null;
  prPathway: boolean | null;
  region: string;
  search: string;
}

type ProgramWithCountry = VisaProgram & { countries: Country };

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialSub = searchParams.get('subcategory') || 'masters';
  const [selectedSub, setSelectedSub] = useState(initialSub);
  const [filters, setFilters] = useState<Filters>({
    spouseCanAccompany: null,
    prPathway: null,
    region: '',
    search: '',
  });
  const [sortBy, setSortBy] = useState<string>('name');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [programs, setPrograms] = useState<ProgramWithCountry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedSub === 'bachelor') {
      setPrograms([]);
      setLoading(false);
      return;
    }

    async function fetchPrograms() {
      setLoading(true);
      let query = supabase
        .from('visa_programs')
        .select('*, countries(*)')
        .eq('category', 'student_masters');

      if (filters.spouseCanAccompany !== null) {
        query = query.eq('spouse_can_accompany', filters.spouseCanAccompany);
      }
      if (filters.prPathway !== null) {
        query = query.eq('pr_pathway', filters.prPathway);
      }
      if (filters.region) {
        query = query.eq('countries.region', filters.region);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching programs:', error);
        setLoading(false);
        return;
      }

      let filtered = (data as ProgramWithCountry[]) || [];

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter((p) =>
          p.countries?.name.toLowerCase().includes(searchLower) ||
          p.work_permit_hours?.toLowerCase().includes(searchLower)
        );
      }

      // Sort
      if (sortBy === 'name') {
        filtered.sort((a, b) =>
          (a.countries?.name || '').localeCompare(b.countries?.name || '')
        );
      } else if (sortBy === 'tuition-low') {
        filtered.sort((a, b) => (a.tuition_fee_min || 0) - (b.tuition_fee_min || 0));
      } else if (sortBy === 'tuition-high') {
        filtered.sort((a, b) => (b.tuition_fee_max || 0) - (a.tuition_fee_max || 0));
      }

      setPrograms(filtered);
      setLoading(false);
    }

    fetchPrograms();
  }, [selectedSub, filters, sortBy]);

  const toggleCompare = (programId: string) => {
    setCompareList((prev) =>
      prev.includes(programId) ? prev.filter((id) => id !== programId) : [...prev, programId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Subcategory Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {Object.entries(subcategoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedSub(key)}
            disabled={key === 'bachelor'}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedSub === key
                ? 'bg-blue-600 text-white'
                : key === 'bachelor'
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {label}
            {key === 'bachelor' && (
              <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Bachelor Placeholder */}
      {selectedSub === 'bachelor' ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
          <span className="text-6xl block mb-4">📚</span>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Bachelor's Degree</h2>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            We're working on adding bachelor's program comparisons. Check back soon!
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setSelectedSub('masters')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Browse Master's Programs
            </button>
          </div>
          <p className="text-sm text-slate-400 mt-6">
            Want to help us build this? Contact us at hello@abroaddreams.com
          </p>
        </div>
      ) : (
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
                {loading ? 'Loading...' : `${programs.length} countries found`}
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

            {loading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 animate-pulse">
                    <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-200 rounded"></div>
                      <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {programs.map((program) => {
                  const country = program.countries;
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
                            {(!program.tuition_fee_min && !program.tuition_fee_max)
                              ? 'Free'
                              : `${program.tuition_currency} ${(program.tuition_fee_min || 0).toLocaleString()} - ${(program.tuition_fee_max || 0).toLocaleString()}`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Work Permit</span>
                          <span className="font-medium text-slate-900 text-right text-xs">
                            {program.work_permit_hours}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Spouse</span>
                          <span className={`font-medium ${program.spouse_can_accompany ? 'text-emerald-600' : 'text-red-600'}`}>
                            {program.spouse_can_accompany ? '✓ Yes' : '✗ No'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">PR Pathway</span>
                          <span className={`font-medium ${program.pr_pathway ? 'text-emerald-600' : 'text-slate-500'}`}>
                            {program.pr_pathway ? `✓ ${program.time_to_pr}` : '✗ Not available'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Post-Study Work</span>
                          <span className="font-medium text-slate-900 text-right text-xs">
                            {program.post_study_work_visa}
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
            )}

            {!loading && programs.length === 0 && selectedSub === 'masters' && (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                <p className="text-slate-500 text-lg">No countries match your filters</p>
                <button
                  onClick={() =>
                    setFilters({
                      spouseCanAccompany: null,
                      prPathway: null,
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
      )}
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
