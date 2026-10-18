// src/pages/Museum.jsx
// LIKHAYON Digital Museum — Cultural Archive Page
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search, X, BookOpen, MapPin, Tag, ArrowRight, Star,
  Package, Lightbulb, Users, ChevronRight, Info, ExternalLink,
  Filter, ChevronDown, Sparkles, GraduationCap,
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { MUSEUM_CATEGORIES } from '../data/archive';
import Modal from '../components/ui/Modal';
import { formatDate } from '../utils/helpers';

/* ─────────────────────────────────────────────────────────────────
   CONDITION PILL
───────────────────────────────────────────────────────────────── */
function ConditionPill({ condition }) {
  const map = {
    Excellent: 'bg-emerald-100 text-emerald-800',
    'Very Good': 'bg-green-100 text-green-800',
    Good: 'bg-yellow-100 text-yellow-800',
    Fair: 'bg-orange-100 text-orange-800',
    'Needs Repair': 'bg-red-100 text-red-800',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${map[condition] || 'bg-gray-100 text-gray-700'}`}>
      {condition}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   COLLECTION STATUS PILL
───────────────────────────────────────────────────────────────── */
function StatusPill({ status }) {
  const isIn = status?.startsWith('In Collection');
  const isPartial = status?.startsWith('Partially');
  const cls = isIn ? 'bg-[#edf5eb] text-[#2d5a27]'
    : isPartial ? 'bg-amber-100 text-amber-800'
    : 'bg-red-100 text-red-700';
  const dot = isIn ? 'bg-[#2d5a27]' : isPartial ? 'bg-amber-500' : 'bg-red-500';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CATEGORY COLORS
───────────────────────────────────────────────────────────────── */
const CAT_STYLES = {
  'Festival Decorations': { bg: '#b5603a', light: '#fdf0eb', text: '#8b4428' },
  'Bamboo Structures':    { bg: '#2d5a27', light: '#edf5eb', text: '#1e3d1a' },
  'Traditional Crafts':  { bg: '#c9942a', light: '#fdf6e8', text: '#8b6914' },
  'Costumes & Props':     { bg: '#6b4f8b', light: '#f3eef9', text: '#4a3563' },
  'Reusable Event Materials': { bg: '#2a6b7a', light: '#e8f5f8', text: '#1a4a54' },
};

function catStyle(cat) {
  return CAT_STYLES[cat] || { bg: '#6b6b5e', light: '#f0ebe0', text: '#1a1a18' };
}

/* ─────────────────────────────────────────────────────────────────
   ARCHIVE CARD
───────────────────────────────────────────────────────────────── */
function ArchiveCard({ entry, onClick, index }) {
  const cs = catStyle(entry.category);
  return (
    <article
      onClick={() => onClick(entry)}
      id={`archive-card-${entry.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(entry)}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/10 border border-gray-100 hover:border-[#e0d8cc] cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[#e8e0d4] flex-shrink-0">
        <img
          src={entry.imageUrl}
          alt={entry.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=600&q=60'; }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Featured star */}
        {entry.isFeatured && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#c9942a] flex items-center justify-center shadow-md">
            <Star size={13} className="text-white fill-white" />
          </div>
        )}

        {/* Category pill */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm text-white"
          style={{ backgroundColor: `${cs.bg}cc` }}
        >
          {entry.category}
        </span>

        {/* Title on image bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-serif font-bold text-white text-base leading-tight">{entry.title}</h3>
          <p className="text-white/75 text-xs italic mt-0.5">{entry.subtitle}</p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Festival + community */}
        <div className="flex items-start gap-1.5 text-[11px] text-[#9e9e8f] mb-2.5">
          <MapPin size={11} className="mt-0.5 flex-shrink-0" />
          <span className="line-clamp-1">{entry.community}</span>
        </div>
        <p className="text-[#6b6b5e] text-xs leading-relaxed line-clamp-3 flex-1 mb-3">
          {entry.description}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <StatusPill status={entry.collectionStatus} />
          <span className="text-xs text-[#c9942a] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            View Entry <ChevronRight size={12} />
          </span>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DETAIL MODAL CONTENT
───────────────────────────────────────────────────────────────── */
function EntryDetail({ entry, linkedMaterial }) {
  if (!entry) return null;
  const cs = catStyle(entry.category);

  return (
    <div className="space-y-0">

      {/* Hero image */}
      <div className="relative h-64 -mx-6 -mt-0 mb-6 overflow-hidden rounded-xl">
        <img
          src={entry.imageUrl}
          alt={entry.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <span
            className="inline-block px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white mb-2"
            style={{ backgroundColor: `${cs.bg}cc` }}
          >
            {entry.category}
          </span>
          <h2 className="font-serif font-bold text-white text-2xl leading-tight">{entry.title}</h2>
          <p className="text-white/75 text-sm italic mt-0.5">{entry.subtitle}</p>
        </div>
        {entry.isFeatured && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-[#c9942a] rounded-full">
            <Star size={11} className="text-white fill-white" />
            <span className="text-white text-[10px] font-bold">Featured Collection</span>
          </div>
        )}
      </div>

      {/* Sample record warning */}
      <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-5">
        <Info size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-amber-800 text-xs leading-relaxed">
          <span className="font-bold">Sample Record</span> — This entry is a fictional demonstration record created for the LIKHAYON prototype. Cultural details are illustrative and should not be cited as verified historical fact.
        </p>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
        {[
          { label: 'Community', value: entry.community },
          { label: 'Associated Festival', value: entry.associatedFestival },
          { label: 'Era / Period', value: entry.era },
          { label: 'Condition', value: <ConditionPill condition={entry.condition} /> },
          { label: 'Collection Status', value: <StatusPill status={entry.collectionStatus} /> },
          { label: 'Date Documented', value: formatDate(entry.dateAdded) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#f9f7f4] rounded-xl p-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#9e9e8f] mb-1">{label}</p>
            {typeof value === 'string' ? (
              <p className="text-xs font-semibold text-[#1a1a18] leading-snug">{value}</p>
            ) : value}
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {entry.tags?.map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: cs.light, color: cs.text }}>
            #{tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <div className="mb-5">
        <h4 className="font-serif font-bold text-[#1a1a18] text-base mb-2.5 flex items-center gap-2">
          <BookOpen size={16} className="text-[#c9942a]" /> About This Object
        </h4>
        <p className="text-[#6b6b5e] text-sm leading-relaxed">{entry.description}</p>
      </div>

      {/* Cultural significance */}
      <div className="bg-[#f9f7f4] border-l-4 rounded-xl p-5 mb-5" style={{ borderColor: cs.bg }}>
        <h4 className="font-serif font-bold text-[#1a1a18] text-base mb-2.5 flex items-center gap-2">
          <Lightbulb size={16} className="text-[#c9942a]" /> Cultural Significance
        </h4>
        <p className="text-[#6b6b5e] text-sm leading-relaxed">{entry.culturalSignificance}</p>
      </div>

      {/* Reuse potential */}
      <div className="mb-5">
        <h4 className="font-serif font-bold text-[#1a1a18] text-base mb-2.5 flex items-center gap-2">
          <Package size={16} className="text-[#2d5a27]" /> Reuse Potential
        </h4>
        <p className="text-[#6b6b5e] text-sm leading-relaxed">{entry.reuseNotes}</p>
      </div>

      {/* Youth note */}
      {entry.youthNote && (
        <div className="bg-[#1e3d1a] rounded-xl p-5 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap size={16} className="text-[#c9942a]" />
            <span className="text-[#c9942a] text-xs font-bold uppercase tracking-widest">For Young Explorers</span>
          </div>
          <p className="text-white/80 text-sm leading-relaxed italic">{entry.youthNote}</p>
        </div>
      )}

      {/* Gallery */}
      {entry.gallery?.length > 0 && (
        <div className="mb-5">
          <h4 className="font-serif font-bold text-[#1a1a18] text-base mb-3">Photo Gallery</h4>
          <div className="grid grid-cols-2 gap-2">
            {entry.gallery.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden h-32">
                <img src={img} alt={`${entry.title} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Linked material */}
      {linkedMaterial && (
        <div className="border border-[#3d7a35]/20 rounded-xl p-4 mb-5 bg-[#f0f8ee]">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#2d5a27] mb-3 flex items-center gap-2">
            <Package size={13} /> This Object is in the LIKHAYON Materials Bank
          </h4>
          <div className="flex items-center gap-3">
            <img
              src={linkedMaterial.imageUrl}
              alt={linkedMaterial.name}
              className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=100&q=60'; }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#1a1a18] text-sm">{linkedMaterial.name}</p>
              <p className="text-xs text-[#6b6b5e] mt-0.5">
                {linkedMaterial.available > 0 ? (
                  <span className="text-[#2d5a27] font-semibold">{linkedMaterial.available} of {linkedMaterial.quantity} available to borrow</span>
                ) : (
                  <span className="text-red-600 font-semibold">Currently unavailable</span>
                )}
              </p>
              <p className="text-[10px] text-[#9e9e8f] mt-0.5">Condition: {linkedMaterial.condition}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Link
              to={`/materials?id=${linkedMaterial.id}`}
              className="flex-1 py-2 bg-[#1e3d1a] text-white rounded-lg text-xs font-semibold text-center hover:bg-[#2d5a27] transition-colors flex items-center justify-center gap-1.5"
            >
              View in Materials Bank <ExternalLink size={11} />
            </Link>
            {linkedMaterial.available > 0 && (
              <Link
                to="/borrow"
                state={{ materialId: linkedMaterial.id, materialName: linkedMaterial.name }}
                className="flex-1 py-2 bg-[#c9942a] text-white rounded-lg text-xs font-semibold text-center hover:bg-[#d4a843] transition-colors"
              >
                Request to Borrow
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Curator credit */}
      <div className="border-t border-gray-100 pt-4 text-xs text-[#9e9e8f] flex flex-wrap justify-between gap-1">
        <span>Documented by: <em>{entry.curator}</em></span>
        <span>Added to archive: {formatDate(entry.dateAdded)}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FEATURED STRIP
───────────────────────────────────────────────────────────────── */
function FeaturedStrip({ entries, onOpen }) {
  const featured = entries.filter(e => e.isFeatured);
  if (!featured.length) return null;

  return (
    <div className="mb-14">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Star size={16} className="text-[#c9942a] fill-[#c9942a]" />
          <h2 className="font-serif text-2xl font-bold text-[#1a1a18]">Featured Collection</h2>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-[#c9942a]/30 to-transparent" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Hero card — first featured */}
        <div
          onClick={() => onOpen(featured[0])}
          id={`featured-hero-${featured[0].id}`}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && onOpen(featured[0])}
          className="sm:col-span-2 lg:col-span-2 xl:col-span-2 group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:shadow-black/15 transition-all duration-300 hover:-translate-y-1"
          style={{ minHeight: '300px' }}
        >
          <img
            src={featured[0].imageUrl}
            alt={featured[0].title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-[#c9942a] rounded-full">
            <Star size={10} className="text-white fill-white" />
            <span className="text-white text-[10px] font-bold">Featured</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="block text-[10px] text-[#c9942a] font-bold uppercase tracking-widest mb-1.5">
              {featured[0].category}
            </span>
            <h3 className="font-serif font-bold text-white text-xl leading-tight mb-1">{featured[0].title}</h3>
            <p className="text-white/70 text-xs italic mb-2">{featured[0].subtitle}</p>
            <p className="text-white/65 text-xs line-clamp-2 mb-3">{featured[0].description}</p>
            <span className="inline-flex items-center gap-1 text-[#c9942a] text-xs font-semibold group-hover:gap-2 transition-all">
              Explore Entry <ChevronRight size={12} />
            </span>
          </div>
        </div>

        {/* Secondary featured cards */}
        {featured.slice(1, 5).map((entry) => {
          const cs = catStyle(entry.category);
          return (
            <div
              key={entry.id}
              onClick={() => onOpen(entry)}
              id={`featured-card-${entry.id}`}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onOpen(entry)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:shadow-black/12 transition-all duration-300 hover:-translate-y-1"
              style={{ minHeight: '140px' }}
            >
              <img
                src={entry.imageUrl}
                alt={entry.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <span
                  className="block text-[9px] font-bold uppercase tracking-widest mb-1"
                  style={{ color: '#ffd580' }}
                >
                  {entry.category}
                </span>
                <h3 className="font-serif font-bold text-white text-sm leading-snug line-clamp-2">{entry.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   YOUTH SECTION
───────────────────────────────────────────────────────────────── */
function YouthSection({ onExplore }) {
  return (
    <section className="mt-20 bg-[#1e3d1a] rounded-3xl overflow-hidden relative">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}
      />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left image */}
        <div className="relative h-56 lg:h-auto min-h-[250px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80"
            alt="Young people exploring cultural heritage"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1e3d1a] hidden lg:block" />
        </div>

        {/* Right content */}
        <div className="p-8 sm:p-10 lg:p-12">
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap size={20} className="text-[#c9942a]" />
            <span className="text-[#c9942a] text-xs font-bold uppercase tracking-widest">For Students & Youth</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            Explore Your
            <br />
            <em className="not-italic text-[#c9942a]">Living Heritage</em>
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">
            Every material in the LIKHAYON archive is a window into the lives, beliefs, and creativity of the people of Bulacan. The archive is designed to be explored, questioned, and shared — especially by the next generation of cultural stewards.
          </p>

          <div className="space-y-3 mb-8">
            {[
              { icon: BookOpen, text: 'Read the cultural background of each material' },
              { icon: Sparkles, text: 'Discover hidden craft traditions and endangered skills' },
              { icon: Users, text: 'Find out which festivals your community celebrates' },
              { icon: Package, text: 'Request materials for your school\'s cultural events' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-[#c9942a]" />
                </div>
                <span className="text-white/80 text-sm">{text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onExplore()}
              id="youth-explore-btn"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9942a] text-white font-semibold rounded-full text-sm hover:bg-[#d4a843] transition-colors"
            >
              Start Exploring <ArrowRight size={14} />
            </button>
            <Link
              to="/borrow"
              id="youth-borrow-btn"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/25 text-white font-semibold rounded-full text-sm hover:bg-white/10 transition-colors"
            >
              Borrow for Your School
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────── */
export default function Museum() {
  const { archive, materials } = useApp();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const searchRef = useRef(null);
  const galleryRef = useRef(null);

  // Auto-select or filter from URL search params (?id=... &category=... &search=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idParam = params.get('id');
    const catParam = params.get('category');
    const qParam = params.get('search');
    if (idParam) {
      const match = archive.find(e => e.id === idParam);
      if (match) setSelected(match);
    }
    if (catParam) setCategory(catParam);
    if (qParam) setSearch(qParam);
  }, [location.search, archive]);

  // Filter logic
  const filtered = archive.filter(e => {
    const matchCat = category === 'All' || e.category === category;
    const q = search.toLowerCase();
    const matchQ = !q ||
      e.title.toLowerCase().includes(q) ||
      e.subtitle?.toLowerCase().includes(q) ||
      e.community.toLowerCase().includes(q) ||
      e.associatedFestival?.toLowerCase().includes(q) ||
      e.tags?.some(t => t.toLowerCase().includes(q));
    return matchCat && matchQ;
  });

  function scrollToGallery() {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Find linked material for selected entry
  const linkedMaterial = selected?.materialId
    ? materials.find(m => m.id === selected.materialId)
    : null;

  // Category count map
  const catCounts = {};
  MUSEUM_CATEGORIES.forEach(cat => {
    catCounts[cat] = cat === 'All' ? archive.length : archive.filter(e => e.category === cat).length;
  });

  return (
    <div className="page-enter">

      {/* ══════════════════════════════════════════════════
          INTRO HERO
      ══════════════════════════════════════════════════ */}
      <div className="relative bg-[#0f1e0e] overflow-hidden">
        {/* Background collage */}
        <div className="absolute inset-0 grid grid-cols-4 opacity-20">
          {archive.slice(0, 4).map((e, i) => (
            <div key={i} className="overflow-hidden">
              <img src={e.imageUrl} alt="" className="w-full h-full object-cover" aria-hidden />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1e0e]/60 via-[#0f1e0e]/80 to-[#0f1e0e]" />

        <div className="relative z-10 page-container pt-28 pb-16 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c9942a]/30 bg-[#c9942a]/10 text-[#f5c06a] text-[11px] font-medium tracking-widest uppercase mb-5 sm:mb-6">
            <Sparkles size={11} />
            Digital Museum &amp; Cultural Archive
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-5 sm:mb-6 max-w-4xl mx-auto">
            Discover the Stories
            <br className="hidden sm:inline" />{' '}
            <span className="text-[#c9942a]">Behind Our Heritage</span>
          </h1>

          <p className="text-white/75 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
            An online cultural exhibition of tangible objects from Bulacan's festivals and living traditions — documented, preserved, and made available for communities to borrow, celebrate with, and learn from.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto mb-6 sm:mb-8">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9e9e8f]" />
            <input
              id="museum-search-main"
              ref={searchRef}
              type="text"
              placeholder="Search by material, festival, community, or tag…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 sm:py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#c9942a]/50 focus:bg-white/15 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm">
            <span className="text-white/50">{archive.length} archive entries</span>
            <span className="text-white/30">·</span>
            <span className="text-white/50">{MUSEUM_CATEGORIES.length - 1} categories</span>
            <span className="text-white/30">·</span>
            <span className="text-white/50">{archive.filter(e => e.isFeatured).length} featured objects</span>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative h-12 overflow-hidden">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path d="M0,48 L0,24 Q360,0 720,24 Q1080,48 1440,24 L1440,48 Z" fill="#faf7f2" />
          </svg>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          FILTERS + GALLERY
      ══════════════════════════════════════════════════ */}
      <div className="bg-[#faf7f2]">
        <div className="page-container py-12">

          {/* Category filter bar */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold text-[#9e9e8f] uppercase tracking-widest mr-2 hidden sm:block">
                <Filter size={12} className="inline mb-0.5 mr-1" />Filter
              </span>
              {MUSEUM_CATEGORIES.map(cat => {
                const cs = cat !== 'All' ? catStyle(cat) : null;
                const isActive = category === cat;
                return (
                  <button
                    key={cat}
                    id={`filter-${cat.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`}
                    onClick={() => setCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'text-white shadow-sm scale-105'
                        : 'bg-white text-[#6b6b5e] border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                    style={isActive ? { backgroundColor: cat === 'All' ? '#1e3d1a' : cs?.bg } : {}}
                  >
                    {cat}
                    <span className={`ml-1.5 text-[10px] ${isActive ? 'opacity-70' : 'text-[#9e9e8f]'}`}>
                      ({catCounts[cat]})
                    </span>
                  </button>
                );
              })}

              {(search || category !== 'All') && (
                <button
                  onClick={() => { setSearch(''); setCategory('All'); }}
                  className="ml-auto flex items-center gap-1 text-xs text-[#b5603a] font-semibold hover:text-[#1a1a18] transition-colors"
                >
                  <X size={12} /> Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Results count */}
          {(search || category !== 'All') && (
            <p className="text-sm text-[#9e9e8f] mb-6">
              Showing <span className="font-semibold text-[#1a1a18]">{filtered.length}</span> of {archive.length} entries
              {category !== 'All' && <span> in <span className="font-semibold text-[#1a1a18]">{category}</span></span>}
              {search && <span> matching "<span className="font-semibold text-[#1a1a18]">{search}</span>"</span>}
            </p>
          )}

          {/* Featured collection — only when no filters */}
          {!search && category === 'All' && (
            <FeaturedStrip entries={archive} onOpen={setSelected} />
          )}

          {/* Gallery grid */}
          <div ref={galleryRef}>
            {!search && category === 'All' && (
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-serif text-2xl font-bold text-[#1a1a18]">Full Collection</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[#e0d8cc] to-transparent" />
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-16 h-16 rounded-full bg-[#f0ebe0] flex items-center justify-center mx-auto mb-5">
                  <BookOpen size={28} className="text-[#9e9e8f]" />
                </div>
                <h3 className="font-serif text-2xl text-[#1a1a18] mb-2">No entries found</h3>
                <p className="text-[#6b6b5e] text-sm mb-5">
                  Try a different search term or browse all categories.
                </p>
                <button
                  onClick={() => { setSearch(''); setCategory('All'); }}
                  className="px-5 py-2.5 bg-[#1e3d1a] text-white rounded-full text-sm font-semibold hover:bg-[#2d5a27] transition-colors"
                >
                  View all entries
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((entry, i) => (
                  <ArchiveCard
                    key={entry.id}
                    entry={entry}
                    onClick={setSelected}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Youth section */}
          <YouthSection onExplore={() => { setCategory('All'); setSearch(''); scrollToGallery(); }} />

          {/* Disclaimer */}
          <div className="mt-12 border-t border-[#e0d8cc] pt-8 flex items-start gap-3">
            <Info size={14} className="text-[#9e9e8f] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#9e9e8f] leading-relaxed">
              <span className="font-bold text-[#6b6b5e]">About this Archive</span> — All entries in the LIKHAYON Digital Museum are fictional sample records created for prototype demonstration purposes. Cultural descriptions are illustrative and should not be cited as verified historical or anthropological fact. Real cultural documentation would require consultation with historians, community elders, and accredited cultural institutions.
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          DETAIL MODAL
      ══════════════════════════════════════════════════ */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title=""
        size="lg"
      >
        <EntryDetail
          entry={selected}
          linkedMaterial={linkedMaterial}
        />
      </Modal>
    </div>
  );
}
