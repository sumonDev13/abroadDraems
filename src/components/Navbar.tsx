'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore?subcategory=masters', label: 'Explore Countries' },
  { href: '/compare', label: 'Compare' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🎓</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AbroadDreams
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/explore?subcategory=masters"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Your Journey
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-slate-100 mt-2 pt-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/explore?subcategory=masters"
                onClick={() => setMobileOpen(false)}
                className="mx-4 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold text-center hover:shadow-lg transition-all"
              >
                Start Your Journey
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
