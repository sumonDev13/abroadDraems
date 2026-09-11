'use client';

import { useState, useEffect } from 'react';

const quotes = [
  {
    text: "The journey of a thousand miles begins with a single step.",
    author: "Lao Tzu",
    tagline: "Start your study abroad journey today",
  },
  {
    text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    author: "Malcolm X",
    tagline: "Invest in your education, invest in your future",
  },
  {
    text: "Study abroad — where learning meets adventure.",
    author: "AbroadDreams",
    tagline: "Discover new cultures while earning your degree",
  },
  {
    text: "Your education is the only thing no one can take away from you.",
    author: "Unknown",
    tagline: "Build skills that last a lifetime",
  },
  {
    text: "Don't just dream about studying abroad. Make it happen.",
    author: "AbroadDreams",
    tagline: "Compare countries, find your perfect fit",
  },
];

export default function MotivationalQuotes() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Quote icon */}
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-6">
            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Quote text */}
          <div className="min-h-[120px] flex items-center justify-center">
            <div key={current} className="animate-fade-in">
              <p className="text-2xl md:text-3xl font-serif italic text-white/95 mb-4 leading-relaxed">
                &ldquo;{quotes[current].text}&rdquo;
              </p>
              <p className="text-blue-300 font-medium mb-2">— {quotes[current].author}</p>
              <p className="text-sm text-white/60">{quotes[current].tagline}</p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === current ? 'bg-blue-400 w-6' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
