import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Star, 
  School, 
  Trophy, 
  Clock, 
  Users, 
  ArrowLeft, 
  Globe, 
  BookOpen, 
  GraduationCap, 
  Building2,
  Calendar,
  ChevronRight,
  Heart,
  Share2
} from 'lucide-react';
import { UNIVERSITIES, CONNECTIONS } from '../constants';
import { api } from '../services/api';

export default function UniversityDetail() {
  const { id } = useParams();
  const university = UNIVERSITIES.find(u => u.id === id);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('unibridge_token');
    if (token && id) {
      api.getSavedUniversities(token).then(saved => {
        setIsSaved(saved.includes(id));
      }).catch(console.error);
    }
  }, [id]);

  const handleToggleSave = async () => {
    const token = localStorage.getItem('unibridge_token');
    if (!token || !id) return;

    try {
      if (isSaved) {
        await api.unsaveUniversity(id, token);
        setIsSaved(false);
      } else {
        await api.saveUniversity(id, token);
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Failed to toggle save:', err);
    }
  };
  
  // Find connections from this university
  const universityConnections = CONNECTIONS.filter(m => m.university.includes(university?.name || ''));

  if (!university) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h2 className="text-3xl font-serif font-bold text-text-main mb-4">University Not Found</h2>
        <Link to="/universities" className="text-primary font-bold flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Universities
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <img
          src={university.image}
          alt={university.name}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 lg:p-12">
          <div className="mx-auto max-w-7xl">
            <Link to="/universities" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-5 h-5" /> Back to Directory
            </Link>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {university.tags.map((tag, i) => (
                    <span key={i} className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white drop-shadow-lg">{university.name}</h1>
                <p className="flex items-center gap-2 text-emerald-100 mt-4 text-lg">
                  <MapPin className="w-5 h-5" /> {university.location}
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleToggleSave}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-all ${
                    isSaved 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-white text-primary hover:bg-emerald-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Saved' : 'Save'}
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary-dark transition-all">
                  <Share2 className="w-5 h-5" /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 py-12 lg:px-20 bg-cream-base">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-12">
              <div className="glass-panel rounded-3xl p-8 bg-white/60 border-white shadow-sm">
                <h2 className="font-serif text-3xl font-bold text-text-main mb-6">About the University</h2>
                <p className="text-text-muted leading-relaxed text-lg mb-8">
                  {university.name} is a world-renowned institution located in {university.location}. 
                  Known for its excellence in research and teaching, it offers a vibrant campus life 
                  and a diverse community of students from over 150 countries.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Rating</span>
                    <div className="flex items-center gap-1 text-text-main font-bold">
                      <Star className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                      {university.rating}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Courses</span>
                    <div className="flex items-center gap-1 text-text-main font-bold">
                      <BookOpen className="w-5 h-5 text-emerald-600" />
                      {university.courses}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Connections</span>
                    <div className="flex items-center gap-1 text-text-main font-bold">
                      <Users className="w-5 h-5 text-emerald-600" />
                      {university.mentors}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Est.</span>
                    <div className="flex items-center gap-1 text-text-main font-bold">
                      <Building2 className="w-5 h-5 text-emerald-600" />
                      1850
                    </div>
                  </div>
                </div>
              </div>

              {/* Connections from this University */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-3xl font-bold text-text-main">Student Connections</h2>
                  <Link to={`/connections?university=${university.name}`} className="text-primary font-bold text-sm hover:underline">View all</Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {universityConnections.map(connection => (
                    <div key={connection.id} className="glass-panel rounded-2xl p-6 bg-white/40 border-white/60 flex gap-4 hover:shadow-md transition-all group">
                      <img
                        src={connection.avatar}
                        alt={connection.name}
                        className="h-16 w-16 rounded-xl object-cover shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-text-main group-hover:text-primary transition-colors">{connection.name}</h4>
                        <p className="text-xs text-text-muted mb-2">{connection.major}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-xs font-bold text-text-main">
                            <Star className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                            {connection.rating}
                          </div>
                          <span className="text-xs text-emerald-600 font-bold">${connection.price}/hr</span>
                        </div>
                      </div>
                      <Link to={`/connections?id=${connection.id}`} className="self-center p-2 rounded-lg bg-emerald-50 text-primary hover:bg-primary hover:text-white transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-8">
              <div className="glass-panel rounded-3xl p-8 bg-emerald-900 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <h3 className="font-serif text-2xl font-bold mb-6 relative z-10">Quick Stats</h3>
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-xs text-emerald-200 uppercase font-bold tracking-wider">International Students</p>
                      <p className="text-lg font-bold">35%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-xs text-emerald-200 uppercase font-bold tracking-wider">Employment Rate</p>
                      <p className="text-lg font-bold">92%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-xs text-emerald-200 uppercase font-bold tracking-wider">Next Intake</p>
                      <p className="text-lg font-bold">September 2024</p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-8 py-4 bg-white text-emerald-900 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-lg">
                  Apply for Guidance
                </button>
              </div>

              <div className="glass-panel rounded-3xl p-8 bg-white/60 border-white shadow-sm">
                <h3 className="font-serif text-xl font-bold text-text-main mb-4">Location</h3>
                <div className="aspect-video rounded-2xl bg-gray-200 overflow-hidden relative mb-4">
                   <img 
                    src={`https://picsum.photos/seed/${university.id}map/400/200`} 
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="bg-primary text-white p-2 rounded-full shadow-glow">
                       <MapPin className="w-6 h-6" />
                     </div>
                   </div>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">
                  Located in the heart of {university.location.split(',')[0]}, the campus is easily accessible by public transport and surrounded by vibrant student hubs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
