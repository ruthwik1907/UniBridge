import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Rss, 
  Globe, 
  School, 
  Search, 
  Image, 
  Video, 
  Smile, 
  MoreHorizontal, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  TrendingUp,
  Plus,
  BadgeCheck
} from 'lucide-react';
import { POSTS } from '../constants';

export default function Community() {
  const [selectedCategory, setSelectedCategory] = React.useState('Feed');
  const [search, setSearch] = React.useState('');

  const filteredPosts = POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'Feed' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                         post.content.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen bg-cream-dark/30"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 py-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-6">
            <div className="glass-panel rounded-2xl p-4 bg-white/60 border-white/80 sticky top-28">
              <nav className="space-y-1">
                {[
                  { name: 'Feed', icon: Rss },
                  { name: 'Accommodation', icon: Globe },
                  { name: 'Visa & Immigration', icon: School },
                  { name: 'Trending', icon: TrendingUp },
                  { name: 'Saved Posts', icon: Bookmark },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setSelectedCategory(item.name)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      selectedCategory === item.name 
                        ? 'bg-primary text-white shadow-lg shadow-emerald-900/10' 
                        : 'text-text-muted hover:bg-white/80 hover:text-primary'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </button>
                ))}
              </nav>
              
              <div className="mt-8 pt-6 border-t border-emerald-900/5">
                <h4 className="px-4 text-xs font-bold text-text-muted uppercase tracking-widest mb-4">My Communities</h4>
                <div className="space-y-2">
                  {['UK Students', 'CS Majors', 'NYU Housing'].map((comm) => (
                    <button key={comm} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-text-muted hover:bg-white/80 hover:text-text-main transition-all">
                      <div className="h-6 w-6 rounded bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700">
                        {comm[0]}
                      </div>
                      {comm}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Feed */}
          <main className="flex-1 max-w-2xl space-y-6">
            {/* Create Post */}
            <div className="glass-panel rounded-2xl p-6 bg-white/60 border-white/80 shadow-sm">
              <div className="flex gap-4">
                <img
                  alt="User"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <Link to="/signin" className="block w-full text-left px-4 py-3 rounded-xl bg-white/40 border border-white/60 text-text-muted hover:bg-white/60 transition-all">
                    What's on your mind, Alex?
                  </Link>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1">
                      <Link to="/signin" className="p-2 rounded-lg hover:bg-emerald-50 text-emerald-600 transition-colors flex items-center gap-2 text-xs font-bold">
                        <Image className="w-5 h-5" /> Photo
                      </Link>
                      <Link to="/signin" className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors flex items-center gap-2 text-xs font-bold">
                        <Video className="w-5 h-5" /> Video
                      </Link>
                      <Link to="/signin" className="p-2 rounded-lg hover:bg-orange-50 text-orange-600 transition-colors flex items-center gap-2 text-xs font-bold">
                        <Smile className="w-5 h-5" /> Feeling
                      </Link>
                    </div>
                    <Link to="/signin" className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/10 hover:bg-primary-dark transition-all">
                      Post
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            {filteredPosts.map((post) => (
              <div key={post.id} className="glass-panel rounded-2xl overflow-hidden bg-white/60 border-white/80 shadow-sm">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-3">
                      <img
                        alt={post.author.name}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                        src={post.author.avatar}
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-text-main">{post.author.name}</h4>
                          {post.author.isVerified && <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />}
                          {post.author.isVerified && <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Verified</span>}
                        </div>
                        <p className="text-xs text-text-muted">{post.author.university} • {post.time}</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-white/80 text-text-muted transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-lg bg-emerald-50 text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-text-main mb-2">{post.title}</h3>
                    <p className="text-text-muted leading-relaxed">{post.content}</p>
                  </div>

                  {post.images && post.images.length > 0 && (
                    <div className={`grid gap-2 mb-4 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {post.images.map((img, i) => (
                        <img
                          key={i}
                          alt="Post content"
                          className="w-full h-64 object-cover rounded-xl shadow-inner"
                          src={img}
                          referrerPolicy="no-referrer"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-emerald-900/5">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-text-muted hover:text-red-500 transition-colors group">
                        <Heart className="w-5 h-5 group-hover:fill-red-500" />
                        <span className="text-sm font-bold">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors group">
                        <MessageCircle className="w-5 h-5 group-hover:fill-primary/10" />
                        <span className="text-sm font-bold">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-text-muted hover:text-blue-500 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                    <button className="text-text-muted hover:text-primary transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </main>

          {/* Right Sidebar */}
          <aside className="hidden xl:block w-80 shrink-0 space-y-6">
            <div className="glass-panel rounded-2xl p-6 bg-white/60 border-white/80 shadow-sm">
              <h4 className="font-serif text-xl font-bold text-text-main mb-4">Trending Topics</h4>
              <div className="space-y-4">
                {[
                  { tag: '#UKVisa2024', posts: '1.2k posts' },
                  { tag: '#ScholarshipTips', posts: '850 posts' },
                  { tag: '#HousingLondon', posts: '2.4k posts' },
                  { tag: '#IELTSPreparation', posts: '3.1k posts' },
                ].map((trend) => (
                  <div key={trend.tag} className="group cursor-pointer">
                    <p className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">{trend.tag}</p>
                    <p className="text-xs text-text-muted">{trend.posts}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 text-sm font-bold text-primary hover:underline">Show more</button>
            </div>

            <div className="glass-panel rounded-2xl p-6 bg-white/60 border-white/80 shadow-sm">
              <h4 className="font-serif text-xl font-bold text-text-main mb-4">Who to follow</h4>
              <div className="space-y-4">
                {[
                  { name: 'Dr. Emily Watson', role: 'Education Consultant', avatar: 'https://picsum.photos/seed/emily/100/100' },
                  { name: 'Global Student Network', role: 'Community', avatar: 'https://picsum.photos/seed/gsn/100/100' },
                ].map((user) => (
                  <div key={user.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                        src={user.avatar}
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-sm font-bold text-text-main">{user.name}</p>
                        <p className="text-[10px] text-text-muted">{user.role}</p>
                      </div>
                    </div>
                    <button className="p-1.5 rounded-full bg-emerald-50 text-primary hover:bg-primary hover:text-white transition-all">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
