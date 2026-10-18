// src/pages/RequestTracker.jsx
// LIKHAYON — Request Tracking Page
// ⚠ PROTOTYPE ONLY. No real emails or live data.
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Search, AlertTriangle, CheckCircle, XCircle, Clock,
  RotateCcw, Package, Calendar, User, Building, MapPin,
  FileText, Info, ArrowRight, Clipboard, RefreshCw, X,
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { formatDate, formatDateTime } from '../utils/helpers';

/* ─────────────────────────────────────────────────────────────────
   STATUS CONFIG
───────────────────────────────────────────────────────────────── */
const STATUS_CONFIG = {
  Pending: {
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
    dot: 'bg-amber-500',
    label: 'Pending Review',
    description: 'Your request has been received and is awaiting review by the LIKHAYON admin team.',
  },
  Approved: {
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-800',
    dot: 'bg-emerald-500',
    label: 'Approved',
    description: 'Your request has been approved. Materials have been reserved for you. Please coordinate pickup.',
  },
  Rejected: {
    icon: XCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-800',
    dot: 'bg-red-500',
    label: 'Rejected',
    description: 'Your request was not approved this time. Please see the admin notes below for details.',
  },
  Returned: {
    icon: RotateCcw,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-800',
    dot: 'bg-blue-500',
    label: 'Returned',
    description: 'Materials have been returned. Thank you for participating in the LIKHAYON community program!',
  },
  Cancelled: {
    icon: X,
    color: 'text-gray-500',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    badge: 'bg-gray-100 text-gray-700',
    dot: 'bg-gray-400',
    label: 'Cancelled',
    description: 'This borrowing request has been cancelled.',
  },
};

/* ─────────────────────────────────────────────────────────────────
   TIMELINE STEP
───────────────────────────────────────────────────────────────── */
function TimelineStep({ done, active, icon: Icon, label, date, last }) {
  return (
    <div className={`flex gap-4 ${!last ? 'pb-6' : ''}`}>
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
          done ? 'bg-[#1e3d1a] border-[#1e3d1a]' : active ? 'bg-white border-[#c9942a] shadow-md shadow-[#c9942a]/20' : 'bg-white border-[#e0d8cc]'
        }`}>
          <Icon size={15} className={done ? 'text-white' : active ? 'text-[#c9942a]' : 'text-[#c0b9ad]'} />
        </div>
        {!last && <div className={`flex-1 w-0.5 mt-1 ${done ? 'bg-[#1e3d1a]' : 'bg-[#e0d8cc]'}`} />}
      </div>
      <div className="pb-1">
        <p className={`text-sm font-semibold ${done ? 'text-[#1a1a18]' : active ? 'text-[#c9942a]' : 'text-[#c0b9ad]'}`}>{label}</p>
        {date && <p className="text-xs text-[#9e9e8f] mt-0.5">{formatDateTime(date)}</p>}
        {active && !date && <p className="text-xs text-[#c9942a] mt-0.5">In progress…</p>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   RESULT CARD
───────────────────────────────────────────────────────────────── */
function RequestResult({ req, material }) {
  const cfg = STATUS_CONFIG[req.status] || STATUS_CONFIG.Pending;
  const StatusIcon = cfg.icon;

  // Timeline logic
  const isApproved = ['Approved', 'Returned'].includes(req.status);
  const isReturned = req.status === 'Returned';
  const isRejected = req.status === 'Rejected';
  const isCancelled = req.status === 'Cancelled';

  return (
    <div className="max-w-2xl mx-auto">
      {/* Status banner */}
      <div className={`rounded-2xl border p-5 mb-5 ${cfg.bg} ${cfg.border}`}>
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm`}>
            <StatusIcon size={20} className={cfg.color} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${cfg.badge}`}>{cfg.label}</span>
              <span className="text-[10px] text-[#9e9e8f] font-mono">{req.reference}</span>
            </div>
            <p className={`text-sm leading-relaxed ${cfg.color.replace('text-', 'text-').replace('600', '800')}`}>{cfg.description}</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
        <h3 className="font-serif font-bold text-[#1a1a18] mb-5 text-sm">Request Timeline</h3>
        <TimelineStep
          done={true}
          icon={FileText}
          label="Request Submitted"
          date={req.submittedAt}
        />
        <TimelineStep
          done={isApproved || isRejected || isCancelled}
          active={req.status === 'Pending'}
          icon={isRejected ? XCircle : isCancelled ? X : CheckCircle}
          label={isRejected ? 'Request Rejected' : isCancelled ? 'Request Cancelled' : 'Request Approved'}
          date={req.reviewedAt || req.cancelledAt}
        />
        {!isRejected && !isCancelled && (
          <TimelineStep
            done={isReturned}
            active={isApproved && !isReturned}
            icon={RotateCcw}
            label="Materials Returned"
            date={req.returnedAt}
            last
          />
        )}
        {(isRejected || isCancelled) && (
          <TimelineStep
            done={false}
            active={false}
            icon={RotateCcw}
            label="Materials Returned"
            date={null}
            last
          />
        )}
      </div>

      {/* Details */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
        <h3 className="font-serif font-bold text-[#1a1a18] mb-5 text-sm">Request Details</h3>
        <div className="space-y-3">
          {/* Material */}
          {material && (
            <div className="flex gap-3 items-center p-3 bg-[#f9f7f4] rounded-xl">
              <img
                src={material.imageUrl}
                alt={material.name}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=80&q=60'; }}
              />
              <div>
                <p className="text-sm font-serif font-bold text-[#1a1a18]">{material.name}</p>
                <p className="text-xs text-[#9e9e8f] flex items-center gap-1 mt-0.5">
                  <MapPin size={10} /> {material.origin} · {material.category}
                </p>
              </div>
              <Link to="/materials" className="ml-auto text-xs text-[#2d5a27] hover:text-[#c9942a] transition-colors flex items-center gap-1">
                View <ArrowRight size={10} />
              </Link>
            </div>
          )}

          {[
            ['Quantity Requested', `${req.quantity} ${material?.unit || 'unit'}${req.quantity !== 1 ? 's' : ''}`],
            ['Organization', req.organization],
            ['Org Type', req.orgType],
            ['Contact Person', req.contactPerson],
            ['Contact Email', req.contactEmail],
            ['Festival / Activity', req.festival],
            ['Planned Pickup', formatDate(req.borrowDate)],
            ['Expected Return', formatDate(req.returnDate)],
          ].map(([label, val]) => val && (
            <div key={label} className="flex gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e8f] w-32 flex-shrink-0 pt-0.5">{label}</span>
              <span className="text-sm text-[#1a1a18]">{val}</span>
            </div>
          ))}
        </div>

        {/* Intended use */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e8f] mb-2">Purpose of Use</p>
          <p className="text-sm text-[#6b6b5e] leading-relaxed">{req.intendedUse}</p>
        </div>
        {req.additionalNotes && (
          <div className="mt-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e8f] mb-1">Additional Notes</p>
            <p className="text-sm text-[#6b6b5e] leading-relaxed">{req.additionalNotes}</p>
          </div>
        )}
      </div>

      {/* Admin review notes */}
      {req.reviewNotes && (
        <div className={`rounded-2xl border p-5 mb-5 ${isRejected ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <Info size={11} />
            {isRejected ? 'Rejection Reason' : 'Admin Notes'}
            {req.reviewedBy && <span className="font-normal normal-case text-[#9e9e8f]">— {req.reviewedBy} · {formatDateTime(req.reviewedAt)}</span>}
          </p>
          <p className="text-sm leading-relaxed">{req.reviewNotes}</p>
        </div>
      )}

      {/* Return notes */}
      {req.returnNotes && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 mb-2 flex items-center gap-1.5">
            <RotateCcw size={11} /> Return Record · {formatDateTime(req.returnedAt)}
          </p>
          <p className="text-sm text-emerald-800 leading-relaxed">{req.returnNotes}</p>
          {req.returnCondition && (
            <p className="text-xs text-emerald-700 mt-1.5">Condition on return: <strong>{req.returnCondition}</strong></p>
          )}
        </div>
      )}

      {/* Cancel notes */}
      {req.cancelNotes && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2 flex items-center gap-1.5">
            <X size={11} /> Cancellation Notes · {formatDateTime(req.cancelledAt)}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{req.cancelNotes}</p>
        </div>
      )}

      {/* What to do next */}
      {req.status === 'Approved' && (
        <div className="bg-[#1e3d1a] rounded-2xl p-5 text-white">
          <h3 className="font-serif font-semibold mb-2 text-[#c9942a] flex items-center gap-2">
            <CheckCircle size={15} /> Your Request is Approved — Next Steps
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-start gap-2"><span className="text-[#c9942a] mt-0.5 flex-shrink-0">→</span> Contact the LIKHAYON team to confirm your pickup schedule.</li>
            <li className="flex items-start gap-2"><span className="text-[#c9942a] mt-0.5 flex-shrink-0">→</span> Bring a valid ID and this reference number: <strong className="text-white">{req.reference}</strong></li>
            <li className="flex items-start gap-2"><span className="text-[#c9942a] mt-0.5 flex-shrink-0">→</span> Return materials by <strong className="text-white">{formatDate(req.returnDate)}</strong>.</li>
          </ul>
        </div>
      )}

      {req.status === 'Rejected' && (
        <div className="bg-[#f9f7f4] border border-[#e0d8cc] rounded-2xl p-5">
          <p className="text-sm text-[#6b6b5e] mb-3">You may submit a new request for a different date or material.</p>
          <Link to="/borrow" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1e3d1a] text-white rounded-xl text-sm font-semibold hover:bg-[#2d5a27] transition-colors">
            Submit a New Request <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────── */
export default function RequestTracker() {
  const { lookupRequest, materials } = useApp();
  const location = useLocation();

  const [refInput, setRefInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Pre-fill from URL query params (?ref=LKY-...&email=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get('ref') || '';
    const email = params.get('email') || '';
    if (ref) setRefInput(ref);
    if (email) setEmailInput(email);
    if (ref && email) {
      const found = lookupRequest(ref, email);
      setResult(found);
      setSearched(true);
      setNotFound(!found);
    }
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (!refInput.trim() || !emailInput.trim()) return;
    const found = lookupRequest(refInput.trim(), emailInput.trim());
    setResult(found);
    setSearched(true);
    setNotFound(!found);
  }

  function handleReset() {
    setRefInput('');
    setEmailInput('');
    setResult(null);
    setSearched(false);
    setNotFound(false);
  }

  const material = result ? materials.find(m => m.id === result.materialId) : null;

  return (
    <div className="page-enter">

      {/* ── Header ─────────────────────────────────────── */}
      <div className="bg-[#1a2e18] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=1200&q=30')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14">
          <p className="text-[#c9942a] text-xs font-semibold tracking-widest uppercase mb-3">Community Portal</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-3">Track Your Request</h1>
          <p className="text-white/65 max-w-xl text-sm leading-relaxed">
            Look up the status of a borrowing request using your reference number and the email address you used when submitting.
          </p>
        </div>
      </div>

      {/* ── Prototype notice ────────────────────────────── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-start gap-3">
          <AlertTriangle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 text-xs leading-snug">
            <strong>Prototype only.</strong> Requests are stored in this browser's localStorage. Only requests submitted in this browser session can be tracked here.
          </p>
        </div>
      </div>

      <div className="bg-[#faf7f2] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Search form ────────────────────────────────── */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#f0ebe0] flex items-center justify-center">
                  <Search size={18} className="text-[#c9942a]" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-[#1a1a18]">Look Up a Request</h2>
                  <p className="text-xs text-[#9e9e8f]">Enter your reference number and email to see your request status</p>
                </div>
              </div>

              <form id="tracker-form" onSubmit={handleSearch}>
                <div className="space-y-4 mb-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#9e9e8f] mb-1.5">
                      Reference Number
                    </label>
                    <div className="relative">
                      <Clipboard size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9e9e8f]" />
                      <input
                        id="tracker-ref"
                        type="text"
                        value={refInput}
                        onChange={e => { setRefInput(e.target.value.toUpperCase()); setSearched(false); }}
                        placeholder="e.g., LKY-202510-00001"
                        className="w-full pl-10 pr-4 py-3 border border-[#e0d8cc] rounded-xl text-sm font-mono focus:outline-none focus:border-[#3d7a35] focus:ring-2 focus:ring-[#3d7a35]/20 bg-white text-[#1a1a18] placeholder:text-[#c0b9ad] uppercase"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#9e9e8f] mb-1.5">
                      Contact Email
                    </label>
                    <div className="relative">
                      <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9e9e8f]" />
                      <input
                        id="tracker-email"
                        type="email"
                        value={emailInput}
                        onChange={e => { setEmailInput(e.target.value); setSearched(false); }}
                        placeholder="The email you used when submitting"
                        className="w-full pl-10 pr-4 py-3 border border-[#e0d8cc] rounded-xl text-sm focus:outline-none focus:border-[#3d7a35] focus:ring-2 focus:ring-[#3d7a35]/20 bg-white text-[#1a1a18] placeholder:text-[#c0b9ad]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    id="tracker-search-btn"
                    disabled={!refInput.trim() || !emailInput.trim()}
                    className="flex-1 py-3 bg-[#1e3d1a] text-white font-bold rounded-xl text-sm hover:bg-[#2d5a27] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Search size={15} /> Look Up Request
                  </button>
                  {searched && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-3 border border-gray-200 text-[#6b6b5e] rounded-xl text-sm hover:bg-[#f0ebe0] transition-colors flex items-center gap-1.5"
                    >
                      <RefreshCw size={13} /> Reset
                    </button>
                  )}
                </div>
              </form>

              {/* Demo hints */}
              <div className="mt-5 pt-5 border-t border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e8f] mb-2">Demo Reference Numbers</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { ref: 'LKY-202510-00001', email: 'ana.reyes@stmichaelobando.org', label: 'Approved' },
                    { ref: 'LKY-202510-00002', email: 'c.dimaculangan@mnhs.edu.ph', label: 'Pending' },
                    { ref: 'LKY-202510-00003', email: 'e.santos@bulsu.edu.ph', label: 'Returned' },
                    { ref: 'LKY-202508-00004', email: 'l.cruz@bces.deped.ph', label: 'Rejected' },
                  ].map(({ ref, email, label }) => (
                    <button
                      key={ref}
                      onClick={() => {
                        setRefInput(ref);
                        setEmailInput(email);
                        const found = lookupRequest(ref, email);
                        setResult(found);
                        setSearched(true);
                        setNotFound(!found);
                      }}
                      className="px-2.5 py-1 bg-[#f0ebe0] rounded-lg text-[10px] font-semibold text-[#6b6b5e] hover:bg-[#e0d8cc] transition-colors"
                    >
                      {label}: {ref}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Results ──────────────────────────────────── */}
          {searched && notFound && (
            <div className="max-w-2xl mx-auto text-center py-12">
              <div className="w-14 h-14 rounded-full bg-[#f0ebe0] flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-[#9e9e8f]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1a1a18] mb-2">No matching request found</h3>
              <p className="text-sm text-[#6b6b5e] mb-5 max-w-sm mx-auto">
                No request matching that reference number and email was found in this browser. Requests are stored per browser — did you submit from a different device?
              </p>
              <Link to="/borrow" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1e3d1a] text-white rounded-xl text-sm font-semibold hover:bg-[#2d5a27] transition-colors">
                Submit a New Request <ArrowRight size={13} />
              </Link>
            </div>
          )}

          {searched && result && (
            <RequestResult req={result} material={material} />
          )}

        </div>
      </div>
    </div>
  );
}
