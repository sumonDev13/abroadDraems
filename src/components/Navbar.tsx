'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore?subcategory=masters', label: 'Explore' },
  { href: '/compare', label: 'Compare' },
];

const quickCountries = [
  { id: 'germany-student', name: 'Germany', flag: '🇩🇪', highlight: 'Free Tuition' },
  { id: 'canada-student', name: 'Canada', flag: '🇨🇦', highlight: 'Fast PR' },
  { id: 'australia-student', name: 'Australia', flag: '🇦🇺', highlight: 'Work Rights' },
  { id: 'uk-student', name: 'United Kingdom', flag: '🇬🇧', highlight: 'Top Unis' },
  { id: 'ireland-student', name: 'Ireland', flag: '🇮🇪', highlight: 'EU Access' },
  { id: 'newzealand-student', name: 'New Zealand', flag: '🇳🇿', highlight: 'Quality Life' },
];

const tickerItems = [
  { icon: '🎓', text: 'Free tuition in Germany for international students' },
  { icon: '🇨🇦', text: 'Canada PR in just 6 months via Express Entry' },
  { icon: '🇦🇺', text: 'Australia: Work 48 hrs/week while studying' },
  { icon: '🇬🇧', text: 'UK: 2-year post-study work visa available' },
  { icon: '🇮🇪', text: 'Ireland: 12 months post-study work visa' },
  { icon: '🇳🇿', text: 'New Zealand: 1-3 years post-study work visa' },
  { icon: '🇳🇱', text: 'Netherlands: 1 year orientation year after study' },
  { icon: '🇸🇪', text: 'Sweden: No tuition fees for EU citizens' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setExploreOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('?')[0]);
  };

  return (
    <>
      {/* Ticker Announcement Bar */}
      <div className="bg-black text-red-500 text-sm py-2 overflow-hidden whitespace-nowrap">
        <div className="flex animate-ticker">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-2 mx-8 font-medium shrink-0">
              <span className="text-base">{item.icon}</span>
              <span>{item.text}</span>
              <span className="text-red-700 mx-2">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-lg shadow-slate-200/50 border-b border-slate-100'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-100/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:scale-105">
                <span className="text-white text-lg">🎓</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  AbroadDreams
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                </Link>
              ))}

              {/* Explore Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setExploreOpen(true)}
                onMouseLeave={() => setExploreOpen(false)}
              >
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1 ${
                    exploreOpen
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Destinations
                  <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {exploreOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-100 p-4 w-[420px]">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">
                        Quick Access
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {quickCountries.map((c) => (
                          <Link
                            key={c.id}
                            href={`/country/${c.id}`}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 transition-colors group"
                          >
                            <span className="text-2xl group-hover:scale-110 transition-transform">{c.flag}</span>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 text-sm truncate">{c.name}</p>
                              <p className="text-xs text-emerald-600 font-medium">{c.highlight}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <Link
                          href="/explore?subcategory=masters"
                          className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 rounded-xl text-sm font-medium transition-colors"
                        >
                          View All Countries
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Trusted by 10K+ students
              </div>
              <Link
                href="/explore?subcategory=masters"
                className="relative bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 group overflow-hidden"
              >
                <span className="relative z-10">Start Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${mobileOpen ? 'rotate-45 translate-x-px' : ''}`} />
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 translate-x-4' : ''}`} />
                <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${mobileOpen ? '-rotate-45 translate-x-px' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 top-[calc(2.5rem+4rem)] bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`md:hidden fixed top-[calc(2.5rem+4rem)] right-0 bottom-0 w-80 bg-white shadow-2xl z-50 transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                    isActive(link.href)
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-4">
                Popular Destinations
              </p>
              <div className="grid grid-cols-2 gap-2">
                {quickCountries.slice(0, 4).map((c) => (
                  <Link
                    key={c.id}
                    href={`/country/${c.id}`}
                    className="flex items-center gap-2 p-3 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <span className="text-xl">{c.flag}</span>
                    <span className="text-sm font-medium text-slate-700 truncate">{c.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6">
              <Link
                href="/explore?subcategory=masters"
                className="flex items-center justify-center w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Start Your Journey
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
