// src/pages/MaterialsBank.jsx
// LIKHAYON — Materials Bank catalog page
import { useState, useRef, useMemo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search, X, SlidersHorizontal, Package, MapPin, Star,
  ArrowRight, ChevronRight, Info, BookOpen, Wrench,
  AlertTriangle, ExternalLink, ShoppingBag, Filter,
  CheckCircle, ChevronDown, LayoutGrid, List,
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { CATEGORIES, CONDITIONS } from '../data/materials';
import Modal from '../components/ui/Modal';

/* ─────────────────────────────────────────────────────────────────
   AVAILABILITY HELPERS
───────────────────────────────────────────────────────────────── */
function getAvailStatus(available, quantity) {
  if (quantity === 0) return { label: 'Not in Collection', cls: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400', ring: 'border-gray-200' };
  if (available === 0) return { label: 'All On Loan', cls: 'bg-red-100 text-red-700', dot: 'bg-red-500', ring: 'border-red-200' };
  const pct = available / quantity;
  if (pct <= 0.3) return { label: 'Limited Available', cls: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500', ring: 'border-orange-200' };
  return { label: 'Available', cls: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', ring: 'border-emerald-200' };
}

function AvailBadge({ available, quantity, showCount = true }) {
  const s = getAvailStatus(available, quantity);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${s.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      {showCount ? `${available} / ${quantity}` : s.label}
    </span>
  );
}

function ConditionBadge({ condition }) {
  const map = {
    Excellent: 'text-emerald-700 bg-emerald-50',
    'Very Good': 'text-green-700 bg-green-50',
    Good: 'text-yellow-700 bg-yellow-50',
    Fair: 'text-orange-700 bg-orange-50',
    'Needs Repair': 'text-red-700 bg-red-50',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${map[condition] || 'bg-gray-100 text-gray-600'}`}>
      {condition}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CATEGORY COLORS
───────────────────────────────────────────────────────────────── */
const CAT_COLOR = {
  'Bamboo Structures':   '#2d5a27',
  'Floral Decorations':  '#b5603a',
  'Ritual Props':        '#6b4f8b',
  'Costumes & Textiles': '#2a6b7a',
  'Lighting & Lanterns': '#c9942a',
  'Floats & Platforms':  '#1a4a54',
  'Banners & Signage':   '#8b4428',
  'Audio & Performance': '#4a3563',
  'Woven & Craft Items': '#5a3d1a',
};
function catColor(cat) { return CAT_COLOR[cat] || '#6b6b5e'; }

/* ─────────────────────────────────────────────────────────────────
   MATERIAL CARD (grid view)
───────────────────────────────────────────────────────────────── */
function MaterialCard({ mat, onView, onBorrow, index }) {
  const avail = getAvailStatus(mat.available, mat.quantity);
  const canBorrow = mat.available > 0;
  const color = catColor(mat.category);

  return (
    <article
      id={`mat-card-${mat.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-[#e8e0d4] flex-shrink-0">
        <img
          src={mat.imageUrl}
          alt={mat.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
          loading={index < 6 ? 'eager' : 'lazy'}
          onError={e => { e.target.src = '/images/materials/kawayan-arch.jpg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {mat.featured && (
          <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[#c9942a] flex items-center justify-center shadow">
            <Star size={12} className="text-white fill-white" />
          </div>
        )}

        {/* Category label */}
        <span
          className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-sm"
          style={{ backgroundColor: `${color}cc` }}
        >
          {mat.category}
        </span>

        {/* Availability overlay bottom */}
        <div className="absolute bottom-2.5 left-2.5">
          <AvailBadge available={mat.available} quantity={mat.quantity} showCount={true} />
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-serif font-bold text-[#1a1a18] text-sm leading-snug mb-1.5 group-hover:text-[#2d5a27] transition-colors line-clamp-2">
          {mat.name}
        </h3>

        {/* Origin / festival */}
        <div className="flex items-start gap-1 text-[11px] text-[#9e9e8f] mb-1">
          <MapPin size={10} className="mt-0.5 flex-shrink-0" />
          <span className="line-clamp-1">{mat.origin} · {mat.festival}</span>
        </div>

        {/* Condition */}
        <div className="flex items-center gap-2 mb-3">
          <ConditionBadge condition={mat.condition} />
          <span className="text-[11px] text-[#9e9e8f]">{mat.unit}</span>
        </div>

        {/* Qty bar */}
        <div className="mb-4">
          <div className="flex justify-between text-[10px] text-[#9e9e8f] mb-1">
            <span>Available</span>
            <span className="font-semibold text-[#1a1a18]">{mat.available} of {mat.quantity}</span>
          </div>
          <div className="h-1.5 bg-[#f0ebe0] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: mat.quantity ? `${(mat.available / mat.quantity) * 100}%` : '0%',
                backgroundColor: mat.available === 0 ? '#ef4444' : mat.available / mat.quantity <= 0.3 ? '#f97316' : '#22c55e',
              }}
            />
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-50">
          <button
            id={`view-mat-${mat.id}`}
            onClick={() => onView(mat)}
            className="flex-1 py-2 border border-gray-200 text-[#1a1a18] rounded-xl text-xs font-semibold hover:bg-[#f0ebe0] hover:border-[#d4c9b8] transition-colors flex items-center justify-center gap-1"
          >
            <Info size={12} /> Details
          </button>
          <button
            id={`borrow-mat-${mat.id}`}
            onClick={() => onBorrow(mat)}
            disabled={!canBorrow}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 ${
              canBorrow
                ? 'bg-[#1e3d1a] text-white hover:bg-[#2d5a27]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingBag size={12} /> {canBorrow ? 'Borrow' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MATERIAL CARD (list view)
───────────────────────────────────────────────────────────────── */
function MaterialRow({ mat, onView, onBorrow }) {
  const canBorrow = mat.available > 0;
  const color = catColor(mat.category);

  return (
    <div
      id={`mat-row-${mat.id}`}
      className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-[#e0d8cc] transition-all duration-200 flex items-center gap-4"
    >
      <img
        src={mat.imageUrl}
        alt={mat.name}
        className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-[#e8e0d4]"
        loading="lazy"
        onError={e => { e.target.src = '/images/materials/kawayan-arch.jpg'; }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap mb-1">
          <h3 className="font-serif font-bold text-[#1a1a18] text-sm group-hover:text-[#2d5a27] transition-colors">{mat.name}</h3>
          {mat.featured && <Star size={11} className="text-[#c9942a] fill-[#c9942a] mt-0.5" />}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="px-2 py-0.5 rounded-md text-white text-[10px] font-bold" style={{ backgroundColor: color }}>{mat.category}</span>
          <ConditionBadge condition={mat.condition} />
          <span className="text-[#9e9e8f] flex items-center gap-1"><MapPin size={9} />{mat.origin}</span>
        </div>
      </div>
      <div className="flex-shrink-0 text-right hidden sm:block">
        <AvailBadge available={mat.available} quantity={mat.quantity} showCount={true} />
        <p className="text-[10px] text-[#9e9e8f] mt-1">per {mat.unit}</p>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button onClick={() => onView(mat)} className="p-2 border border-gray-200 rounded-lg text-[#6b6b5e] hover:bg-[#f0ebe0] transition-colors">
          <Info size={14} />
        </button>
        <button
          onClick={() => onBorrow(mat)}
          disabled={!canBorrow}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${canBorrow ? 'bg-[#1e3d1a] text-white hover:bg-[#2d5a27]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          {canBorrow ? 'Borrow' : 'On Loan'}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DETAIL MODAL CONTENT
───────────────────────────────────────────────────────────────── */
function MaterialDetail({ mat, archiveEntry, onBorrow }) {
  if (!mat) return null;
  const avail = getAvailStatus(mat.available, mat.quantity);
  const canBorrow = mat.available > 0;
  const color = catColor(mat.category);

  return (
    <div>
      {/* Hero image */}
      <div className="relative h-60 -mx-6 -mt-0 mb-6 overflow-hidden rounded-xl">
        <img
          src={mat.imageUrl}
          alt={mat.name}
          className="w-full h-full object-cover"
          onError={e => { e.target.src = '/images/materials/kawayan-arch.jpg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <span
            className="inline-block px-2.5 py-0.5 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider mb-2"
            style={{ backgroundColor: `${color}cc` }}
          >
            {mat.category}
          </span>
          <h2 className="font-serif text-2xl font-bold text-white leading-tight">{mat.name}</h2>
        </div>
      </div>

      {/* Proposed initiative note */}
      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-5">
        <AlertTriangle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-amber-800 text-xs leading-relaxed">
          <span className="font-bold">Proposed Collection</span> — LIKHAYON is a proposed initiative. These materials are not yet physically in stock. Availability figures reflect the projected inventory upon launch. {mat.sourceNote}
        </p>
      </div>

      {/* Availability banner */}
      <div className={`flex items-center justify-between px-4 py-3 rounded-xl mb-5 border ${avail.ring}`}>
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${avail.dot}`} />
          <span className="font-semibold text-sm text-[#1a1a18]">{avail.label}</span>
        </div>
        <div className="text-right">
          <p className="text-lg font-serif font-bold text-[#1a1a18]">{mat.available} <span className="text-sm font-normal text-[#9e9e8f]">of {mat.quantity} {mat.unit}s</span></p>
        </div>
      </div>

      {/* Quantity bar */}
      <div className="mb-5">
        <div className="h-2 bg-[#f0ebe0] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: mat.quantity ? `${(mat.available / mat.quantity) * 100}%` : '0%',
              backgroundColor: mat.available === 0 ? '#ef4444' : mat.available / mat.quantity <= 0.3 ? '#f97316' : '#22c55e',
              transition: 'width 0.6s ease',
            }}
          />
        </div>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
        {[
          { label: 'Category', value: mat.category },
          { label: 'Condition', value: <ConditionBadge condition={mat.condition} /> },
          { label: 'Unit', value: mat.unit },
          { label: 'Total Quantity', value: `${mat.quantity} ${mat.unit}s` },
          { label: 'Origin', value: mat.origin },
          { label: 'Date Added', value: mat.addedDate },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#f9f7f4] rounded-xl p-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#9e9e8f] mb-1">{label}</p>
            {typeof value === 'string'
              ? <p className="text-xs font-semibold text-[#1a1a18] leading-snug">{value}</p>
              : value
            }
          </div>
        ))}
      </div>

      {/* Dimensions / weight */}
      {(mat.dimensions || mat.weight) && (
        <div className="flex gap-4 mb-5 p-3.5 bg-[#f0ebe0] rounded-xl">
          {mat.dimensions && (
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#9e9e8f] mb-0.5">Dimensions</p>
              <p className="text-xs text-[#1a1a18] font-medium">{mat.dimensions}</p>
            </div>
          )}
          {mat.weight && (
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#9e9e8f] mb-0.5">Weight</p>
              <p className="text-xs text-[#1a1a18] font-medium">{mat.weight}</p>
            </div>
          )}
        </div>
      )}

      {/* Description */}
      <div className="mb-5">
        <h4 className="font-serif font-bold text-[#1a1a18] mb-2.5 flex items-center gap-2">
          <Package size={15} className="text-[#c9942a]" /> About This Material
        </h4>
        <p className="text-[#6b6b5e] text-sm leading-relaxed">{mat.description}</p>
      </div>

      {/* Associated festival */}
      <div className="mb-5 p-4 border-l-4 border-[#c9942a] bg-[#fdf6e8] rounded-r-xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9942a] mb-1">Associated Festival / Source</p>
        <p className="text-sm font-semibold text-[#1a1a18]">{mat.festival}</p>
        <p className="text-xs text-[#9e9e8f] flex items-center gap-1 mt-0.5"><MapPin size={10} />{mat.origin}</p>
      </div>

      {/* Usage notes */}
      {mat.usageNotes && (
        <div className="mb-5">
          <h4 className="font-serif font-bold text-[#1a1a18] mb-2.5 flex items-center gap-2">
            <Info size={15} className="text-[#2d5a27]" /> Usage Notes
          </h4>
          <p className="text-[#6b6b5e] text-sm leading-relaxed">{mat.usageNotes}</p>
        </div>
      )}

      {/* Handling instructions */}
      {mat.handlingInstructions && (
        <div className="mb-5 bg-[#f9f7f4] rounded-xl p-4">
          <h4 className="font-serif font-bold text-[#1a1a18] mb-2.5 flex items-center gap-2">
            <Wrench size={15} className="text-[#6b4f8b]" /> Handling & Storage
          </h4>
          <p className="text-[#6b6b5e] text-sm leading-relaxed">{mat.handlingInstructions}</p>
        </div>
      )}

      {/* Admin notes */}
      {mat.notes && (
        <div className="mb-5 flex items-start gap-2 text-xs text-[#6b6b5e] bg-[#f0ebe0] rounded-xl p-3.5">
          <Info size={13} className="text-[#9e9e8f] flex-shrink-0 mt-0.5" />
          <span>{mat.notes}</span>
        </div>
      )}

      {/* Tags */}
      {mat.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {mat.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-[#f0ebe0] text-[#6b6b5e] rounded-full text-[10px] font-medium">#{tag}</span>
          ))}
        </div>
      )}

      {/* Linked archive entry */}
      {archiveEntry && (
        <div className="mb-5 border border-[#c9942a]/25 rounded-xl overflow-hidden">
          <div className="bg-[#fdf6e8] px-4 py-2.5 flex items-center gap-2">
            <BookOpen size={13} className="text-[#c9942a]" />
            <span className="text-[11px] font-bold text-[#c9942a] uppercase tracking-wider">Cultural Archive Entry</span>
          </div>
          <div className="p-4 flex gap-3 items-start">
            <img
              src={archiveEntry.imageUrl}
              alt={archiveEntry.title}
              className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <p className="font-serif font-semibold text-[#1a1a18] text-sm">{archiveEntry.title}</p>
              <p className="text-xs text-[#9e9e8f] mt-0.5">{archiveEntry.community}</p>
              <p className="text-xs text-[#6b6b5e] mt-1 line-clamp-2">{archiveEntry.description}</p>
            </div>
          </div>
          <div className="px-4 pb-4">
            <Link
              to={`/museum?id=${archiveEntry.id}`}
              className="inline-flex items-center gap-1.5 text-xs text-[#2d5a27] font-semibold hover:text-[#c9942a] transition-colors"
            >
              Read the full archive entry <ExternalLink size={11} />
            </Link>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button
          id={`detail-borrow-${mat.id}`}
          onClick={onBorrow}
          disabled={!canBorrow}
          className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
            canBorrow
              ? 'bg-[#1e3d1a] text-white hover:bg-[#2d5a27]'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingBag size={15} />
          {canBorrow ? 'Request to Borrow' : 'Currently Unavailable'}
        </button>
        <Link
          to={archiveEntry ? `/museum?id=${archiveEntry.id}` : '/museum'}
          className="px-4 py-3 border border-gray-200 text-[#6b6b5e] rounded-xl text-sm font-medium hover:bg-[#f0ebe0] transition-colors flex items-center gap-1.5"
        >
          <BookOpen size={14} /> Archive
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────── */
export default function MaterialsBank() {
  const { materials, archive, getReservedCount } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Search and filter states
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [condFilter, setCondFilter] = useState('All');
  const [availFilter, setAvailFilter] = useState('all'); // 'all' | 'available' | 'unavailable'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'name' | 'available' | 'condition'
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState(null);

  const topRef = useRef(null);

  // Auto-select or filter from URL search params (?id=... &category=... &search=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idParam = params.get('id');
    const catParam = params.get('category');
    const qParam = params.get('search');
    if (idParam) {
      const match = materials.find(m => m.id === idParam);
      if (match) setSelected(match);
    }
    if (catParam) setCatFilter(catParam);
    if (qParam) setSearch(qParam);
  }, [location.search, materials]);

  // Filtered + sorted materials
  const filtered = useMemo(() => {
    let list = [...materials];
    const q = search.toLowerCase().trim();

    if (q) {
      list = list.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.origin?.toLowerCase().includes(q) ||
        m.festival?.toLowerCase().includes(q) ||
        m.tags?.some(t => t.toLowerCase().includes(q))
      );
    }
    if (catFilter !== 'All') list = list.filter(m => m.category === catFilter);
    if (condFilter !== 'All') list = list.filter(m => m.condition === condFilter);
    if (availFilter === 'available') list = list.filter(m => m.available > 0);
    if (availFilter === 'unavailable') list = list.filter(m => m.available === 0);

    const COND_ORDER = { Excellent: 0, 'Very Good': 1, Good: 2, Fair: 3, 'Needs Repair': 4 };
    if (sortBy === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'available') list.sort((a, b) => b.available - a.available);
    else if (sortBy === 'condition') list.sort((a, b) => (COND_ORDER[a.condition] ?? 9) - (COND_ORDER[b.condition] ?? 9));
    else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return list;
  }, [materials, search, catFilter, condFilter, availFilter, sortBy]);

  // Summary stats
  const totalItems = materials.reduce((s, m) => s + m.quantity, 0);
  const totalAvail = materials.reduce((s, m) => s + m.available, 0);
  const onLoan = totalItems - totalAvail;
  const activeFilters = [catFilter !== 'All', condFilter !== 'All', availFilter !== 'all', !!search].filter(Boolean).length;

  function clearFilters() {
    setSearch('');
    setCatFilter('All');
    setCondFilter('All');
    setAvailFilter('all');
  }

  function handleBorrow(mat) {
    setSelected(null);
    navigate(`/borrow?materialId=${mat.id}&materialName=${encodeURIComponent(mat.name)}`);
  }

  function handleViewDetail(mat) {
    setSelected(mat);
  }

  const selectedArchiveEntry = selected?.archiveEntryId
    ? archive.find(a => a.id === selected.archiveEntryId)
    : null;

  return (
    <div className="page-enter" ref={topRef}>

      {/* ══════════════════════════════════════════════════
          PAGE HEADER
      ══════════════════════════════════════════════════ */}
      <div className="bg-[#1a2e18] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=1400&q=40')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e18] via-[#1a2e18]/90 to-[#1a2e18]/70" />

        <div className="relative z-10 page-container pt-28 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c9942a]/30 bg-[#c9942a]/10 text-[#f5c06a] text-[11px] font-medium tracking-widest uppercase mb-4 sm:mb-5">
                <Package size={11} /> Materials Bank
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight tracking-tight">
                Community Materials
                <br className="hidden sm:inline" />{' '}
                <span className="text-[#c9942a]">Catalog</span>
              </h1>
              <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-lg mb-5">
                A searchable catalog of reusable cultural materials collected from festivals and community events across Bulacan. Available to schools, parishes, and community organizations for free.
              </p>
              {/* Proposed notice */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/70 text-xs">
                <AlertTriangle size={12} className="text-amber-400 flex-shrink-0" />
                <span>Proposed collection — materials not yet physically in stock</span>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { value: materials.length, label: 'Material Types', color: '#c9942a' },
                { value: totalAvail, label: 'Units Available', color: '#4ade80' },
                { value: onLoan, label: 'Currently On Loan', color: '#f87171' },
              ].map(s => (
                <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3.5 sm:p-5 text-center flex flex-col justify-center">
                  <p className="font-serif text-2xl sm:text-3xl font-bold tracking-tight leading-none mb-1.5" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-white/70 text-[11px] sm:text-xs leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-8 relative max-w-2xl">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              id="materials-search"
              type="text"
              placeholder="Search by name, category, festival, origin, or tag…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-white/35 text-sm focus:outline-none focus:border-[#c9942a]/50 focus:bg-white/15 transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          FILTER BAR + CATALOG
      ══════════════════════════════════════════════════ */}
      <div className="bg-[#faf7f2] min-h-screen">
        {/* Sticky filter bar */}
        <div className="bg-white border-b border-gray-200 sticky top-[68px] z-20">
          <div className="page-container py-3 flex flex-wrap gap-3 items-center">

            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5 flex-1">
              {CATEGORIES.slice(0, 5).map(cat => (
                <button
                  key={cat}
                  id={`cat-filter-${cat.toLowerCase().replace(/[ &]/g, '-')}`}
                  onClick={() => setCatFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    catFilter === cat
                      ? 'bg-[#1e3d1a] text-white'
                      : 'bg-[#f0ebe0] text-[#6b6b5e] hover:bg-[#e0d8cc]'
                  }`}
                >
                  {cat}
                </button>
              ))}
              {/* More categories dropdown trigger */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                  showFilters || activeFilters > 0
                    ? 'bg-[#c9942a] text-white'
                    : 'bg-[#f0ebe0] text-[#6b6b5e] hover:bg-[#e0d8cc]'
                }`}
              >
                <SlidersHorizontal size={11} />
                More {activeFilters > 0 && `(${activeFilters})`}
                <ChevronDown size={11} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Right: sort + view */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <select
                id="materials-sort"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-[#6b6b5e] focus:outline-none focus:border-[#3d7a35] bg-white"
              >
                <option value="default">Sort: Featured</option>
                <option value="name">Sort: Name A–Z</option>
                <option value="available">Sort: Most Available</option>
                <option value="condition">Sort: Best Condition</option>
              </select>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  id="view-grid"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 ${viewMode === 'grid' ? 'bg-[#1e3d1a] text-white' : 'text-[#9e9e8f] hover:bg-[#f0ebe0]'}`}
                >
                  <LayoutGrid size={14} />
                </button>
                <button
                  id="view-list"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 ${viewMode === 'list' ? 'bg-[#1e3d1a] text-white' : 'text-[#9e9e8f] hover:bg-[#f0ebe0]'}`}
                >
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded filter panel */}
          {showFilters && (
            <div className="border-t border-gray-100 bg-[#faf7f2]">
              <div className="page-container py-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                  {/* All categories */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e8f] mb-2">Category</p>
                    <div className="flex flex-wrap gap-1.5">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setCatFilter(cat)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                            catFilter === cat ? 'bg-[#1e3d1a] text-white' : 'bg-white border border-gray-200 text-[#6b6b5e] hover:border-gray-300'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Condition */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e8f] mb-2">Condition</p>
                    <div className="flex flex-wrap gap-1.5">
                      {CONDITIONS.map(c => (
                        <button
                          key={c}
                          id={`cond-filter-${c.toLowerCase().replace(/ /g, '-')}`}
                          onClick={() => setCondFilter(c)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                            condFilter === c ? 'bg-[#1e3d1a] text-white' : 'bg-white border border-gray-200 text-[#6b6b5e] hover:border-gray-300'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e8f] mb-2">Availability</p>
                    <div className="flex flex-wrap gap-1.5">
                      {[['all', 'All Items'], ['available', 'Available Now'], ['unavailable', 'Currently On Loan']].map(([val, label]) => (
                        <button
                          key={val}
                          id={`avail-filter-${val}`}
                          onClick={() => setAvailFilter(val)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                            availFilter === val ? 'bg-[#1e3d1a] text-white' : 'bg-white border border-gray-200 text-[#6b6b5e] hover:border-gray-300'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {activeFilters > 0 && (
                  <button onClick={clearFilters} className="mt-4 text-xs text-[#b5603a] font-semibold flex items-center gap-1 hover:text-[#1a1a18] transition-colors">
                    <X size={12} /> Clear all filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Catalog body */}
        <div className="page-container py-8">

          {/* Results header */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <p className="text-sm text-[#9e9e8f]">
              Showing <span className="font-semibold text-[#1a1a18]">{filtered.length}</span> of {materials.length} materials
              {catFilter !== 'All' && <span> in <span className="font-semibold text-[#1a1a18]">{catFilter}</span></span>}
              {search && <span> matching "<span className="font-semibold text-[#1a1a18]">{search}</span>"</span>}
            </p>
            {activeFilters > 0 && (
              <button onClick={clearFilters} className="text-xs text-[#b5603a] font-semibold flex items-center gap-1">
                <X size={11} /> Clear filters
              </button>
            )}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-full bg-[#f0ebe0] flex items-center justify-center mx-auto mb-5">
                <Package size={28} className="text-[#9e9e8f]" />
              </div>
              <h3 className="font-serif text-2xl text-[#1a1a18] mb-2">No materials found</h3>
              <p className="text-[#6b6b5e] text-sm mb-5">Try adjusting your search or filters.</p>
              <button onClick={clearFilters} className="px-5 py-2.5 bg-[#1e3d1a] text-white rounded-full text-sm font-semibold hover:bg-[#2d5a27] transition-colors">
                View all materials
              </button>
            </div>
          )}

          {/* Grid view */}
          {filtered.length > 0 && viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((mat, i) => (
                <MaterialCard
                  key={mat.id}
                  mat={mat}
                  onView={handleViewDetail}
                  onBorrow={handleBorrow}
                  index={i}
                />
              ))}
            </div>
          )}

          {/* List view */}
          {filtered.length > 0 && viewMode === 'list' && (
            <div className="space-y-3">
              {filtered.map(mat => (
                <MaterialRow
                  key={mat.id}
                  mat={mat}
                  onView={handleViewDetail}
                  onBorrow={handleBorrow}
                />
              ))}
            </div>
          )}

          {/* Inventory legend */}
          <div className="mt-14 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-serif font-bold text-[#1a1a18] mb-4 flex items-center gap-2">
              <CheckCircle size={16} className="text-[#2d5a27]" /> Understanding Availability
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-[#6b6b5e]">
              <div className="flex items-start gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#1a1a18] text-xs mb-0.5">Available</p>
                  <p className="text-xs">Units that can be requested right now. Availability decreases only when a request is approved by an admin — not when it is submitted.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-3 h-3 rounded-full bg-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#1a1a18] text-xs mb-0.5">Limited Available</p>
                  <p className="text-xs">30% or fewer units remain. Submit your request early to secure access for your event.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#1a1a18] text-xs mb-0.5">All On Loan</p>
                  <p className="text-xs">All units are currently allocated to approved borrowers. You may still submit a request — contact us if your timeline is urgent.</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-[#9e9e8f] flex items-start gap-1.5">
                <AlertTriangle size={12} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <span><strong>Proposed initiative:</strong> LIKHAYON has not yet launched. The inventory figures above are projected quantities upon launch. Materials are not currently in physical storage.</span>
              </p>
            </div>
          </div>

          {/* Borrow CTA */}
          <div className="mt-8 bg-[#1e3d1a] rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10">
              <h3 className="font-serif text-2xl font-bold text-white mb-3">Ready to Request Materials?</h3>
              <p className="text-white/65 text-sm mb-6 max-w-md mx-auto">
                Fill out the borrowing request form to secure materials for your festival, school event, or community celebration.
              </p>
              <Link
                to="/borrow"
                id="catalog-borrow-cta"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#c9942a] text-white font-semibold rounded-full hover:bg-[#d4a843] transition-colors text-sm shadow-lg"
              >
                Submit a Borrowing Request <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          MATERIAL DETAIL MODAL
      ══════════════════════════════════════════════════ */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title=""
        size="lg"
      >
        <MaterialDetail
          mat={selected}
          archiveEntry={selectedArchiveEntry}
          onBorrow={() => selected && handleBorrow(selected)}
        />
      </Modal>
    </div>
  );
}
