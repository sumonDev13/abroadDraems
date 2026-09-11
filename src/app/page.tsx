import Link from 'next/link';

const categories = [
  {
    id: 'masters',
    title: "Master's Degree",
    description: "Compare masters programs, tuition fees, work permits, and post-study opportunities",
    icon: '🎓',
    color: 'from-blue-500 to-indigo-600',
    href: '/explore?subcategory=masters',
    available: true,
  },
  {
    id: 'bachelor',
    title: "Bachelor's Degree",
    description: "Explore bachelor programs across top study destinations",
    icon: '📚',
    color: 'from-purple-500 to-pink-600',
    href: '/explore?subcategory=bachelor',
    available: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">AbroadDreams</h1>
              <p className="text-slate-600 mt-1">Find your perfect country for study</p>
            </div>
            <nav className="flex gap-4">
              <Link href="/compare" className="text-slate-600 hover:text-slate-900 font-medium">
                Compare
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Which country suits you best?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Compare visa requirements, work permits, PR pathways, and living costs across top study destinations
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.available ? category.href : '#'}
              className={`group relative bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border border-slate-100 ${
                category.available
                  ? 'hover:shadow-xl cursor-pointer'
                  : 'opacity-75 cursor-not-allowed'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative p-8">
                <div className="flex items-start justify-between">
                  <span className="text-5xl mb-4 block">{category.icon}</span>
                  {!category.available && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-white transition-colors">
                  {category.title}
                </h3>
                <p className="text-slate-600 group-hover:text-white/90 transition-colors">
                  {category.description}
                </p>
                {category.available && (
                  <div className="mt-6 flex items-center text-sm font-semibold text-slate-700 group-hover:text-white transition-colors">
                    Explore countries
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Why Compare?</h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">8+</div>
              <div className="text-slate-600">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">15+</div>
              <div className="text-slate-600">Data Points</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">Free</div>
              <div className="text-slate-600">Tuition Options</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-slate-600">Free to Use</div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>
            <strong>Disclaimer:</strong> Visa requirements change frequently. Always verify with official government sources before making decisions.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">© 2025 AbroadDreams. Information for reference only.</p>
        </div>
      </footer>
    </div>
  );
}
