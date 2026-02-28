import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Star, School, ChevronLeft, ChevronRight, Filter, Trophy, Clock, Heart } from 'lucide-react';
import { UNIVERSITIES } from '../constants';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../services/api';

export default function Universities() {
  const [searchParams] = useSearchParams();
  const countryParam = searchParams.get('country');
  
  const [search, setSearch] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedRanking, setSelectedRanking] = useState<string>('All Universities');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [savedUniversities, setSavedUniversities] = useState<string[]>([]);

  useEffect(() => {
    if (countryParam) {
      setSearch(countryParam);
    }
    
    const token = localStorage.getItem('unibridge_token');
    if (token) {
      api.getSavedUniversities(token).then(setSavedUniversities).catch(console.error);
    }
  }, [countryParam]);

  const handleToggleSave = async (e: React.MouseEvent, uniId: string) => {
    e.preventDefault();
    const token = localStorage.getItem('unibridge_token');
    if (!token) return;

    try {
      if (savedUniversities.includes(uniId)) {
        await api.unsaveUniversity(uniId, token);
        setSavedUniversities(prev => prev.filter(id => id !== uniId));
      } else {
        await api.saveUniversity(uniId, token);
        setSavedUniversities(prev => [...prev, uniId]);
      }
    } catch (err) {
      console.error('Failed to toggle save:', err);
    }
  };

  const filteredUniversities = UNIVERSITIES.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(search.toLowerCase()) || 
                         uni.location.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(uni.location);
    const matchesRanking = selectedRanking === 'All Universities' || 
                          (selectedRanking === 'Russell Group' && uni.tags.includes('Russell Group')) ||
                          (selectedRanking === 'Top 10 Global' && uni.tags.includes('Top 10 Global'));
    return matchesSearch && matchesLocation && matchesRanking;
  });

  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev => 
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  const FilterContent = ({ isMobile = false }) => (
    <div className={`glass-panel rounded-2xl p-6 ${!isMobile ? 'sticky top-28' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl font-bold text-text-main">Filters</h3>
        <button 
          onClick={() => { setSelectedLocations([]); setSelectedRanking('All Universities'); setSearch(''); }}
          className="text-xs font-medium text-emerald-600 hover:text-emerald-800"
        >
          Reset All
        </button>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
          <MapPin className="text-emerald-600 w-4 h-4" /> Location
        </h4>
        <div className="space-y-2">
          {['London, United Kingdom', 'Oxford, United Kingdom', 'Cambridge, United Kingdom', 'Melbourne, Australia', 'Amsterdam, Netherlands', 'Delft, Netherlands'].map((loc) => (
            <label key={loc} className="flex items-center gap-3 cursor-pointer group">
              <input 
                className="rounded border-gray-300 text-primary focus:ring-primary bg-white/50" 
                type="checkbox" 
                checked={selectedLocations.includes(loc)}
                onChange={() => toggleLocation(loc)}
              />
              <span className="text-sm text-text-muted group-hover:text-text-main transition-colors">{loc.split(',')[0]}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="mb-6 border-t border-gray-200/50 pt-6">
        <h4 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
          <Trophy className="text-emerald-600 w-4 h-4" /> Ranking
        </h4>
        <div className="space-y-2">
          {['Top 10 Global', 'Russell Group', 'All Universities'].map((rank) => (
            <label key={rank} className="flex items-center gap-3 cursor-pointer group">
              <input 
                className="border-gray-300 text-primary focus:ring-primary bg-white/50" 
                name="ranking" 
                type="radio" 
                checked={selectedRanking === rank}
                onChange={() => setSelectedRanking(rank)}
              />
              <span className="text-sm text-text-muted group-hover:text-text-main transition-colors">{rank}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-10 lg:px-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-sm text-emerald-700 font-medium">
              <MapPin className="w-4 h-4" />
              <span>Global Directory</span>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-text-main">Universities</h1>
            <p className="mt-2 text-text-muted max-w-2xl text-lg">Discover world-class institutions, connect with current students, and find your perfect campus.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
              <input
                className="pl-10 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl text-sm focus:ring-primary focus:border-primary w-full md:w-64 shadow-sm placeholder-gray-400"
                placeholder="Search university..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsFilterDrawerOpen(true)}
              className="p-2.5 bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl hover:bg-white text-text-muted shadow-sm lg:hidden"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-72 shrink-0 space-y-6">
            <FilterContent />
            <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 to-teal-900/90 z-0"></div>
              <div className="relative z-10">
                <School className="text-emerald-300 w-8 h-8 mb-3" />
                <h4 className="font-serif text-xl font-bold text-white mb-2">Need Guidance?</h4>
                <p className="text-emerald-100 text-sm mb-4">Talk to a connection from your dream university today.</p>
                <Link to="/connections" className="block w-full py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white text-sm font-bold hover:bg-white/30 transition-colors text-center">
                  Find a Connection
                </Link>
              </div>
            </div>
          </aside>

          <section className="flex-1">
            {filteredUniversities.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                {filteredUniversities.map((uni) => (
                  <Link 
                    key={uni.id} 
                    to={`/universities/${uni.id}`}
                    className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        alt={uni.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={uni.image}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        {uni.tags.map((tag, i) => (
                          <span key={i} className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-emerald-800 shadow-sm border border-white/50">
                            {tag.includes('1') ? <Trophy className="w-3.5 h-3.5 mr-1" /> : <Clock className="w-3.5 h-3.5 mr-1" />}
                            {tag}
                          </span>
                        ))}
                        <button 
                          onClick={(e) => handleToggleSave(e, uni.id)}
                          className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-colors ${
                            savedUniversities.includes(uni.id) 
                              ? 'bg-red-500 text-white' 
                              : 'bg-white/30 text-white hover:bg-white hover:text-red-500'
                          }`}
                        >
                          <Heart className={`w-4.5 h-4.5 ${savedUniversities.includes(uni.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-white/75 backdrop-blur-md border-t border-white/50 -mt-12 relative z-10 flex flex-col flex-1 p-5 rounded-t-2xl mx-2 mb-2 rounded-b-xl shadow-sm">
                      <div className="mb-3">
                        <h3 className="font-serif text-2xl font-bold text-text-main leading-tight">{uni.name}</h3>
                        <p className="text-sm text-text-muted flex items-center gap-1 mt-1">
                          <MapPin className="w-4 h-4" /> {uni.location}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white/50 rounded-lg p-2 border border-white/60">
                          <p className="text-xs text-text-muted uppercase tracking-wider">Rating</p>
                          <div className="flex items-center gap-1">
                            <Star className="text-emerald-600 w-4 h-4 fill-emerald-600" />
                            <span className="font-bold text-text-main">{uni.rating}</span>
                          </div>
                        </div>
                        <div className="bg-white/50 rounded-lg p-2 border border-white/60">
                          <p className="text-xs text-text-muted uppercase tracking-wider">Courses</p>
                          <span className="font-bold text-text-main">{uni.courses}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/40">
                        <div className="flex -space-x-2">
                          {[1, 2].map((i) => (
                            <img
                              key={i}
                              alt="Student"
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                              src={`https://picsum.photos/seed/student${uni.id}${i}/100/100`}
                              referrerPolicy="no-referrer"
                            />
                          ))}
                          <div className="flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white bg-emerald-100 text-[10px] font-bold text-emerald-800">
                            +{uni.mentors}
                          </div>
                        </div>
                        <span className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors shadow-lg shadow-emerald-900/10">
                          View Details
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 glass-panel rounded-3xl bg-white/40 border-white/60">
                <div className="h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center text-primary mb-6">
                  <Search className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-text-main mb-2">No Universities Found</h3>
                <p className="text-text-muted text-center max-w-md px-6">
                  We couldn't find any universities matching your current filters. Try resetting them or searching for something else.
                </p>
                <button 
                  onClick={() => { setSelectedLocations([]); setSelectedRanking('All Universities'); setSearch(''); }}
                  className="mt-8 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-cream-base rounded-t-[32px] z-[70] p-6 shadow-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-8" />
              <FilterContent isMobile />
              <button 
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full mt-6 py-4 bg-primary text-white rounded-xl font-bold shadow-lg"
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
