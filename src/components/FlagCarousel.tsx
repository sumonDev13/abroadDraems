'use client';

import Link from 'next/link';

const countries = [
  { id: 'germany-student', name: 'Germany', flag: '🇩🇪', tuition: 'Free - €3,000/yr' },
  { id: 'canada-student', name: 'Canada', flag: '🇨🇦', tuition: 'CAD 15K - 50K/yr' },
  { id: 'australia-student', name: 'Australia', flag: '🇦🇺', tuition: 'AUD 20K - 55K/yr' },
  { id: 'uk-student', name: 'United Kingdom', flag: '🇬🇧', tuition: '£12K - 45K/yr' },
  { id: 'ireland-student', name: 'Ireland', flag: '🇮🇪', tuition: '€10K - 35K/yr' },
  { id: 'newzealand-student', name: 'New Zealand', flag: '🇳🇿', tuition: 'NZD 22K - 45K/yr' },
  { id: 'netherlands-student', name: 'Netherlands', flag: '🇳🇱', tuition: '€2K - 20K/yr' },
  { id: 'sweden-student', name: 'Sweden', flag: '🇸🇪', tuition: 'Free - SEK 300K/yr' },
];

export default function FlagCarousel() {
  // Duplicate for infinite scroll effect
  const duplicated = [...countries, ...countries];

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
          Study Destinations
        </p>
        <h2 className="text-2xl font-bold text-slate-900 text-center">
          Explore Top Countries for Your Masters
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling flags */}
        <div className="flex gap-6 animate-scroll">
          {duplicated.map((country, idx) => (
            <Link
              key={`${country.id}-${idx}`}
              href={`/country/${country.id}`}
              className="flex-shrink-0 group"
            >
              <div className="flex flex-col items-center gap-3 px-6 py-4 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-all duration-300 hover:shadow-md hover:-translate-y-1 min-w-[140px]">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  {country.flag}
                </span>
                <div className="text-center">
                  <p className="font-semibold text-slate-900 text-sm">{country.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{country.tuition}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
