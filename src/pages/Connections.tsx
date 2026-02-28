import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Star, MessageCircle, Send, Phone, Video, MoreVertical, Check, CheckCheck, User, Globe, GraduationCap, Briefcase, ChevronRight } from 'lucide-react';
import { CONNECTIONS } from '../constants';
import { Link, useSearchParams } from 'react-router-dom';
import { Connection, Message } from '../types';
import { api } from '../services/api';

export default function Connections() {
  const [searchParams] = useSearchParams();
  const initialConnectionId = searchParams.get('id');

  const [search, setSearch] = useState('');
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(
    initialConnectionId ? CONNECTIONS.find(c => c.id === initialConnectionId) || CONNECTIONS[0] : CONNECTIONS[0]
  );
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('unibridge_user');
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }
  }, []);

  useEffect(() => {
    if (selectedConnection && currentUser) {
      const token = localStorage.getItem('unibridge_token');
      if (token) {
        api.getMessages(selectedConnection.id, token).then(setMessages).catch(console.error);
      }
    }
  }, [selectedConnection, currentUser]);

  const filteredConnections = CONNECTIONS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.university.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedConnection || !currentUser) return;

    const token = localStorage.getItem('unibridge_token');
    if (!token) return;

    try {
      const newMessage = await api.sendMessage(selectedConnection.id, messageText, token);
      setMessages(prev => [...prev, newMessage]);
      setMessageText('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-[calc(100vh-64px)] overflow-hidden bg-cream-base"
    >
      {/* Sidebar - Connections List */}
      <aside className="w-full md:w-80 lg:w-96 border-r border-white/40 bg-white/40 backdrop-blur-xl flex flex-col shrink-0">
        <div className="p-6 border-b border-white/40">
          <h1 className="font-serif text-2xl font-bold text-text-main mb-4">Connections</h1>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-primary transition-colors" />
            <input
              className="w-full pl-10 pr-4 py-2 bg-white/60 border border-white/60 rounded-xl text-sm focus:ring-primary focus:border-primary shadow-sm placeholder-gray-400"
              placeholder="Search connections..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredConnections.map((connection) => (
            <button
              key={connection.id}
              onClick={() => setSelectedConnection(connection)}
              className={`w-full p-4 flex items-center gap-4 transition-all hover:bg-white/60 border-b border-white/20 text-left ${
                selectedConnection?.id === connection.id ? 'bg-white/80 border-l-4 border-l-primary' : ''
              }`}
            >
              <div className="relative shrink-0">
                <img
                  src={connection.avatar}
                  alt={connection.name}
                  className="h-12 w-12 rounded-xl object-cover shadow-sm"
                  referrerPolicy="no-referrer"
                />
                {connection.isOnline && (
                  <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-bold text-text-main truncate">{connection.name}</h3>
                  <span className="text-[10px] text-text-muted font-medium">
                    {messages.length > 0 ? new Date(messages[messages.length - 1].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:30 AM'}
                  </span>
                </div>
                <p className="text-xs text-text-muted truncate flex items-center gap-1">
                  {messages.length > 0 && messages[messages.length - 1].senderId === currentUser?.id && (
                    <CheckCheck className="w-3 h-3 text-emerald-600" />
                  )}
                  {messages.length > 0 ? messages[messages.length - 1].text : connection.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-white/20 relative">
        {selectedConnection ? (
          <>
            {/* Chat Header */}
            <header className="p-4 border-b border-white/40 bg-white/40 backdrop-blur-xl flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedConnection.avatar}
                    alt={selectedConnection.name}
                    className="h-10 w-10 rounded-xl object-cover shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  {selectedConnection.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-text-main leading-tight">{selectedConnection.name}</h2>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                    {selectedConnection.isOnline ? 'Active Now' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-white/60 text-text-muted transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/60 text-text-muted transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/60 text-text-muted transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              <div className="flex justify-center mb-8">
                <div className="glass-panel px-4 py-1.5 rounded-full bg-white/40 text-[10px] font-bold text-text-muted uppercase tracking-widest border border-white/60">
                  Today
                </div>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${
                      msg.senderId === currentUser?.id
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-white/80 backdrop-blur-sm text-text-main rounded-tl-none border border-white/60'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <div className={`flex items-center gap-1 mt-1.5 ${msg.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}>
                      <span className={`text-[10px] ${msg.senderId === currentUser?.id ? 'text-white/70' : 'text-text-muted'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {msg.senderId === currentUser?.id && <CheckCheck className="w-3 h-3 text-white/70" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <footer className="p-4 bg-white/40 backdrop-blur-xl border-t border-white/40">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3 max-w-4xl mx-auto">
                <button type="button" className="p-2.5 rounded-xl bg-white/60 text-text-muted hover:bg-white transition-colors shadow-sm">
                  <Globe className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full pl-4 pr-12 py-3 bg-white/80 border border-white/60 rounded-2xl text-sm focus:ring-primary focus:border-primary shadow-inner placeholder-gray-400 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!messageText.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/10"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="h-24 w-24 rounded-3xl bg-emerald-50 flex items-center justify-center text-primary mb-6 shadow-inner">
              <MessageCircle className="w-12 h-12" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-text-main mb-2">Your Messages</h2>
            <p className="text-text-muted max-w-sm">
              Select a connection from the left to start chatting and get guidance for your journey.
            </p>
          </div>
        )}

        {/* Connection Info Sidebar (Desktop only) */}
        {selectedConnection && (
          <aside className="hidden xl:flex w-80 border-l border-white/40 bg-white/20 backdrop-blur-md flex-col p-6 overflow-y-auto">
            <div className="text-center mb-8">
              <img
                src={selectedConnection.avatar}
                alt={selectedConnection.name}
                className="h-32 w-32 rounded-3xl object-cover mx-auto mb-4 shadow-xl ring-4 ring-white"
                referrerPolicy="no-referrer"
              />
              <h3 className="font-serif text-2xl font-bold text-text-main">{selectedConnection.name}</h3>
              <p className="text-sm text-text-muted mt-1">{selectedConnection.major}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">University</h4>
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/40 border border-white/60">
                  <GraduationCap className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="text-xs font-medium text-text-main leading-relaxed">{selectedConnection.university}</p>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedConnection.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-emerald-100 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/40">
                <Link 
                  to={`/universities/${selectedConnection.university.split(',')[0].toLowerCase().replace(/ /g, '-')}`}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/40 border border-white/60 hover:bg-white transition-colors group"
                >
                  <span className="text-xs font-bold text-text-main">View University</span>
                  <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>
          </aside>
        )}
      </main>
    </motion.div>
  );
}
