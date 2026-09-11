import Link from 'next/link';
import FlagCarousel from '@/components/FlagCarousel';
import MotivationalQuotes from '@/components/MotivationalQuotes';

const features = [
  {
    icon: '🔍',
    title: 'Smart Filtering',
    description: 'Filter countries by spouse policy, PR pathway, budget, and region to find your perfect match.',
  },
  {
    icon: '⚖️',
    title: 'Side-by-Side Compare',
    description: 'Compare up to 4 countries at once. See tuition, work permits, and living costs in one view.',
  },
  {
    icon: '🔗',
    title: 'Official Sources',
    description: 'Every data point links to official government immigration websites for verified information.',
  },
  {
    icon: '📊',
    title: '15+ Data Points',
    description: 'Spouse rights, work permits, PR timeline, tuition fees, financial proof — all in one place.',
  },
];

const universities = [
  { name: 'Technical University of Munich', country: 'Germany', flag: '🇩🇪', color: 'from-emerald-500 to-emerald-700' },
  { name: 'University of Toronto', country: 'Canada', flag: '🇨🇦', color: 'from-red-500 to-red-700' },
  { name: 'University of Melbourne', country: 'Australia', flag: '🇦🇺', color: 'from-amber-500 to-amber-700' },
  { name: 'University of Oxford', country: 'United Kingdom', flag: '🇬🇧', color: 'from-indigo-500 to-indigo-700' },
  { name: 'Trinity College Dublin', country: 'Ireland', flag: '🇮🇪', color: 'from-green-600 to-green-800' },
  { name: 'University of Auckland', country: 'New Zealand', flag: '🇳🇿', color: 'from-teal-500 to-teal-700' },
];

const stats = [
  { value: '8+', label: 'Countries', color: 'text-emerald-600' },
  { value: '15+', label: 'Data Points', color: 'text-green-600' },
  { value: '100%', label: 'Free to Use', color: 'text-teal-600' },
  { value: '24/7', label: 'Always Available', color: 'text-emerald-700' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50" />

        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-green-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
                Trusted by 10,000+ students worldwide
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Your Dream{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Study Abroad
                </span>{' '}
                Journey Starts Here
              </h1>

              <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
                Compare visa requirements, tuition fees, work permits & PR pathways across 8+ top study destinations. Find the perfect country for your masters degree.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/explore?subcategory=masters"
                  className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1 text-lg"
                >
                  Explore Masters Programs
                </Link>
                <Link
                  href="/compare"
                  className="bg-white text-slate-700 px-8 py-4 rounded-full font-semibold border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 text-lg"
                >
                  Compare Countries
                </Link>
              </div>
            </div>

            {/* Right - Hero Image Grid */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {/* Card 1 - Student */}
                <div className="bg-white rounded-2xl shadow-xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="text-4xl mb-3">🎓</div>
                  <h3 className="font-bold text-slate-900 mb-1">Masters Programs</h3>
                  <p className="text-sm text-slate-500">Free tuition in Germany</p>
                  <div className="mt-3 flex items-center gap-1 text-emerald-600 text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    Start from €0
                  </div>
                </div>

                {/* Card 2 - Work */}
                <div className="bg-white rounded-2xl shadow-xl p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300 mt-8">
                  <div className="text-4xl mb-3">💼</div>
                  <h3 className="font-bold text-slate-900 mb-1">Work While Studying</h3>
                  <p className="text-sm text-slate-500">Up to 20 hrs/week</p>
                  <div className="mt-3 flex items-center gap-1 text-green-600 text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    Earn while you learn
                  </div>
                </div>

                {/* Card 3 - PR */}
                <div className="bg-white rounded-2xl shadow-xl p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="text-4xl mb-3">🏛️</div>
                  <h3 className="font-bold text-slate-900 mb-1">PR Pathway</h3>
                  <p className="text-sm text-slate-500">Get permanent residency</p>
                  <div className="mt-3 flex items-center gap-1 text-teal-600 text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    1-5 years to PR
                  </div>
                </div>

                {/* Card 4 - Spouse */}
                <div className="bg-white rounded-2xl shadow-xl p-6 transform -rotate-1 hover:rotate-0 transition-transform duration-300 mt-8">
                  <div className="text-4xl mb-3">👨‍👩‍👧</div>
                  <h3 className="font-bold text-slate-900 mb-1">Bring Your Spouse</h3>
                  <p className="text-sm text-slate-500">Family reunification</p>
                  <div className="mt-3 flex items-center gap-1 text-emerald-700 text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    Most countries allow
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-slate-600 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Country Flags Carousel */}
      <FlagCarousel />

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-2">
              Why AbroadDreams
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Decide
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We collect and organize all the important information so you can make an informed decision about your study abroad journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-xl hover:border-emerald-100 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivational Quotes */}
      <MotivationalQuotes />

      {/* University Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-2">
              Top Universities
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              World-Class Education Awaits
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These countries are home to some of the world&apos;s most prestigious universities. Start comparing to find your perfect fit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map((uni) => (
              <div
                key={uni.name}
                className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                {/* Gradient header */}
                <div className={`h-32 bg-gradient-to-br ${uni.color} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-30 group-hover:scale-125 transition-transform duration-500">
                      {uni.flag}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {uni.flag} {uni.country}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{uni.name}</h3>
                  <p className="text-sm text-slate-500">Top-ranked university in {uni.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-2">
              Simple Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How AbroadDreams Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Path',
                description: 'Select Master\'s or Bachelor\'s degree program to explore relevant visa options.',
                icon: '🎯',
              },
              {
                step: '02',
                title: 'Filter & Compare',
                description: 'Use filters for spouse policy, PR pathway, budget, and region. Compare up to 4 countries.',
                icon: '🔍',
              },
              {
                step: '03',
                title: 'Make Your Decision',
                description: 'Review detailed information for each country and start your application with confidence.',
                icon: '🚀',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl text-2xl font-bold mb-4">
                  {item.icon}
                </div>
                <div className="text-sm font-bold text-emerald-600 mb-2">Step {item.step}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-green-700 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Country?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Start comparing visa requirements, tuition fees, and work opportunities across 8+ countries. Your study abroad journey begins with a single click.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/explore?subcategory=masters"
              className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-lg"
            >
              Explore Now
            </Link>
            <Link
              href="/compare"
              className="bg-white/10 text-white px-8 py-4 rounded-full font-semibold border border-white/30 hover:bg-white/20 transition-all duration-300 text-lg"
            >
              Compare Countries
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
