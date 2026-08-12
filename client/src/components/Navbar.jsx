// components/Navbar.jsx — Responsive navigation bar with mobile hamburger menu
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ShieldCheck } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/projects', label: 'Projects' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/volunteer', label: 'Volunteer' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Add shadow when page is scrolled
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
      role="banner"
    >
      <nav className="container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="SevaConnect Home">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--color-primary)' }}>
              <Heart size={18} className="text-white" fill="white" />
            </div>
            <span className="font-heading text-xl font-bold" style={{ color: 'var(--color-dark)' }}>
              Seva<span style={{ color: 'var(--color-primary)' }}>Connect</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`
                  }
                  style={({ isActive }) => isActive ? { background: 'var(--color-primary)' } : {}}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/donate" className="btn-accent text-sm py-2 px-5">
              ❤️ Donate
            </Link>
            <Link
              to="/admin/login"
              className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg border-2 transition-all duration-200 hover:text-white"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-primary)'; }}
              title="Admin Panel Login"
            >
              <ShieldCheck size={15} />
              Admin
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-gray-100 py-4 animate-fadeInUp"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                    style={({ isActive }) => isActive ? { background: 'var(--color-primary)' } : {}}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              <li>
                <Link to="/donate" className="btn-accent mt-2 w-full justify-center text-sm">
                  ❤️ Donate Now
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="mt-1 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold border-2 transition-colors"
                  style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
                >
                  <ShieldCheck size={15} /> Admin Login
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
