// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import { Sprout, MapPin, Mail, Phone, AlertTriangle, ArrowRight } from 'lucide-react';

const NAV_COLS = [
  {
    heading: 'Platform',
    links: [
      { to: '/', label: 'Home' },
      { to: '/museum', label: 'Digital Museum' },
      { to: '/materials', label: 'Materials Bank' },
      { to: '/borrow', label: 'Borrow Materials' },
      { to: '/track', label: 'Track a Request' },
    ],
  },
  {
    heading: 'Initiative',
    links: [
      { to: '/about', label: 'About LIKHAYON' },
      { to: '/about', label: 'How It Works' },
      { to: '/about', label: 'Partner Agencies' },
      { to: '/admin', label: 'Admin Dashboard' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f1e0e] text-white/65">
      {/* Prototype notice */}
      <div className="bg-[#7a3820]/80 border-b border-[#a04f2f]/40">
        <div className="page-container py-2.5 flex items-center justify-center gap-2.5 text-center flex-wrap">
          <AlertTriangle size={13} className="text-[#f5c06a] flex-shrink-0" />
          <p className="text-[11px] text-white/75">
            <span className="font-bold text-[#f5c06a]">PROTOTYPE ONLY</span>
            {' '}— This is a demonstration mockup with fictional sample data. Not an official government system.
          </p>
        </div>
      </div>

      <div className="page-container pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-full bg-[#c9942a] flex items-center justify-center shadow-lg group-hover:bg-[#d4a843] transition-colors">
                <Sprout size={18} className="text-white" />
              </div>
              <div>
                <span className="font-serif font-bold text-white text-base tracking-widest uppercase">LIKHAYON</span>
                <span className="block text-[#c9942a] text-[9px] tracking-[0.12em] uppercase mt-0.5">Likha Noon, Likha Ngayon</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/55 mb-5 max-w-xs">
              Preserving and reusing tangible heritage from Bulacan's festivals — making culture accessible to every community, large or small.
            </p>
            <div className="space-y-2 text-xs text-white/45">
              <div className="flex items-start gap-2">
                <MapPin size={12} className="text-[#c9942a] mt-0.5 flex-shrink-0" />
                <span>Provincial Capitol Complex, Malolos City, Bulacan 3000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-[#c9942a] flex-shrink-0" />
                <span>pamanabank@bulacan.gov.ph</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-[#c9942a] flex-shrink-0" />
                <span>(044) 791-0000</span>
              </div>
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map(col => (
            <div key={col.heading}>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/55 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get Involved */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">Get Involved</h4>
            <div className="space-y-3">
              <Link
                to="/borrow"
                className="flex items-center gap-2 px-4 py-2.5 bg-[#c9942a]/15 border border-[#c9942a]/25 text-[#c9942a] text-xs font-semibold rounded-xl hover:bg-[#c9942a]/25 transition-colors"
              >
                <ArrowRight size={13} /> Borrow Materials
              </Link>
              <Link
                to="/museum"
                className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/60 text-xs font-semibold rounded-xl hover:bg-white/10 hover:text-white transition-colors"
              >
                <ArrowRight size={13} /> Cultural Archive
              </Link>
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/60 text-xs font-semibold rounded-xl hover:bg-white/10 hover:text-white transition-colors"
              >
                <ArrowRight size={13} /> Admin Dashboard
              </Link>
            </div>

            <div className="mt-6 pt-5 border-t border-white/8">
              <p className="text-[10px] text-white/35 leading-relaxed">
                LIKHAYON is a proposed innovation initiative under the Provincial Government of Bulacan. All records are fictional samples for demonstration.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[11px] text-white/30">
            © 2025 LIKHAYON — Likha Noon, Likha Ngayon. Province of Bulacan. Prototype demonstration — all records are fictional.
          </p>
          <p className="text-[11px] text-white/25">
            Built with React + Vite · Tailwind CSS · Data stored in browser localStorage
          </p>
        </div>
      </div>
    </footer>
  );
}
