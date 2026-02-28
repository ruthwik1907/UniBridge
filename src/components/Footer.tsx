import React from 'react';
import { Sprout } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/30 bg-soft-sage/80 backdrop-blur-xl px-6 py-16 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-text-main">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-600 text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold">UniBridge</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Connecting prospective students with current students for honest, real-world advice. Your journey starts with a conversation.
            </p>
          </div>
          
          <div>
            <h4 className="mb-6 font-bold text-text-main font-serif text-lg">Platform</h4>
            <ul className="flex flex-col gap-3 text-sm text-text-muted">
              <li><a className="hover:text-primary transition-colors" href="/connections">Browse Connections</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">How it Works</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Universities</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-6 font-bold text-text-main font-serif text-lg">Company</h4>
            <ul className="flex flex-col gap-3 text-sm text-text-muted">
              <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-6 font-bold text-text-main font-serif text-lg">Stay Updated</h4>
            <div className="flex flex-col gap-4">
              <input
                className="w-full rounded-xl border-white/40 bg-white/40 px-4 py-3 text-sm text-text-main placeholder-text-muted focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all shadow-sm"
                placeholder="Enter your email"
                type="email"
              />
              <button className="rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary-dark transition-colors shadow-lg shadow-emerald-900/10">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-emerald-900/10 pt-8 text-center text-sm text-text-muted">
          <p>© 2023 UniBridge Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
