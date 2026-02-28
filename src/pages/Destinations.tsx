import React from 'react';
import { motion } from 'motion/react';
import { Search, Grid, List, Heart, School, CreditCard, Briefcase, Sun, ChevronLeft, ChevronRight } from 'lucide-react';
import { DESTINATIONS } from '../constants';
import { Link } from 'react-router-dom';

export default function Destinations() {
  const [search, setSearch] = React.useState('');
  const [selectedRegions, setSelectedRegions] = React.useState<string[]>(['Europe']);

  const filteredDestinations = DESTINATIONS.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(search.toLowerCase()) || 
                         dest.region.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(dest.region);
    return matchesSearch && matchesRegion;
  });

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      <section className="relative px-6 py-12 lg:px-20 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-text-main md:text-6xl drop-shadow-sm mb-6">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800">Global Destinations</span>
            </h1>
            <p className="text-lg text-text-muted font-light leading-relaxed">
              Discover the perfect country for your studies. Compare living costs, university rankings, and student lifestyle across the globe.
            </p>
          </div>
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-emerald-100 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative glass-panel rounded-full p-2 flex items-center bg-white/60 border-white shadow-lg transition-all focus-within:ring-2 focus-within:ring-emerald-200">
              <Search className="text-text-muted ml-4 w-6 h-6" />
              <input
                className="w-full bg-transparent border-none text-text-main placeholder-text-muted/70 focus:ring-0 px-4 text-lg"
                placeholder="Search for a country, region, or university..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="bg-primary text-white rounded-full px-6 py-2.5 font-semibold text-sm hover:bg-primary-dark transition-colors shadow-md">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-20">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
            <div className="glass-panel rounded-2xl p-6 bg-white/40 border-white/60 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl font-bold text-text-main">Filters</h3>
                <button 
                  onClick={() => { setSelectedRegions([]); setSearch(''); }}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Reset
                </button>
              </div>
              
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-text-main uppercase tracking-wider mb-4">Region</h4>
                <div className="space-y-3">
                  {['North America', 'Europe', 'Asia Pacific', 'Oceania'].map((region) => (
                    <label key={region} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4"
                        type="checkbox"
                        checked={selectedRegions.includes(region)}
                        onChange={() => toggleRegion(region)}
                      />
                      <span className="text-sm text-text-muted group-hover:text-text-main transition-colors">{region}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-text-main uppercase tracking-wider mb-4">Avg. Tuition (USD)</h4>
                <div className="space-y-3">
                  {['< $10k / year', '$10k - $25k / year', '> $25k / year'].map((range) => (
                    <label key={range} className="flex items-center gap-3 cursor-pointer group">
                      <input className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4" type="checkbox" />
                      <span className="text-sm text-text-muted group-hover:text-text-main transition-colors">{range}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-text-main uppercase tracking-wider mb-4">Sort By</h4>
                <select className="w-full rounded-lg border-gray-200 bg-white/50 text-sm text-text-muted focus:border-primary focus:ring-primary p-2.5 outline-none">
                  <option>Most Popular</option>
                  <option>Tuition: Low to High</option>
                  <option>Safety Rating</option>
                </select>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-text-muted">Showing <span className="font-bold text-text-main">{filteredDestinations.length}</span> destinations</p>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-white/60 text-primary border border-white hover:bg-white transition-all shadow-sm">
                  <Grid className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg bg-transparent text-text-muted border border-transparent hover:bg-white/40 transition-all">
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {filteredDestinations.map((dest) => (
                <Link 
                  key={dest.id} 
                  to={`/universities?country=${dest.name}`}
                  className="group relative h-[380px] w-full cursor-pointer overflow-hidden rounded-2xl border border-white/50 shadow-glass transition-all hover:scale-[1.01] hover:shadow-xl"
                >
                  <img
                    alt={dest.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={dest.image}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                  <div className="absolute top-4 right-4 z-10">
                    <button 
                      onClick={(e) => { e.preventDefault(); /* Handle like */ }}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/40 transition-colors shadow-sm"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <div className="glass-panel rounded-xl p-5 bg-white/20 backdrop-blur-md border border-white/30">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-white drop-shadow-md">{dest.name}</h3>
                          <p className="text-sm text-emerald-100 font-medium">{dest.region}</p>
                        </div>
                        <span className="text-3xl drop-shadow-sm">{dest.flag}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-white/90 mt-4 pt-4 border-t border-white/20">
                        <span className="flex items-center gap-1.5"><School className="w-3.5 h-3.5" /> {dest.universities} Univs</span>
                        <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> {dest.tuition}</span>
                        <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Post-study Visa</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/40 bg-white/40 text-text-muted hover:bg-white/60 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold shadow-md shadow-emerald-500/20">1</button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/40 bg-white/40 text-text-main font-medium hover:bg-white/60 transition-colors">2</button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/40 bg-white/40 text-text-main font-medium hover:bg-white/60 transition-colors">3</button>
                <span className="text-text-muted px-2">...</span>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/40 bg-white/40 text-text-muted hover:bg-white/60 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
