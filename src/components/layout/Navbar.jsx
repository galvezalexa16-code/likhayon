// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Sprout } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/museum', label: 'Digital Museum' },
  { to: '/materials', label: 'Materials Bank' },
  { to: '/track', label: 'Track Request' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const transparent = isHome && !scrolled && !open;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? 'bg-transparent'
          : 'bg-[#1a2e18]/97 backdrop-blur-md shadow-xl shadow-black/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-[68px]">

          {/* ── Logo ── */}
          <Link to="/" id="nav-logo" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#c9942a] flex items-center justify-center shadow-lg group-hover:bg-[#d4a843] transition-colors duration-200">
              <Sprout size={17} className="text-white" strokeWidth={2} />
            </div>
            <div className="leading-none">
              <span className="font-serif font-bold text-white text-[16px] tracking-widest uppercase">
                LIKHAYON
              </span>
              <span className="block text-[#c9942a] text-[9px] tracking-[0.12em] uppercase font-medium mt-0.5">
                Likha Noon, Likha Ngayon
              </span>
            </div>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-[13.5px] font-medium tracking-wide transition-colors duration-200 rounded-lg ${
                    isActive
                      ? 'text-[#c9942a]'
                      : 'text-white/75 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* ── CTA + Mobile toggle ── */}
          <div className="flex items-center gap-3">
            <Link
              to="/borrow"
              id="nav-borrow-cta"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-[#c9942a] text-white text-[13px] font-semibold rounded-full shadow-lg shadow-[#c9942a]/25 hover:bg-[#d4a843] hover:shadow-[#c9942a]/40 transition-all duration-200"
            >
              Borrow Materials
            </Link>
            <button
              id="nav-mobile-toggle"
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-white/80 hover:text-white transition-colors rounded-lg"
              aria-label="Toggle menu"
            >
              {open ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: '#1a2e18' }}
      >
        <div className="px-5 pt-2 pb-5 border-t border-white/10 space-y-1">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-[#c9942a]'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/borrow"
            id="nav-mobile-borrow"
            className="block mt-3 px-4 py-3 bg-[#c9942a] text-white rounded-xl text-sm font-semibold text-center hover:bg-[#d4a843] transition-colors"
          >
            Borrow Materials
          </Link>
        </div>
      </div>
    </nav>
  );
}
