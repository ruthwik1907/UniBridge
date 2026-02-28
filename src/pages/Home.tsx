import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, PlayCircle, Globe, School, Users, MessageCircle, Check, UserCheck, ShieldCheck, Leaf, Search } from 'lucide-react';
import { DESTINATIONS } from '../constants';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:px-20 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-8 text-center lg:text-left z-10">
              <div className="inline-flex w-fit items-center gap-2 self-center rounded-full bg-white/40 border border-white/60 px-4 py-1.5 text-xs font-semibold text-emerald-700 backdrop-blur-md lg:self-start shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                Connect with 5,000+ connections today
              </div>
              <h1 className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-text-main md:text-6xl lg:text-7xl drop-shadow-sm">
                Your Global Future, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800">Crystal Clear</span>
              </h1>
              <p className="text-lg text-text-muted font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                Connect with the world, rooted in community. Get honest advice, university insights, and visa guidance from students living your dream.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link to="/destinations" className="flex h-14 items-center justify-center gap-2 rounded-xl bg-primary text-white px-8 text-base font-bold transition-all hover:bg-primary-dark shadow-lg shadow-emerald-900/10 hover:shadow-emerald-900/20">
                  Explore Countries
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/community" className="flex h-14 items-center justify-center gap-2 rounded-xl border border-primary/20 bg-white/50 px-8 text-base font-bold text-text-main backdrop-blur-md transition-colors hover:bg-white/80 hover:border-primary/40">
                  <PlayCircle className="w-5 h-5 text-primary" />
                  Watch Demo
                </Link>
              </div>
              <div className="mt-6 flex items-center justify-center gap-4 lg:justify-start">
                <div className="glass-panel rounded-full p-2 flex items-center gap-3 pr-6 bg-white/40 border-white/60">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <img
                        key={i}
                        alt={`Connection ${i}`}
                        className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                        src={`https://picsum.photos/seed/mentor${i}/100/100`}
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-bold block text-text-main">2k+ Connections</span>
                    <span className="text-emerald-600 text-xs font-medium">Online now</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative hidden lg:block h-[600px]">
              <motion.div 
                initial={{ y: 20, rotate: 2 }}
                animate={{ y: 0, rotate: 2 }}
                className="absolute right-0 top-10 w-3/4 z-10"
              >
                <div className="glass-panel rounded-2xl p-3 transform hover:rotate-0 transition-transform duration-700 bg-white/30 border-white shadow-xl">
                  <img
                    alt="City View"
                    className="aspect-[4/5] w-full rounded-xl object-cover shadow-inner"
                    src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-xl border border-white/50 shadow-sm">
                    <h3 className="font-serif text-xl font-bold text-text-main">Urban Campus Life</h3>
                    <p className="text-xs text-text-muted mt-1">Chicago, USA</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ y: -20, rotate: -3 }}
                animate={{ y: 0, rotate: -3 }}
                className="absolute left-0 bottom-20 w-3/5 z-20"
              >
                <div className="glass-panel rounded-2xl p-3 transform hover:rotate-0 transition-transform duration-700 bg-white/30 border-white shadow-xl">
                  <img
                    alt="Nature Campus"
                    className="aspect-[4/3] w-full rounded-xl object-cover shadow-inner"
                    src="https://images.unsplash.com/photo-1543906965-f9520aa2ed8a?auto=format&fit=crop&q=80&w=600"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 right-6 flex items-center gap-2 bg-emerald-500/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                    <Leaf className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white">Eco-Certified</span>
                  </div>
                </div>
              </motion.div>
              
              <div className="absolute top-1/2 left-1/3 z-30 animate-bounce">
                <div className="glass-panel rounded-xl px-5 py-3 flex items-center gap-3 bg-white/90 border-white shadow-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-main">Visa Approved</p>
                    <p className="text-xs text-emerald-600 font-medium">Just now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-white/40 bg-white/20 backdrop-blur-sm py-10 shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-10 px-6 lg:justify-between lg:px-20">
          {[
            { label: 'Countries', value: '50+', icon: Globe, color: 'text-emerald-600' },
            { label: 'Universities', value: '1,200+', icon: School, color: 'text-blue-600' },
            { label: 'Connections', value: '15k+', icon: Users, color: 'text-purple-600' },
            { label: 'Support', value: '24/7', icon: MessageCircle, color: 'text-orange-500' },
          ].map((stat, idx) => (
            <div key={idx} className="flex items-center gap-4 group">
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/60 border border-white ${stat.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-text-main">{stat.value}</p>
                <p className="text-sm text-text-muted uppercase tracking-wider font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Destinations Preview */}
      <section className="px-6 py-24 lg:px-20 relative">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold tracking-tight text-text-main mb-2">Explore the World</h2>
              <p className="text-lg text-text-muted">Where will your journey take you? Discover top study hubs.</p>
            </div>
            <Link to="/destinations" className="group flex items-center text-sm font-bold text-emerald-700 hover:text-emerald-800 bg-white/60 px-4 py-2 rounded-full border border-emerald-100 backdrop-blur-sm transition-all hover:bg-white/80 hover:shadow-sm">
              View all destinations 
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-[300px]">
            {DESTINATIONS.slice(0, 4).map((dest, idx) => (
              <Link 
                key={dest.id}
                to={`/universities?country=${dest.name}`}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/50 shadow-glass transition-all hover:scale-[1.01] hover:shadow-xl ${idx === 0 ? 'lg:col-span-2' : ''}`}
              >
                <img
                  alt={dest.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={dest.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="glass-panel inline-block rounded-xl px-6 py-4 w-full bg-white/20 backdrop-blur-md border border-white/30">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="font-serif text-3xl font-bold text-white mb-1 drop-shadow-md">{dest.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/90 font-medium">
                          <span className="flex items-center gap-1"><School className="w-4 h-4 text-emerald-200" /> {dest.universities} Univs</span>
                          {dest.mentors && <span className="flex items-center gap-1"><Users className="w-4 h-4 text-emerald-200" /> {dest.mentors} Connections</span>}
                        </div>
                      </div>
                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-md border border-white/40 hover:bg-white/40 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative px-6 py-24 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl z-0"></div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto mb-20 max-w-2xl text-center">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold tracking-tight text-text-main">How UniBridge Works</h2>
            <p className="mt-4 text-lg text-text-muted">Three simple steps to connect with your future.</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: 1, title: 'Find Your Match', desc: 'Search for connections by university, course, country, or shared interests using our smart filters.', icon: Search, color: 'text-blue-600', bg: 'bg-blue-50/50' },
              { step: 2, title: 'Start Chatting', desc: 'Directly message students from your dream university. No private details needed.', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
              { step: 3, title: 'Get Insights', icon: MessageCircle, desc: 'Connect via our secure platform. Ask questions, get visa tips, and make a friend.', color: 'text-orange-500', bg: 'bg-orange-50/50' },
            ].map((item, idx) => (
              <div key={idx} className="glass-panel glass-card-hover group relative flex flex-col items-center rounded-2xl p-8 text-center bg-white/40 border-white/60">
                <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${item.bg} border border-white shadow-sm relative overflow-hidden`}>
                  <item.icon className={`w-10 h-10 ${item.color} relative z-10`} />
                </div>
                <h3 className="mb-3 text-2xl font-serif font-bold text-text-main">{item.step}. {item.title}</h3>
                <p className="text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="px-6 py-24 lg:px-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-emerald-900 to-teal-900 backdrop-blur-xl border border-white/20 px-6 py-16 shadow-2xl md:px-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="grid items-center gap-12 lg:grid-cols-2 relative z-10">
            <div className="order-2 lg:order-1">
              <h2 className="font-serif text-4xl font-bold tracking-tight text-white md:text-5xl mb-6">Your Safety is Our Priority</h2>
              <p className="text-lg text-emerald-50 mb-8 leading-relaxed">Every connection on UniBridge goes through a rigorous verification process. We verify student IDs, university emails, and enrollment status so you can connect with confidence.</p>
              <div className="flex flex-col gap-4">
                <div className="glass-panel flex items-center gap-4 rounded-xl px-6 py-4 transition-transform hover:translate-x-2 bg-white/10 border-white/20">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">ID Verified</h4>
                    <p className="text-sm text-emerald-100/80">Government issued ID verification</p>
                  </div>
                </div>
                <div className="glass-panel flex items-center gap-4 rounded-xl px-6 py-4 transition-transform hover:translate-x-2 bg-white/10 border-white/20">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400/20 text-blue-300">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Academic Status Checked</h4>
                    <p className="text-sm text-emerald-100/80">Official university email confirmation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative h-80 w-80">
                <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 blur-[60px] animate-pulse"></div>
                <div className="relative flex h-full w-full items-center justify-center rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-glass">
                  <ShieldCheck className="w-32 h-32 text-emerald-100 drop-shadow-[0_0_15px_rgba(209,250,229,0.5)]" />
                  <div className="absolute -right-6 -top-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-glow animate-bounce border border-white/30">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20 pt-10 px-6 lg:px-20">
        <div className="glass-panel mx-auto max-w-5xl rounded-3xl p-12 text-center border border-white/60 bg-white/40 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-text-main md:text-5xl relative z-10">Ready to start your journey?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted relative z-10">Join thousands of students who found their dream university with the help of a connection.</p>
          <div className="mt-10 flex justify-center gap-4 relative z-10">
            <Link to="/signup" className="rounded-xl bg-primary text-white px-10 py-4 text-lg font-bold transition-all hover:bg-primary-dark hover:scale-105 shadow-lg shadow-emerald-500/20">
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
