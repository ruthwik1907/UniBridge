import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Search, Bell } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem('unibridge_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('unibridge_user');
    setUser(null);
    window.location.href = '/';
  };
  
  const navLinks = [
    { name: 'Destinations', path: '/destinations' },
    { name: 'Universities', path: '/universities' },
    { name: 'Connections', path: '/connections' },
    { name: 'Community', path: '/community' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/40 bg-white/60 backdrop-blur-xl px-6 py-4 lg:px-12 transition-all duration-300 shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-primary ring-1 ring-emerald-100 shadow-sm">
            <Sprout className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-text-main">UniBridge</h2>
        </Link>
        
        <nav className="hidden md:flex flex-1 justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-text-muted'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2 group">
                <div className="h-9 w-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-primary font-bold overflow-hidden shadow-sm group-hover:ring-2 group-hover:ring-primary/20 transition-all">
                  <img 
                    src={user.avatar || `https://picsum.photos/seed/${user.name}/100/100`} 
                    alt={user.name} 
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="hidden sm:block text-sm font-bold text-text-main group-hover:text-primary transition-colors">{user.name.split(' ')[0]}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="text-xs font-bold text-text-muted hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/signin" className="hidden text-sm font-medium text-text-muted hover:text-primary md:block">
                Sign In
              </Link>
              <Link to="/signup" className="flex h-10 cursor-pointer items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:scale-105 border border-transparent shadow-md">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
