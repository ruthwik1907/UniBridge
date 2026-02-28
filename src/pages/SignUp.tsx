import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Mail, Lock, User, ArrowRight, Github, Chrome, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token, user } = await api.signup({ 
        name, 
        email, 
        password,
        university: 'Interested Student',
        major: 'Undecided'
      });
      localStorage.setItem('unibridge_token', token);
      localStorage.setItem('unibridge_user', JSON.stringify(user));
      window.dispatchEvent(new Event('storage'));
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-[80vh] flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-primary ring-1 ring-emerald-100 shadow-sm">
              <Sprout className="w-7 h-7" />
            </div>
            <span className="font-serif text-3xl font-bold text-text-main">UniBridge</span>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-text-main">Join the Community</h1>
          <p className="text-text-muted mt-2">Start your global education journey today</p>
        </div>

        <div className="glass-panel rounded-3xl p-8 bg-white/60 border-white shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-bold border border-red-100">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-text-main mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:border-primary focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-main mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:border-primary focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-main mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:border-primary focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 py-2">
              <input type="checkbox" required className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" />
              <p className="text-xs text-text-muted leading-relaxed">
                I agree to the <a href="#" className="text-primary font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-primary font-bold hover:underline">Privacy Policy</a>.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-emerald-900/10 hover:bg-primary-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-text-muted font-bold">Or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all font-bold text-sm">
              <Chrome className="w-5 h-5" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all font-bold text-sm">
              <Github className="w-5 h-5" /> GitHub
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-text-muted">
          Already have an account?{' '}
          <Link to="/signin" className="font-bold text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </motion.div>
  );
}
