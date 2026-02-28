import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  MapPin, 
  School, 
  Calendar, 
  Edit, 
  MoreVertical, 
  Heart, 
  MessageCircle, 
  Share2,
  Grid,
  List,
  Bookmark,
  Award,
  Users,
  LogOut
} from 'lucide-react';
import { POSTS } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('unibridge_user');
    if (userStr) {
      const userData = JSON.parse(userStr);
      setUser({
        ...userData,
        handle: `@${userData.name.toLowerCase().replace(/ /g, '_')}`,
        cover: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1200',
        bio: userData.bio || 'Aspiring student looking to connect and grow with the UniBridge community. 🇬🇧💻',
        location: userData.location || 'London, UK',
        joined: 'Joined Recently',
        stats: {
          posts: 0,
          followers: '0',
          following: 0,
          connections: 0
        }
      });
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('unibridge_token');
    localStorage.removeItem('unibridge_user');
    window.dispatchEvent(new Event('storage'));
    navigate('/signin');
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen bg-cream-dark/20"
    >
      <div className="relative h-64 lg:h-80 w-full overflow-hidden">
        <img
          alt="Cover"
          className="w-full h-full object-cover"
          src={user.cover}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute top-6 right-6 flex gap-3">
          <button onClick={handleLogout} className="p-2 rounded-full bg-red-500/20 backdrop-blur-md text-white hover:bg-red-500/40 transition-all border border-red-500/30 flex items-center gap-2 px-4">
            <LogOut className="w-5 h-5" />
            <span className="text-xs font-bold">Logout</span>
          </button>
          <button className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-all">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 lg:px-12">
        <div className="relative -mt-20 lg:-mt-24 mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="relative">
                <img
                  alt={user.name}
                  className="h-40 w-40 rounded-3xl object-cover border-8 border-cream-base shadow-2xl"
                  src={user.avatar}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-xl bg-primary border-4 border-cream-base flex items-center justify-center text-white shadow-lg">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <div className="pb-2">
                <h1 className="font-serif text-4xl font-bold text-text-main">{user.name}</h1>
                <p className="text-text-muted font-medium">{user.handle}</p>
              </div>
            </div>
            <div className="flex gap-3 pb-2">
              <Link to="/signin" className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-primary/20 bg-white text-sm font-bold text-primary hover:bg-emerald-50 transition-all shadow-sm">
                <Edit className="w-4 h-4" /> Edit Profile
              </Link>
              <button 
                onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Profile link copied!'); }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-emerald-900/10"
              >
                Share Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <aside className="space-y-6">
            <div className="glass-panel rounded-2xl p-6 bg-white/60 border-white/80 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-text-main mb-4">About Me</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-6">{user.bio}</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-text-muted">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-muted">
                  <School className="w-4 h-4 text-emerald-600" />
                  <span>{user.university}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-muted">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>{user.joined}</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100">
                  <p className="text-2xl font-bold text-primary">{user.stats.followers}</p>
                  <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest">Followers</p>
                </div>
                <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100">
                  <p className="text-2xl font-bold text-blue-600">{user.stats.connections}</p>
                  <p className="text-[10px] text-blue-700 font-bold uppercase tracking-widest">Connections</p>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 bg-white/60 border-white/80 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-text-main mb-4">Badges</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Early Adopter', color: 'bg-blue-100 text-blue-700' },
                  { name: 'Visa Expert', color: 'bg-emerald-100 text-emerald-700' },
                  { name: 'Top Connector', color: 'bg-purple-100 text-purple-700' },
                ].map((badge) => (
                  <span key={badge.name} className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${badge.color}`}>
                    {badge.name}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <main className="lg:col-span-2 space-y-6">
            <div className="glass-panel rounded-2xl p-2 bg-white/60 border-white/80 shadow-sm flex items-center gap-2">
              {[
                { name: 'Posts', icon: Grid, active: true },
                { name: 'Replies', icon: MessageCircle },
                { name: 'Media', icon: List },
                { name: 'Saved', icon: Bookmark },
              ].map((tab) => (
                <button
                  key={tab.name}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    tab.active 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-text-muted hover:bg-white/40'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {POSTS.map((post) => (
                <div key={post.id} className="glass-panel rounded-2xl overflow-hidden bg-white/60 border-white/80 shadow-sm">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-3">
                        <img
                          alt={user.name}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                          src={user.avatar}
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-bold text-text-main">{user.name}</h4>
                          <p className="text-[10px] text-text-muted uppercase tracking-widest">{post.time}</p>
                        </div>
                      </div>
                      <button className="p-2 rounded-lg hover:bg-white/80 text-text-muted transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-text-main mb-2">{post.title}</h3>
                      <p className="text-sm text-text-muted leading-relaxed">{post.content}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-emerald-900/5">
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-text-muted hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                          <span className="text-xs font-bold">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-xs font-bold">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-text-muted hover:text-blue-500 transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </motion.div>
  );
}
