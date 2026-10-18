// src/pages/Home.jsx
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronDown, Leaf, RotateCcw, HeartHandshake,
  Package, BookOpen, Users, Sprout, Star, MapPin, ArrowUpRight,
  Archive, Landmark,
} from 'lucide-react';
import { useApp } from '../store/AppContext';

/* ─────────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────────── */
const HERO_IMG =
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1800&q=85';

const MUSEUM_IMG =
  'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=80';

const STEPS = [
  {
    number: '01',
    icon: HeartHandshake,
    color: '#b5603a',
    title: 'Contribute',
    headline: 'Donate After Your Festival',
    body:
      'Festival organizers, municipalities, and community groups donate reusable materials — bamboo structures, costumes, lanterns, and props — after celebrations end, instead of discarding them.',
  },
  {
    number: '02',
    icon: Archive,
    color: '#2d5a27',
    title: 'Preserve',
    headline: 'Document & Safely Store',
    body:
      'Each item is photographed, catalogued with cultural context and origin, assigned a condition grade, and safely stored in our climate-controlled community warehouse in Malolos.',
  },
  {
    number: '03',
    icon: RotateCcw,
    color: '#c9942a',
    title: 'Reuse',
    headline: 'Borrow for Your Event',
    body:
      'Schools, parishes, youth groups, and LGUs submit a borrowing request online. Approved borrowers collect, use, and return materials — keeping culture alive and costs low for everyone.',
  },
];

const IMPACT_CARDS = [
  {
    icon: Leaf,
    color: '#2d5a27',
    bg: '#edf5eb',
    title: 'Environmental Sustainability',
    body:
      "By giving festival materials a second, third, and fourth life, LIKHAYON dramatically reduces post-event waste. Bamboo structures, fabric decorations, and props are kept out of landfills for years.",
    stat: '60%',
    statLabel: 'reduction in post-festival disposal',
  },
  {
    icon: Landmark,
    color: '#b5603a',
    bg: '#fdf0eb',
    title: 'Cultural Preservation',
    body:
      "Every material in the bank carries a story. Our digital archive documents the cultural origin, festival context, and craftsmanship behind each item — building a living record of Bulacan's heritage.",
    stat: '300+',
    statLabel: 'years of living tradition documented',
  },
  {
    icon: Users,
    color: '#c9942a',
    bg: '#fdf6e8',
    title: 'Youth & Community Engagement',
    body:
      "Access to authentic cultural materials empowers schools and youth groups to celebrate with pride. LIKHAYON makes heritage tangible, participatory, and free from financial barriers.",
    stat: '24',
    statLabel: 'municipalities served across Bulacan',
  },
];

const ARCHIVE_PREVIEWS = [
  {
    id: 'arc-001',
    title: 'Sayaw sa Obando',
    municipality: 'Obando',
    category: 'Festival',
    img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=700&q=80',
  },
  {
    id: 'arc-003',
    title: 'Pulilan Carabao Festival',
    municipality: 'Pulilan',
    category: 'Ritual',
    img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=700&q=80',
  },
  {
    id: 'arc-006',
    title: 'Bulacan Parol Festival',
    municipality: 'Province-wide',
    category: 'Festival',
    img: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=700&q=80',
  },
  {
    id: 'arc-002',
    title: 'Bocaue River Festival',
    municipality: 'Bocaue',
    category: 'Festival',
    img: 'https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=700&q=80',
  },
];

/* ─────────────────────────────────────────────────────────────────
   AVAILABILITY PILL
───────────────────────────────────────────────────────────────── */
function AvailBadge({ available, total }) {
  const pct = total > 0 ? available / total : 0;
  const cls =
    available === 0
      ? 'bg-red-100 text-red-700'
      : pct <= 0.3
      ? 'bg-orange-100 text-orange-700'
      : 'bg-emerald-100 text-emerald-700';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${available === 0 ? 'bg-red-500' : pct <= 0.3 ? 'bg-orange-500' : 'bg-emerald-500'}`} />
      {available === 0 ? 'Unavailable' : `${available} / ${total} available`}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   COUNTER ANIMATION
───────────────────────────────────────────────────────────────── */
function AnimatedCount({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const dur = 1400;
          const step = 16;
          const inc = target / (dur / step);
          const timer = setInterval(() => {
            start += inc;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, step);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────────────── */
export default function Home() {
  const { materials, archive, requests } = useApp();

  const featuredMaterials = materials.slice(0, 6);
  const totalItems = materials.reduce((s, m) => s + m.quantity, 0);
  const totalAvailable = materials.reduce((s, m) => s + m.available, 0);
  const served = requests.filter(r => r.status === 'Returned').length + 3;

  return (
    <div className="page-enter">

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f0b]/70 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 page-container pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24">
          <div className="max-w-[880px] text-left">

            {/* Proto label */}
            <div className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9942a] animate-pulse" />
              <span className="text-white/85 text-[11px] font-medium tracking-widest uppercase">
                Province of Bulacan · Prototype Initiative
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[76px] font-bold text-white tracking-tight leading-[1.08] mb-5 sm:mb-6">
              Preserving Our{' '}
              <span className="text-[#c9942a]">Heritage.</span>
              <br className="hidden sm:inline" />{' '}
              Sharing Our{' '}
              <span className="text-white/95">Culture.</span>
            </h1>

            {/* Description */}
            <p className="text-white/85 text-[17px] sm:text-[18px] lg:text-[19px] leading-[1.58] max-w-[600px] mb-7 sm:mb-8 font-normal">
              LIKHAYON — <em>Likha Noon, Likha Ngayon</em> — collects reusable materials from Bulacan's festivals and celebrations: bamboo structures, costumes, lanterns, and ritual props, and makes them available to schools, parishes, and community groups for free.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/materials"
                id="hero-explore"
                className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 h-[48px] sm:h-[52px] bg-[#c9942a] text-white font-semibold rounded-full shadow-2xl shadow-[#c9942a]/30 hover:bg-[#d4a843] hover:shadow-[#c9942a]/50 transition-all duration-200 text-sm sm:text-[15px]"
              >
                Explore the Collection
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/borrow"
                id="hero-borrow"
                className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 h-[48px] sm:h-[52px] bg-white/12 text-white font-semibold rounded-full border border-white/30 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 text-sm sm:text-[15px]"
              >
                Borrow Materials
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Inline stats - evenly spaced columns with ~24-32px spacing above */}
            <div className="grid grid-cols-3 gap-6 sm:gap-10 max-w-[560px] mt-7 sm:mt-8 pt-6 sm:pt-7 border-t border-white/15">
              {[
                { val: totalItems, suffix: '+', label: 'Materials in Stock' },
                { val: archive.length, suffix: '', label: 'Archive Entries' },
                { val: served, suffix: '', label: 'Communities Served' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none">
                    <AnimatedCount target={s.val} suffix={s.suffix} />
                  </p>
                  <p className="text-white/65 text-xs sm:text-[13px] tracking-wide mt-2 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hidden sm:flex absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-white/40 animate-bounce pointer-events-none">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown size={15} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          GREEN DIVIDER BAR
      ══════════════════════════════════════════════════ */}
      <div className="bg-[#1e3d1a] py-5">
        <div className="page-container">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-white/70 text-sm">
              A community initiative of the{' '}
              <span className="text-white font-medium">Provincial Government of Bulacan</span>
            </p>
            <div className="flex flex-wrap gap-6 text-xs text-white/50">
              {['Malolos', 'Obando', 'Bocaue', 'Pulilan', 'Hagonoy', 'Meycauayan'].map((m) => (
                <span key={m} className="flex items-center gap-1">
                  <MapPin size={10} className="text-[#c9942a]" /> {m}
                </span>
              ))}
              <span className="text-[#c9942a]">+ 18 more municipalities</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          HOW IT WORKS — 3 STEPS
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#faf7f2] py-24 sm:py-28">
        <div className="page-container">

          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-[#edf5eb] text-[#2d5a27] text-[11px] font-semibold tracking-widest uppercase rounded-full mb-4">
              How It Works
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1a1a18] mb-4">
              A Circular System for Culture
            </h2>
            <p className="text-[#6b6b5e] text-base max-w-xl mx-auto leading-relaxed">
              Three simple steps that turn festival waste into shared community heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-14 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-[#b5603a]/30 via-[#2d5a27]/30 to-[#c9942a]/30 z-0" />

            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 group z-10">
                  {/* Step number background */}
                  <span
                    className="absolute top-5 right-6 font-serif text-7xl font-bold select-none opacity-[0.07]"
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${step.color}18` }}
                  >
                    <Icon size={22} style={{ color: step.color }} strokeWidth={1.8} />
                  </div>

                  {/* Label pill */}
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3"
                    style={{ backgroundColor: `${step.color}14`, color: step.color }}
                  >
                    Step {step.number} · {step.title}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-[#1a1a18] mb-3 leading-snug">
                    {step.headline}
                  </h3>
                  <p className="text-[#6b6b5e] text-sm leading-relaxed">{step.body}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/about"
              id="steps-learn-more"
              className="inline-flex items-center gap-2 text-[#2d5a27] font-semibold text-sm hover:text-[#c9942a] transition-colors"
            >
              Learn more about the initiative <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FEATURED CULTURAL MATERIALS
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#f0ebe0] py-24 sm:py-28">
        <div className="page-container">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
            <div>
              <span className="inline-block px-3 py-1 bg-[#b5603a]/12 text-[#b5603a] text-[11px] font-semibold tracking-widest uppercase rounded-full mb-3">
                Materials Bank
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a18] leading-tight">
                Featured Cultural<br />Materials
              </h2>
              <p className="text-[#6b6b5e] text-sm sm:text-base mt-2.5 max-w-lg leading-relaxed">
                Authentic festive assets catalogued and cared for in Bulacan — ready for local schools, parishes, and organizations to reserve.
              </p>
            </div>
            <Link
              to="/materials"
              id="featured-view-all"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 border border-[#1a1a18]/20 text-[#1a1a18] text-sm font-semibold rounded-full hover:bg-[#1a1a18] hover:text-white transition-all duration-200"
            >
              View All Materials <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {featuredMaterials.map((mat, i) => (
              <Link
                key={mat.id}
                to={`/materials?id=${mat.id}`}
                id={`featured-mat-${mat.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/10 transition-all duration-300 border border-white hover:border-[#3d7a35]/20 hover:-translate-y-1 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-[#e8e0d4]">
                  <img
                    src={mat.imageUrl}
                    alt={mat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                    loading={i < 3 ? 'eager' : 'lazy'}
                    onError={e => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=600&q=60';
                    }}
                  />
                  {/* Category label */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#1a2e18]/80 text-white text-[10px] font-semibold rounded-lg uppercase tracking-wider backdrop-blur-sm">
                    {mat.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="font-serif font-bold text-[#1a1a18] text-base leading-snug mb-1.5 group-hover:text-[#2d5a27] transition-colors line-clamp-2">
                    {mat.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#9e9e8f] mb-3">
                    <MapPin size={11} />
                    <span>{mat.origin}</span>
                    <span className="text-[#d4c9b8]">·</span>
                    <span className="truncate">{mat.festival}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <AvailBadge available={mat.available} total={mat.quantity} />
                    <span className="text-xs text-[#9e9e8f] font-medium">{mat.condition}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Availability summary strip */}
          <div className="mt-10 bg-white rounded-2xl p-6 border border-gray-100 flex flex-wrap gap-8 items-center justify-between shadow-sm">
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="font-serif text-3xl font-bold text-[#1a1a18]">{materials.length}</p>
                <p className="text-[#9e9e8f] text-xs mt-0.5">Material types</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-[#2d5a27]">{totalAvailable}</p>
                <p className="text-[#9e9e8f] text-xs mt-0.5">Items available now</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-[#b5603a]">{totalItems}</p>
                <p className="text-[#9e9e8f] text-xs mt-0.5">Total items in stock</p>
              </div>
            </div>
            <Link
              to="/borrow"
              id="featured-borrow-cta"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1e3d1a] text-white text-sm font-semibold rounded-full hover:bg-[#2d5a27] transition-colors"
            >
              Submit a Request <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          DIGITAL MUSEUM CTA
      ══════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-28 overflow-hidden">
        {/* BG */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${MUSEUM_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f0b]/90 via-[#1a2e18]/80 to-[#0d1f0b]/60" />

        <div className="relative z-10 page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left copy */}
            <div>
              <span className="inline-block px-3 py-1 bg-[#c9942a]/20 border border-[#c9942a]/30 text-[#f5c06a] text-[11px] font-semibold tracking-widest uppercase rounded-full mb-6">
                Digital Museum
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
                Explore Bulacan's
                <br className="hidden sm:inline" />{' '}
                <span className="text-[#c9942a]">Living Heritage</span>
              </h2>
              <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
                Our digital cultural archive documents the festivals, rituals, crafts, and living traditions that make Bulacan one of the Philippines' richest cultural provinces. Each entry features historical context, photographs, and links to related materials in our bank.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/museum"
                  id="museum-cta-primary"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#c9942a] text-white font-semibold rounded-full hover:bg-[#d4a843] transition-all duration-200 text-sm"
                >
                  Open the Archive
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  id="museum-cta-about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/25 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-200 text-sm"
                >
                  About the Initiative
                </Link>
              </div>
            </div>

            {/* Right — Archive preview grid */}
            <div className="grid grid-cols-2 gap-3">
              {ARCHIVE_PREVIEWS.map((entry, i) => (
                <Link
                  key={entry.id}
                  to={`/museum?id=${entry.id}`}
                  id={`museum-preview-${entry.id}`}
                  className={`group relative rounded-2xl overflow-hidden ${i === 0 ? 'row-span-2' : ''}`}
                  style={{ minHeight: i === 0 ? '280px' : '130px' }}
                >
                  <img
                    src={entry.img}
                    alt={entry.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="block text-[10px] text-[#c9942a] font-semibold uppercase tracking-wider mb-0.5">
                      {entry.category}
                    </span>
                    <p className="text-white text-xs font-semibold leading-snug line-clamp-2">{entry.title}</p>
                    <p className="text-white/60 text-[10px] mt-0.5 flex items-center gap-1">
                      <MapPin size={9} /> {entry.municipality}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          COMMUNITY IMPACT
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#faf7f2] py-24 sm:py-28">
        <div className="page-container">

          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-[#fdf6e8] text-[#c9942a] text-[11px] font-semibold tracking-widest uppercase rounded-full mb-4">
              Community Impact
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1a1a18] mb-4">
              Why LIKHAYON Matters
            </h2>
            <p className="text-[#6b6b5e] text-base max-w-xl mx-auto leading-relaxed">
              Beyond preserving materials, LIKHAYON builds a more equitable and sustainable relationship between community, culture, and celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {IMPACT_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className="w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: card.bg }}
                  >
                    <Icon size={22} style={{ color: card.color }} strokeWidth={1.8} />
                  </div>

                  {/* Animated stat */}
                  <div className="mb-4">
                    <p className="font-serif text-4xl font-bold" style={{ color: card.color }}>
                      {card.stat}
                    </p>
                    <p className="text-[#9e9e8f] text-xs mt-0.5 leading-snug">{card.statLabel}</p>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1a1a18] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[#6b6b5e] text-sm leading-relaxed">{card.body}</p>
                </div>
              );
            })}
          </div>

          {/* Testimonial-style quote */}
          <div className="mt-14 bg-[#1e3d1a] rounded-2xl p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-4 right-6 font-serif text-9xl text-white/5 leading-none select-none">"</div>
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
              <div className="sm:col-span-2">
                <p className="font-serif text-xl sm:text-2xl text-white/90 leading-relaxed italic mb-5">
                  "LIKHAYON transforms what is typically discarded into something precious — a shared resource that keeps our festivals alive even for communities that could never afford the materials alone."
                </p>
                <div>
                  <p className="text-[#c9942a] font-semibold text-sm">Dr. Maria Santos</p>
                  <p className="text-white/50 text-xs">Provincial Cultural Heritage Officer · Province of Bulacan</p>
                  <p className="text-white/35 text-[10px] italic mt-0.5">Fictional sample quote for LIKHAYON demonstration purposes</p>
                </div>
              </div>
              <div className="sm:text-right">
                <Link
                  to="/about"
                  id="impact-about-link"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#c9942a]/40 text-[#c9942a] text-sm font-semibold rounded-full hover:bg-[#c9942a]/10 transition-colors"
                >
                  Our Story <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BOTTOM CTA BAND
      ══════════════════════════════════════════════════ */}
      <section className="bg-[#f0ebe0] border-t border-[#e0d8cc] py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <Sprout size={30} className="text-[#2d5a27] mx-auto mb-5" strokeWidth={1.5} />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1a18] mb-4 leading-tight">
            Ready to Participate?
          </h2>
          <p className="text-[#6b6b5e] text-base mb-8 max-w-lg mx-auto leading-relaxed">
            Whether you are donating materials from a recent festival or requesting items for your next celebration — LIKHAYON is open to all communities.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/borrow"
              id="bottom-cta-borrow"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1e3d1a] text-white font-semibold rounded-full hover:bg-[#2d5a27] transition-colors text-sm shadow-lg shadow-[#1e3d1a]/20"
            >
              Submit a Borrowing Request
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/museum"
              id="bottom-cta-museum"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#1a1a18] font-semibold rounded-full hover:bg-[#faf7f2] border border-gray-200 transition-colors text-sm"
            >
              Visit the Cultural Archive
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
