// src/pages/AdminDashboard.jsx
// LIKHAYON — Admin Dashboard (Sidebar Layout)
// ⚠ PROTOTYPE / DEMONSTRATION MODE
// All data is stored in browser localStorage. No real authentication is used.
// A production deployment would require server-side authentication and authorization.

import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Package, ClipboardList, ArrowLeftRight,
  ScrollText, ChevronRight, Search, X, Plus, Edit3, Trash2,
  CheckCircle, XCircle, RotateCcw, AlertTriangle, Info,
  RefreshCw, ShieldAlert, Menu, Save, Clock, TrendingUp,
  AlertOctagon, Eye, Filter, ChevronDown, FileText,
  CalendarClock, Boxes, ArrowUpDown,
} from 'lucide-react';
import { useApp, LOG_TYPES } from '../store/AppContext';
import { CATEGORIES, MUNICIPALITIES, CONDITIONS } from '../data/materials';
import Modal from '../components/ui/Modal';
import { formatDate, formatDateTime, getConditionColor } from '../utils/helpers';

// ─────────────────────────────────────────────────────────────────
// SIDEBAR SECTIONS
// ─────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'overview',   label: 'Overview',          icon: LayoutDashboard },
  { id: 'inventory',  label: 'Inventory',         icon: Package },
  { id: 'pending',    label: 'Pending Requests',  icon: ClipboardList },
  { id: 'borrowed',   label: 'Borrowed Materials',icon: ArrowLeftRight },
  { id: 'log',        label: 'Activity Log',      icon: ScrollText },
];

// ─────────────────────────────────────────────────────────────────
// SHARED UI PRIMITIVES
// ─────────────────────────────────────────────────────────────────
function StatusPill({ status }) {
  const map = {
    Pending:   'bg-amber-100 text-amber-800 border-amber-200',
    Approved:  'bg-emerald-100 text-emerald-800 border-emerald-200',
    Rejected:  'bg-red-100 text-red-800 border-red-200',
    Returned:  'bg-violet-100 text-violet-800 border-violet-200',
    Cancelled: 'bg-gray-100 text-gray-600 border-gray-200',
    Overdue:   'bg-orange-100 text-orange-800 border-orange-200',
  };
  const dot = {
    Pending: 'bg-amber-500', Approved: 'bg-emerald-500', Rejected: 'bg-red-500',
    Returned: 'bg-violet-500', Cancelled: 'bg-gray-400', Overdue: 'bg-orange-500',
  };
  const cls = map[status] || 'bg-gray-100 text-gray-600 border-gray-200';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot[status] || 'bg-gray-400'}`} />
      {status}
    </span>
  );
}

function AvailBar({ available, quantity }) {
  const pct = quantity ? Math.round((available / quantity) * 100) : 0;
  const color = available === 0 ? 'bg-red-500' : pct <= 30 ? 'bg-orange-500' : 'bg-emerald-500';
  return (
    <div className="min-w-[90px]">
      <div className="flex justify-between text-[10px] text-[#9e9e8f] mb-1">
        <span className="font-semibold text-[#1a1a18]">{available}</span>
        <span>/ {quantity}</span>
      </div>
      <div className="h-1.5 bg-[#f0ebe0] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#1a1a18]">{title}</h2>
        {subtitle && <p className="text-sm text-[#9e9e8f] mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function EmptyState({ icon: Icon, title, subtitle }) {
  return (
    <div className="text-center py-16">
      <div className="w-14 h-14 rounded-full bg-[#f0ebe0] flex items-center justify-center mx-auto mb-4">
        <Icon size={24} className="text-[#9e9e8f]" />
      </div>
      <p className="font-serif text-lg text-[#1a1a18] mb-1">{title}</p>
      <p className="text-sm text-[#9e9e8f]">{subtitle}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// OVERDUE HELPER
// ─────────────────────────────────────────────────────────────────
function isOverdue(req) {
  if (req.status !== 'Approved') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(req.returnDate) < today;
}

// ─────────────────────────────────────────────────────────────────
// REQUEST ACTION MODAL
// ─────────────────────────────────────────────────────────────────
function RequestActionModal({ req, material, onApprove, onReject, onReturn, onCancel, onClose }) {
  const [panel, setPanel] = useState('detail');
  const [notes, setNotes] = useState('');
  const [returnCondition, setReturnCondition] = useState('Good');

  if (!req) return null;

  const overdue = isOverdue(req);

  function commit(action) {
    action();
    onClose();
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <StatusPill status={overdue ? 'Overdue' : req.status} />
          {req.reference && (
            <span className="font-mono text-xs bg-[#f0ebe0] text-[#6b6b5e] px-2 py-0.5 rounded-lg">{req.reference}</span>
          )}
          {overdue && (
            <span className="flex items-center gap-1 text-xs text-orange-700 font-semibold">
              <AlertOctagon size={12} /> Overdue by {Math.ceil((new Date() - new Date(req.returnDate)) / 86400000)} day(s)
            </span>
          )}
        </div>
        <span className="text-[11px] text-[#9e9e8f]">{formatDateTime(req.submittedAt)}</span>
      </div>

      {/* Material preview */}
      {material && (
        <div className="flex gap-3 items-center p-3 bg-[#f9f7f4] rounded-xl border border-[#e0d8cc]">
          <img src={material.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-[#e8e0d4]"
            onError={e => { e.target.style.display = 'none'; }} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-serif font-bold text-[#1a1a18] truncate">{material.name}</p>
            <p className="text-xs text-[#9e9e8f]">{material.category} · {material.origin}</p>
          </div>
          <AvailBar available={material.available} quantity={material.quantity} />
        </div>
      )}

      {/* Detail grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        {[
          ['Quantity Requested', `${req.quantity} ${material?.unit || 'unit'}${req.quantity !== 1 ? 's' : ''}`],
          ['Organization', req.organization],
          ['Org Type', req.orgType],
          ['Contact Person', req.contactPerson],
          ['Email', req.contactEmail],
          ['Phone', req.contactPhone],
          ['Festival / Activity', req.festival],
          ['Pickup Date', formatDate(req.borrowDate)],
          ['Return Date', formatDate(req.returnDate)],
        ].filter(([, v]) => v).map(([l, v]) => (
          <div key={l}>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#9e9e8f]">{l}</p>
            <p className="text-xs font-medium text-[#1a1a18] mt-0.5 break-words leading-snug">{v}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#f9f7f4] rounded-xl p-3">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#9e9e8f] mb-1">Purpose of Use</p>
        <p className="text-xs text-[#1a1a18] leading-relaxed">{req.intendedUse}</p>
      </div>

      {req.additionalNotes && (
        <p className="text-xs text-[#6b6b5e] bg-[#f0ebe0] rounded-xl px-3 py-2.5 flex items-start gap-2">
          <Info size={12} className="text-[#9e9e8f] flex-shrink-0 mt-0.5" /> {req.additionalNotes}
        </p>
      )}

      {req.reviewNotes && (
        <div className={`rounded-xl border p-3 ${req.status === 'Rejected' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
          <p className="text-[9px] font-bold uppercase tracking-widest mb-1 text-current opacity-70">
            {req.status === 'Rejected' ? 'Rejection Reason' : 'Admin Notes'} — {req.reviewedBy} · {formatDateTime(req.reviewedAt)}
          </p>
          <p className="text-xs">{req.reviewNotes}</p>
        </div>
      )}

      {req.returnNotes && (
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-3">
          <p className="text-[9px] font-bold uppercase tracking-widest text-violet-600 mb-1">Return Record · {formatDateTime(req.returnedAt)}</p>
          <p className="text-xs text-violet-800">{req.returnNotes}</p>
          {req.returnCondition && <p className="text-xs text-violet-700 mt-1">Condition: <strong>{req.returnCondition}</strong></p>}
        </div>
      )}

      {req.cancelNotes && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-1">Cancellation · {formatDateTime(req.cancelledAt)}</p>
          <p className="text-xs text-gray-700">{req.cancelNotes}</p>
        </div>
      )}

      {/* ── APPROVE SUB-PANEL ── */}
      {panel === 'approve' && (
        <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-4 space-y-3">
          <p className="text-sm font-bold text-emerald-800 flex items-center gap-2"><CheckCircle size={14} /> Approve Request</p>
          <p className="text-xs text-emerald-700">Approving will <strong>reserve {req.quantity} {material?.unit || 'unit'}(s)</strong> from available stock.
            {material ? ` (${material.available} currently available)` : ''}</p>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-emerald-700 mb-1.5">Approval Note (optional)</label>
            <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="e.g., Approved. Please coordinate pickup at least 2 days before your event."
              className="w-full px-3 py-2 text-xs border border-emerald-200 rounded-lg resize-none bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => commit(() => onApprove(req.id, notes))}
              className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
              <CheckCircle size={13} /> Confirm Approval
            </button>
            <button onClick={() => setPanel('detail')} className="px-4 border border-gray-200 rounded-xl text-sm text-[#6b6b5e] hover:bg-gray-50">Back</button>
          </div>
        </div>
      )}

      {/* ── REJECT SUB-PANEL ── */}
      {panel === 'reject' && (
        <div className="border border-red-200 bg-red-50 rounded-xl p-4 space-y-3">
          <p className="text-sm font-bold text-red-800 flex items-center gap-2"><XCircle size={14} /> Reject Request</p>
          <p className="text-xs text-red-700">No inventory change — pending requests do not hold stock.</p>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-red-700 mb-1.5">Reason for Rejection <span className="text-red-600">*</span></label>
            <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="e.g., All units are reserved for a higher-priority event during this period."
              className="w-full px-3 py-2 text-xs border border-red-200 rounded-lg resize-none bg-white focus:outline-none focus:ring-2 focus:ring-red-300" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => commit(() => onReject(req.id, notes))} disabled={!notes.trim()}
              className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              <XCircle size={13} /> Confirm Rejection
            </button>
            <button onClick={() => setPanel('detail')} className="px-4 border border-gray-200 rounded-xl text-sm text-[#6b6b5e] hover:bg-gray-50">Back</button>
          </div>
        </div>
      )}

      {/* ── RETURN SUB-PANEL ── */}
      {panel === 'return' && (
        <div className="border border-violet-200 bg-violet-50 rounded-xl p-4 space-y-3">
          <p className="text-sm font-bold text-violet-800 flex items-center gap-2"><RotateCcw size={14} /> Record Return</p>
          <p className="text-xs text-violet-700">Will <strong>restore {req.quantity} {material?.unit || 'unit'}(s)</strong> to available inventory and update material condition.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-violet-700 mb-1.5">Condition on Return</label>
              <select value={returnCondition} onChange={e => setReturnCondition(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-violet-200 rounded-lg bg-white focus:outline-none">
                {CONDITIONS.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-violet-700 mb-1.5">Return Date</label>
              <p className="text-xs text-violet-800 font-semibold pt-2">{new Date().toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-violet-700 mb-1.5">Return Notes (optional)</label>
            <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="e.g., All units returned. One minor dent on bamboo frame reported."
              className="w-full px-3 py-2 text-xs border border-violet-200 rounded-lg resize-none bg-white focus:outline-none focus:ring-2 focus:ring-violet-300" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => commit(() => onReturn(req.id, notes, returnCondition))}
              className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-bold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
              <RotateCcw size={13} /> Confirm Return
            </button>
            <button onClick={() => setPanel('detail')} className="px-4 border border-gray-200 rounded-xl text-sm text-[#6b6b5e] hover:bg-gray-50">Back</button>
          </div>
        </div>
      )}

      {/* ── CANCEL SUB-PANEL ── */}
      {panel === 'cancel' && (
        <div className="border border-gray-200 bg-gray-50 rounded-xl p-4 space-y-3">
          <p className="text-sm font-bold text-gray-700 flex items-center gap-2"><X size={14} /> Cancel Request</p>
          {req.status === 'Approved' && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-2.5">
              <AlertTriangle size={12} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">This request is <strong>Approved</strong>. Cancelling will release {req.quantity} {material?.unit || 'unit'}(s) back to available inventory.</p>
            </div>
          )}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1.5">Cancellation Reason</label>
            <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="e.g., Event cancelled by organizer."
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg resize-none bg-white focus:outline-none focus:ring-2 focus:ring-gray-300" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => commit(() => onCancel(req.id, notes))}
              className="flex-1 py-2.5 bg-gray-700 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <X size={13} /> Confirm Cancellation
            </button>
            <button onClick={() => setPanel('detail')} className="px-4 border border-gray-200 rounded-xl text-sm text-[#6b6b5e] hover:bg-gray-50">Back</button>
          </div>
        </div>
      )}

      {/* Primary action buttons */}
      {panel === 'detail' && (
        <div className="pt-3 border-t border-gray-100 space-y-2">
          {req.status === 'Pending' && (
            <div className="flex gap-2">
              <button id={`approve-${req.id}`} onClick={() => setPanel('approve')}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                <CheckCircle size={13} /> Approve
              </button>
              <button id={`reject-${req.id}`} onClick={() => setPanel('reject')}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                <XCircle size={13} /> Reject
              </button>
            </div>
          )}
          {req.status === 'Approved' && (
            <button id={`return-${req.id}`} onClick={() => setPanel('return')}
              className="w-full py-2.5 bg-violet-600 text-white rounded-xl text-sm font-bold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
              <RotateCcw size={13} /> Mark as Returned
            </button>
          )}
          {['Pending', 'Approved'].includes(req.status) && (
            <button id={`cancel-${req.id}`} onClick={() => setPanel('cancel')}
              className="w-full py-2 border border-gray-200 text-gray-500 rounded-xl text-xs font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
              <X size={12} /> Cancel Request
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MATERIAL FORM MODAL
// ─────────────────────────────────────────────────────────────────
function MaterialFormModal({ initial, onSave, onClose }) {
  const blank = {
    name: '', category: CATEGORIES[1] || 'Bamboo Structures', description: '',
    origin: '', festival: '', unit: 'piece', quantity: 1, available: 1,
    condition: 'Good', imageUrl: '', notes: '', dimensions: '', weight: '', usageNotes: '', handlingInstructions: '',
  };
  const [mat, setMat] = useState(initial ? { ...blank, ...initial } : blank);
  const [errors, setErrors] = useState({});

  const f = (k) => (e) => {
    const v = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setMat(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(p => ({ ...p, [k]: null }));
  };

  function save() {
    const e = {};
    if (!mat.name.trim()) e.name = 'Name is required';
    if (!mat.quantity || mat.quantity < 1) e.quantity = 'Quantity must be ≥ 1';
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({ ...mat, quantity: Number(mat.quantity), available: Math.min(Number(mat.available || 0), Number(mat.quantity)) });
    onClose();
  }

  const field = (label, key, type = 'text', span = false, hint = '') => (
    <div key={key || label} className={span ? 'sm:col-span-2' : ''}>
      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9e9e8f] mb-1">{label}</label>
      {hint && <p className="text-[10px] text-[#9e9e8f] mb-1">{hint}</p>}
      {type === 'textarea' ? (
        <textarea rows={3} value={mat[key]} onChange={f(key)}
          className="w-full px-3 py-2 text-xs border border-[#e0d8cc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3d7a35]/20 resize-none bg-white" />
      ) : type === 'select-cat' ? (
        <select value={mat.category} onChange={f('category')} className="w-full px-3 py-2 text-xs border border-[#e0d8cc] rounded-xl focus:outline-none bg-white">
          {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      ) : type === 'select-muni' ? (
        <select value={mat.origin} onChange={f('origin')} className="w-full px-3 py-2 text-xs border border-[#e0d8cc] rounded-xl focus:outline-none bg-white">
          <option value="">— Select municipality —</option>
          {MUNICIPALITIES.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      ) : type === 'select-cond' ? (
        <select value={mat.condition} onChange={f('condition')} className="w-full px-3 py-2 text-xs border border-[#e0d8cc] rounded-xl focus:outline-none bg-white">
          {CONDITIONS.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      ) : (
        <>
          <input type={type} value={mat[key]} onChange={f(key)} min={type === 'number' ? 0 : undefined}
            className={`w-full px-3 py-2 text-xs border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3d7a35]/20 bg-white ${errors[key] ? 'border-red-400 bg-red-50' : 'border-[#e0d8cc]'}`} />
          {errors[key] && <p className="text-red-600 text-[10px] mt-0.5">{errors[key]}</p>}
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {field('Material Name *', 'name', 'text', true)}
        {field('Description', 'description', 'textarea', true)}
        {field('Category', 'category', 'select-cat')}
        {field('Origin Municipality', 'origin', 'select-muni')}
        {field('Associated Festival', 'festival', 'text', true)}
        {field('Total Quantity *', 'quantity', 'number')}
        {field('Currently Available', 'available', 'number', false, 'Must be ≤ total quantity')}
        {field('Unit (piece / set / strand…)', 'unit', 'text')}
        {field('Condition', 'condition', 'select-cond')}
        {field('Dimensions', 'dimensions', 'text')}
        {field('Weight', 'weight', 'text')}
        {field('Image URL', 'imageUrl', 'text', true)}
        {field('Usage Notes', 'usageNotes', 'textarea', true)}
        {field('Handling & Storage Instructions', 'handlingInstructions', 'textarea', true)}
        {field('Admin Notes', 'notes', 'textarea', true)}
      </div>
      <div className="flex gap-3 pt-2 border-t border-gray-100">
        <button onClick={save} className="flex-1 py-3 bg-[#1e3d1a] text-white rounded-xl text-sm font-bold hover:bg-[#2d5a27] transition-colors flex items-center justify-center gap-2">
          <Save size={14} /> {initial ? 'Save Changes' : 'Add Material'}
        </button>
        <button onClick={onClose} className="px-5 border border-gray-200 text-[#6b6b5e] rounded-xl text-sm hover:bg-[#f0ebe0] transition-colors">Cancel</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// LOG ENTRY ICON + COLOR
// ─────────────────────────────────────────────────────────────────
function LogEntryBadge({ type }) {
  const map = {
    REQUEST_SUBMITTED:  { bg: 'bg-blue-100',   text: 'text-blue-700'   },
    REQUEST_APPROVED:   { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    REQUEST_REJECTED:   { bg: 'bg-red-100',     text: 'text-red-700'    },
    REQUEST_RETURNED:   { bg: 'bg-violet-100',  text: 'text-violet-700' },
    REQUEST_CANCELLED:  { bg: 'bg-gray-100',    text: 'text-gray-600'   },
    MATERIAL_ADDED:     { bg: 'bg-green-100',   text: 'text-green-700'  },
    MATERIAL_UPDATED:   { bg: 'bg-amber-100',   text: 'text-amber-700'  },
    MATERIAL_DELETED:   { bg: 'bg-red-100',     text: 'text-red-700'    },
  };
  const { bg, text } = map[type] || { bg: 'bg-gray-100', text: 'text-gray-600' };
  const label = LOG_TYPES[type]?.label || type;
  return (
    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${bg} ${text}`}>{label}</span>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: OVERVIEW
// ─────────────────────────────────────────────────────────────────
function Overview({ materials, requests, activityLog, onNavigate }) {
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const stats = useMemo(() => {
    const totalTypes  = materials.length;
    const totalUnits  = materials.reduce((s, m) => s + m.quantity, 0);
    const availUnits  = materials.reduce((s, m) => s + m.available, 0);
    const borrowedUnits = totalUnits - availUnits;
    const pending     = requests.filter(r => r.status === 'Pending').length;
    const approved    = requests.filter(r => r.status === 'Approved').length;
    const overdue     = requests.filter(r => isOverdue(r)).length;
    const returned    = requests.filter(r => r.status === 'Returned').length;
    return { totalTypes, totalUnits, availUnits, borrowedUnits, pending, approved, overdue, returned };
  }, [materials, requests]);

  const STAT_CARDS = [
    { label: 'Material Types',   value: stats.totalTypes,   color: 'text-[#c9942a]', bg: 'bg-amber-50',   border: 'border-amber-100', icon: Package,        action: 'inventory' },
    { label: 'Total Units',      value: stats.totalUnits,   color: 'text-blue-600',  bg: 'bg-blue-50',    border: 'border-blue-100',  icon: Boxes,          action: 'inventory' },
    { label: 'Available Units',  value: stats.availUnits,   color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', icon: CheckCircle, action: 'inventory' },
    { label: 'Currently Borrowed', value: stats.borrowedUnits, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100', icon: ArrowLeftRight, action: 'borrowed' },
    { label: 'Pending Requests', value: stats.pending,      color: 'text-amber-600', bg: 'bg-amber-50',   border: 'border-amber-100', icon: Clock,          action: 'pending' },
    { label: 'Overdue Returns',  value: stats.overdue,      color: stats.overdue > 0 ? 'text-orange-600' : 'text-gray-400', bg: stats.overdue > 0 ? 'bg-orange-50' : 'bg-gray-50', border: stats.overdue > 0 ? 'border-orange-100' : 'border-gray-100', icon: AlertOctagon, action: 'borrowed' },
  ];

  // Low stock materials
  const lowStock = materials.filter(m => m.quantity > 0 && m.available / m.quantity <= 0.3).slice(0, 5);
  // Recent log
  const recentLog = activityLog.slice(0, 6);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Dashboard Overview"
        subtitle="All statistics are computed from the same localStorage data used across the entire prototype."
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {STAT_CARDS.map(s => (
          <button
            key={s.label}
            onClick={() => onNavigate(s.action)}
            className={`text-left p-5 rounded-2xl border ${s.bg} ${s.border} hover:shadow-md transition-all group`}
          >
            <div className="flex items-start justify-between mb-3">
              <s.icon size={18} className={s.color} />
              <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className={`font-serif text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-[#9e9e8f] mt-1 font-medium">{s.label}</p>
          </button>
        ))}
      </div>

      {/* Low stock + recent log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low/no stock alert */}
        <Card>
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-serif font-bold text-[#1a1a18] flex items-center gap-2">
              <AlertTriangle size={15} className="text-orange-500" /> Low Stock Materials
            </h3>
            <button onClick={() => onNavigate('inventory')} className="text-xs text-[#2d5a27] hover:text-[#c9942a] transition-colors flex items-center gap-1">
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="p-3">
            {lowStock.length === 0 ? (
              <p className="text-xs text-[#9e9e8f] py-6 text-center">All materials have sufficient stock.</p>
            ) : lowStock.map(m => (
              <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#f9f7f4] transition-colors">
                <img src={m.imageUrl} alt="" className="w-9 h-9 rounded-lg object-cover flex-shrink-0 bg-[#e8e0d4]"
                  onError={e => { e.target.style.display = 'none'; }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#1a1a18] truncate">{m.name}</p>
                  <p className="text-[10px] text-[#9e9e8f]">{m.category}</p>
                </div>
                <div className="flex-shrink-0 min-w-[80px]">
                  <AvailBar available={m.available} quantity={m.quantity} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent activity */}
        <Card>
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-serif font-bold text-[#1a1a18] flex items-center gap-2">
              <ScrollText size={15} className="text-[#c9942a]" /> Recent Activity
            </h3>
            <button onClick={() => onNavigate('log')} className="text-xs text-[#2d5a27] hover:text-[#c9942a] transition-colors flex items-center gap-1">
              Full log <ChevronRight size={12} />
            </button>
          </div>
          <div className="p-3 space-y-1">
            {recentLog.length === 0 ? (
              <p className="text-xs text-[#9e9e8f] py-6 text-center">No activity yet.</p>
            ) : recentLog.map(entry => (
              <div key={entry.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f9f7f4] transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c9942a] mt-1.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#1a1a18] truncate">{entry.title}</p>
                  <p className="text-[10px] text-[#9e9e8f]">{formatDateTime(entry.timestamp)}</p>
                </div>
                <LogEntryBadge type={entry.type} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Overdue banner */}
      {stats.overdue > 0 && (
        <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-2xl p-5">
          <AlertOctagon size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-orange-800 text-sm mb-0.5">
              {stats.overdue} overdue return{stats.overdue > 1 ? 's' : ''} detected
            </p>
            <p className="text-xs text-orange-700">
              These approved requests have passed their expected return date. Review them in the Borrowed Materials section.
            </p>
          </div>
          <button onClick={() => onNavigate('borrowed')}
            className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors whitespace-nowrap">
            View Overdue
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: INVENTORY
// ─────────────────────────────────────────────────────────────────
function Inventory({ materials, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [condFilter, setCondFilter] = useState('All');
  const [sort, setSort] = useState('name');

  const filtered = useMemo(() => {
    let list = [...materials];
    const q = search.toLowerCase();
    if (q) list = list.filter(m => m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q) || m.origin?.toLowerCase().includes(q));
    if (catFilter !== 'All') list = list.filter(m => m.category === catFilter);
    if (condFilter !== 'All') list = list.filter(m => m.condition === condFilter);
    const COND = { Excellent: 0, 'Very Good': 1, Good: 2, Fair: 3, 'Needs Repair': 4 };
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'avail') list.sort((a, b) => b.available - a.available);
    else if (sort === 'cond') list.sort((a, b) => (COND[a.condition] ?? 9) - (COND[b.condition] ?? 9));
    else if (sort === 'qty') list.sort((a, b) => b.quantity - a.quantity);
    return list;
  }, [materials, search, catFilter, condFilter, sort]);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Inventory Management"
        subtitle={`${materials.length} material types · ${materials.reduce((s, m) => s + m.quantity, 0)} total units`}
        action={
          <button id="admin-add-material" onClick={onAdd}
            className="px-5 py-2.5 bg-[#1e3d1a] text-white rounded-xl text-sm font-bold hover:bg-[#2d5a27] transition-colors flex items-center gap-2 shadow-sm">
            <Plus size={15} /> Add Material
          </button>
        }
      />

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="relative sm:col-span-2">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9e9e8f]" />
            <input id="inv-search" type="text" placeholder="Search by name, category, origin…" value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm border border-[#e0d8cc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3d7a35]/20 bg-white" />
            {search && <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9e9e8f] hover:text-[#1a1a18]"><X size={13} /></button>}
          </div>
          <select id="inv-cat-filter" value={catFilter} onChange={e => setCatFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-[#e0d8cc] rounded-xl focus:outline-none bg-white text-[#6b6b5e]">
            <option value="All">All Categories</option>
            {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select id="inv-cond-filter" value={condFilter} onChange={e => setCondFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-[#e0d8cc] rounded-xl focus:outline-none bg-white text-[#6b6b5e]">
            <option value="All">All Conditions</option>
            {CONDITIONS.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e8f] flex items-center gap-1"><ArrowUpDown size={11} /> Sort:</span>
          {[['name', 'Name'], ['avail', 'Available'], ['qty', 'Total Qty'], ['cond', 'Condition']].map(([v, l]) => (
            <button key={v} onClick={() => setSort(v)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${sort === v ? 'bg-[#1e3d1a] text-white' : 'bg-[#f0ebe0] text-[#6b6b5e] hover:bg-[#e0d8cc]'}`}>
              {l}
            </button>
          ))}
          <span className="ml-auto text-xs text-[#9e9e8f]">{filtered.length} of {materials.length}</span>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f9f7f4] border-b border-gray-100">
              <tr>
                {['', 'Name & ID', 'Category', 'Origin', 'Available', 'Condition', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#9e9e8f] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={8}><EmptyState icon={Package} title="No materials found" subtitle="Try adjusting your filters" /></td></tr>
              ) : filtered.map(mat => {
                const pct = mat.quantity ? Math.round((mat.available / mat.quantity) * 100) : 0;
                const statusLabel = mat.available === 0 ? 'All On Loan' : pct <= 30 ? 'Limited' : 'Available';
                const statusCls = mat.available === 0 ? 'text-red-700 bg-red-50' : pct <= 30 ? 'text-orange-700 bg-orange-50' : 'text-emerald-700 bg-emerald-50';
                return (
                  <tr key={mat.id} className="hover:bg-[#faf7f2] transition-colors group">
                    <td className="pl-4 py-3 w-12">
                      <img src={mat.imageUrl} alt="" className="w-10 h-10 rounded-xl object-cover bg-[#e8e0d4]"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=60&q=40'; }} />
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-serif font-semibold text-[#1a1a18] text-sm leading-snug">{mat.name}</p>
                      <p className="text-[10px] text-[#c0b9ad] font-mono mt-0.5">{mat.id}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#6b6b5e] max-w-[120px]">{mat.category}</td>
                    <td className="px-4 py-3 text-xs text-[#6b6b5e] whitespace-nowrap">{mat.origin || '—'}</td>
                    <td className="px-4 py-3 w-36"><AvailBar available={mat.available} quantity={mat.quantity} /></td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold ${getConditionColor(mat.condition)}`}>{mat.condition}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusCls}`}>{statusLabel}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button id={`edit-mat-${mat.id}`} onClick={() => onEdit(mat)} title="Edit"
                          className="p-1.5 border border-gray-200 rounded-lg text-[#6b6b5e] hover:bg-[#f0ebe0] hover:border-[#d4c9b8] transition-colors">
                          <Edit3 size={12} />
                        </button>
                        <button id={`delete-mat-${mat.id}`} onClick={() => { if (window.confirm(`Delete "${mat.name}"? This cannot be undone.`)) onDelete(mat.id, mat.name); }} title="Delete"
                          className="p-1.5 border border-red-100 rounded-lg text-red-400 hover:bg-red-50 hover:border-red-300 transition-colors">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: PENDING REQUESTS
// ─────────────────────────────────────────────────────────────────
function PendingRequests({ requests, materials, onOpen }) {
  const [search, setSearch] = useState('');

  const pending = useMemo(() => {
    const list = requests
      .filter(r => r.status === 'Pending')
      .sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt)); // oldest first
    const q = search.toLowerCase();
    return q ? list.filter(r =>
      r.reference?.toLowerCase().includes(q) || r.organization?.toLowerCase().includes(q) ||
      r.materialName?.toLowerCase().includes(q) || r.contactPerson?.toLowerCase().includes(q)
    ) : list;
  }, [requests, search]);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Pending Requests"
        subtitle={`${pending.length} request${pending.length !== 1 ? 's' : ''} awaiting review — oldest shown first`}
      />

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9e9e8f]" />
        <input id="pending-search" type="text" placeholder="Search pending requests…" value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#e0d8cc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3d7a35]/20 bg-white" />
      </div>

      {pending.length === 0 ? (
        <Card className="p-4">
          <EmptyState icon={CheckCircle} title="No pending requests" subtitle="All requests have been reviewed." />
        </Card>
      ) : (
        <div className="space-y-3">
          {pending.map(req => {
            const mat = materials.find(m => m.id === req.materialId);
            const daysWaiting = Math.floor((new Date() - new Date(req.submittedAt)) / 86400000);
            const urgent = daysWaiting >= 3;
            return (
              <Card key={req.id} className={`p-4 ${urgent ? 'border-amber-200 bg-amber-50/30' : ''}`}>
                <div className="flex items-start gap-4">
                  {mat && (
                    <img src={mat.imageUrl} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0 bg-[#e8e0d4]"
                      onError={e => { e.target.style.display = 'none'; }} />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <p className="font-serif font-bold text-[#1a1a18] text-sm">{req.materialName}</p>
                        <p className="text-xs text-[#9e9e8f] mt-0.5">{req.organization} · {req.contactPerson}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {urgent && (
                          <span className="flex items-center gap-1 text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                            <Clock size={9} /> {daysWaiting}d waiting
                          </span>
                        )}
                        <span className="font-mono text-[10px] text-[#9e9e8f]">{req.reference}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-[#6b6b5e]">
                      <span className="flex items-center gap-1"><Package size={11} /> {req.quantity} {mat?.unit || 'unit'}(s)</span>
                      <span className="flex items-center gap-1"><CalendarClock size={11} /> {formatDate(req.borrowDate)} → {formatDate(req.returnDate)}</span>
                      <span className="flex items-center gap-1"><FileText size={11} /> {req.festival}</span>
                    </div>
                    <p className="text-xs text-[#9e9e8f] mt-1.5 line-clamp-2">{req.intendedUse}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                  <button id={`pending-approve-${req.id}`} onClick={() => onOpen(req)}
                    className="flex-1 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5">
                    <CheckCircle size={12} /> Approve
                  </button>
                  <button id={`pending-reject-${req.id}`} onClick={() => onOpen(req)}
                    className="flex-1 py-2 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5">
                    <XCircle size={12} /> Reject
                  </button>
                  <button id={`pending-view-${req.id}`} onClick={() => onOpen(req)}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-xs text-[#6b6b5e] hover:bg-[#f0ebe0] transition-colors">
                    <Eye size={12} />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: BORROWED MATERIALS
// ─────────────────────────────────────────────────────────────────
function BorrowedMaterials({ requests, materials, onOpen }) {
  const [filter, setFilter] = useState('active'); // 'active' | 'overdue' | 'returned' | 'all'
  const [search, setSearch] = useState('');

  const list = useMemo(() => {
    let base = requests.filter(r => ['Approved', 'Returned'].includes(r.status));
    if (filter === 'active') base = base.filter(r => r.status === 'Approved' && !isOverdue(r));
    else if (filter === 'overdue') base = base.filter(r => isOverdue(r));
    else if (filter === 'returned') base = base.filter(r => r.status === 'Returned');
    const q = search.toLowerCase();
    if (q) base = base.filter(r =>
      r.reference?.toLowerCase().includes(q) || r.organization?.toLowerCase().includes(q) || r.materialName?.toLowerCase().includes(q)
    );
    return base.sort((a, b) => new Date(a.returnDate) - new Date(b.returnDate));
  }, [requests, filter, search]);

  const overdueCount = requests.filter(r => isOverdue(r)).length;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Borrowed Materials"
        subtitle="Track active loans, overdue returns, and return history"
      />

      {overdueCount > 0 && (
        <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <AlertOctagon size={18} className="text-orange-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-bold text-orange-800">{overdueCount} overdue return{overdueCount > 1 ? 's' : ''}</p>
            <p className="text-xs text-orange-700">Materials have not been returned by their expected date.</p>
          </div>
          <button onClick={() => setFilter('overdue')}
            className="px-3 py-1.5 bg-orange-600 text-white rounded-lg text-xs font-bold hover:bg-orange-700 transition-colors whitespace-nowrap">
            View Overdue
          </button>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9e9e8f]" />
          <input type="text" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#e0d8cc] rounded-xl focus:outline-none bg-white" />
        </div>
        {[['active', 'Active Loans'], ['overdue', `Overdue${overdueCount > 0 ? ` (${overdueCount})` : ''}`], ['returned', 'Returned'], ['all', 'All']].map(([v, l]) => (
          <button key={v} id={`borrow-filter-${v}`} onClick={() => setFilter(v)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${filter === v ? 'bg-[#1e3d1a] text-white' : 'bg-white border border-gray-200 text-[#6b6b5e] hover:border-gray-300'} ${v === 'overdue' && overdueCount > 0 && filter !== v ? 'border-orange-200 text-orange-700' : ''}`}>
            {l}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <Card className="p-4">
          <EmptyState icon={ArrowLeftRight} title="Nothing to show" subtitle="No records match the selected filter." />
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f9f7f4] border-b border-gray-100">
                <tr>
                  {['Reference', 'Material', 'Borrower', 'Qty', 'Pickup', 'Return By', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#9e9e8f] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {list.map(req => {
                  const mat = materials.find(m => m.id === req.materialId);
                  const overdue = isOverdue(req);
                  return (
                    <tr key={req.id} className={`hover:bg-[#faf7f2] transition-colors ${overdue ? 'bg-orange-50/40' : ''}`}>
                      <td className="px-4 py-3 font-mono text-[10px] text-[#9e9e8f] whitespace-nowrap">{req.reference || req.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {mat && <img src={mat.imageUrl} alt="" className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                            onError={e => { e.target.style.display = 'none'; }} />}
                          <span className="text-xs font-medium text-[#1a1a18] max-w-[110px] truncate">{req.materialName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium text-[#1a1a18] max-w-[130px] truncate">{req.organization}</p>
                        <p className="text-[10px] text-[#9e9e8f]">{req.contactPerson}</p>
                      </td>
                      <td className="px-4 py-3 text-xs font-bold text-[#1a1a18]">{req.quantity}</td>
                      <td className="px-4 py-3 text-[10px] text-[#9e9e8f] whitespace-nowrap">{formatDate(req.borrowDate)}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {req.status === 'Returned' ? (
                          <span className="text-[10px] text-[#9e9e8f]">{formatDate(req.returnedAt)}</span>
                        ) : (
                          <span className={`text-xs font-semibold ${overdue ? 'text-orange-700' : 'text-[#1a1a18]'}`}>
                            {overdue && <AlertOctagon size={10} className="inline mr-1" />}
                            {formatDate(req.returnDate)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill status={overdue ? 'Overdue' : req.status} />
                      </td>
                      <td className="px-4 py-3">
                        <button id={`borrow-view-${req.id}`} onClick={() => onOpen(req)}
                          className="p-1.5 border border-gray-200 rounded-lg text-[#6b6b5e] hover:bg-[#f0ebe0] transition-colors">
                          <Eye size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION: ACTIVITY LOG
// ─────────────────────────────────────────────────────────────────
function ActivityLog({ activityLog, onClear }) {
  const [typeFilter, setTypeFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = activityLog;
    if (typeFilter !== 'All') list = list.filter(e => e.type === typeFilter);
    const q = search.toLowerCase();
    if (q) list = list.filter(e => e.title.toLowerCase().includes(q) || e.detail?.toLowerCase().includes(q));
    return list;
  }, [activityLog, typeFilter, search]);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Activity Log"
        subtitle={`${activityLog.length} entries · Last 200 actions recorded in localStorage`}
        action={
          activityLog.length > 0 && (
            <button onClick={() => { if (window.confirm('Clear activity log?')) onClear(); }}
              className="px-4 py-2 border border-gray-200 text-[#9e9e8f] text-sm rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors flex items-center gap-2">
              <Trash2 size={13} /> Clear Log
            </button>
          )
        }
      />

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9e9e8f]" />
          <input type="text" placeholder="Search log entries…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#e0d8cc] rounded-xl focus:outline-none bg-white" />
        </div>
        <select id="log-type-filter" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-[#e0d8cc] rounded-xl focus:outline-none bg-white text-[#6b6b5e]">
          <option value="All">All Event Types</option>
          {Object.entries(LOG_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <Card className="p-4">
          <EmptyState icon={ScrollText} title="No log entries" subtitle="Actions like approvals, returns, and edits will appear here." />
        </Card>
      ) : (
        <Card className="divide-y divide-gray-50 overflow-hidden">
          {filtered.map((entry, i) => (
            <div key={entry.id} className="flex items-start gap-4 px-5 py-4 hover:bg-[#faf7f2] transition-colors">
              <div className="flex flex-col items-center flex-shrink-0 pt-1">
                <div className="w-2 h-2 rounded-full bg-[#c9942a]" />
                {i < filtered.length - 1 && <div className="w-px flex-1 bg-[#e0d8cc] mt-1 min-h-[1.5rem]" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-[#1a1a18] leading-snug">{entry.title}</p>
                  <LogEntryBadge type={entry.type} />
                </div>
                {entry.detail && <p className="text-xs text-[#9e9e8f] mt-0.5 leading-relaxed">{entry.detail}</p>}
                <p className="text-[10px] text-[#c0b9ad] mt-1">{formatDateTime(entry.timestamp)}</p>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN DASHBOARD
// ─────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const {
    materials, archive, requests, activityLog,
    addMaterial, updateMaterial, deleteMaterial,
    updateRequestStatus, recordReturn, cancelRequest,
    clearLog, resetData,
  } = useApp();

  const [section, setSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);
  const [addMatOpen, setAddMatOpen] = useState(false);
  const [editMat, setEditMat] = useState(null);

  const pendingCount = useMemo(() => requests.filter(r => r.status === 'Pending').length, [requests]);
  const overdueCount = useMemo(() => requests.filter(r => isOverdue(r)).length, [requests]);

  function handleApprove(id, notes) { updateRequestStatus(id, 'Approved', notes); }
  function handleReject(id, notes) { updateRequestStatus(id, 'Rejected', notes); }
  function handleReturn(id, notes, cond) { recordReturn(id, notes, cond); }
  function handleCancel(id, notes) { cancelRequest(id, notes); }

  const selectedMaterial = selectedReq ? materials.find(m => m.id === selectedReq.materialId) : null;

  return (
    <div className="page-enter flex min-h-screen pt-[68px]">

      {/* ═══════════════════════════════════════════════
          SIDEBAR
      ═══════════════════════════════════════════════ */}
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`
        fixed md:sticky top-[68px] z-40 md:z-auto
        w-72 md:w-64 h-[calc(100vh-68px)] flex-shrink-0
        bg-[#0f1e0e] flex flex-col overflow-y-auto
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Sidebar header */}
        <div className="px-5 pt-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-[#c9942a]/20 border border-[#c9942a]/40 flex items-center justify-center">
              <ShieldAlert size={12} className="text-[#c9942a]" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#c9942a]">Admin Panel</span>
          </div>

          {/* Demo mode pill */}
          <div className="bg-amber-900/40 border border-amber-700/30 rounded-xl px-3 py-2.5">
            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <AlertTriangle size={9} /> Demonstration Mode
            </p>
            <p className="text-[10px] text-amber-300/80 leading-snug">
              Data stored in localStorage only. No authentication, no server, no real email. Production would require proper auth and server-side authorization.
            </p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {SECTIONS.map(({ id, label, icon: Icon }) => {
            const badge = id === 'pending' ? pendingCount : id === 'borrowed' ? overdueCount : 0;
            const isActive = section === id;
            return (
              <button
                key={id}
                id={`sidebar-${id}`}
                onClick={() => { setSection(id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                  isActive
                    ? 'bg-[#c9942a] text-white shadow-lg shadow-[#c9942a]/20'
                    : 'text-white/65 hover:text-white hover:bg-white/8'
                }`}
              >
                <Icon size={16} className="flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {badge > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold min-w-[20px] text-center ${
                    id === 'borrowed' ? 'bg-orange-500 text-white' : 'bg-amber-400 text-[#1a1a18]'
                  }`}>{badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="px-3 pb-6 space-y-2 border-t border-white/10 pt-4">
          <Link to="/materials" className="flex items-center gap-2 px-4 py-2.5 text-white/50 hover:text-white rounded-xl hover:bg-white/8 transition-colors text-xs">
            <Package size={13} /> Materials Bank (Public)
          </Link>
          <Link to="/borrow" className="flex items-center gap-2 px-4 py-2.5 text-white/50 hover:text-white rounded-xl hover:bg-white/8 transition-colors text-xs">
            <FileText size={13} /> Borrow Form (Public)
          </Link>
          <button
            id="admin-reset-btn"
            onClick={() => { if (window.confirm('Reset all data to demo defaults? This clears ALL changes.')) resetData(); }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-red-400/70 hover:text-red-300 rounded-xl hover:bg-red-900/20 transition-colors text-xs mt-2"
          >
            <RefreshCw size={13} /> Reset Demo Data
          </button>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════ */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-5 sm:px-8 py-4 flex items-center gap-4 sticky top-[68px] z-20">
          <button
            id="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-xl border border-gray-200 text-[#6b6b5e] hover:bg-[#f0ebe0] transition-colors"
          >
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-2 text-xs text-[#9e9e8f]">
            <span className="font-medium text-[#1a1a18]">LIKHAYON Admin</span>
            <ChevronRight size={12} />
            <span>{SECTIONS.find(s => s.id === section)?.label}</span>
          </div>
          {pendingCount > 0 && (
            <button onClick={() => setSection('pending')}
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 border border-amber-200 text-amber-800 rounded-full text-xs font-bold hover:bg-amber-200 transition-colors">
              <Clock size={11} /> {pendingCount} pending
            </button>
          )}
          {overdueCount > 0 && (
            <button onClick={() => setSection('borrowed')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 border border-orange-200 text-orange-800 rounded-full text-xs font-bold hover:bg-orange-200 transition-colors">
              <AlertOctagon size={11} /> {overdueCount} overdue
            </button>
          )}
        </div>

        {/* Section content */}
        <div className="flex-1 px-5 sm:px-8 py-8 bg-[#faf7f2]">
          {section === 'overview' && (
            <Overview materials={materials} requests={requests} activityLog={activityLog} onNavigate={setSection} />
          )}
          {section === 'inventory' && (
            <Inventory
              materials={materials}
              onAdd={() => setAddMatOpen(true)}
              onEdit={mat => setEditMat(mat)}
              onDelete={(id, name) => deleteMaterial(id, name)}
            />
          )}
          {section === 'pending' && (
            <PendingRequests materials={materials} requests={requests} onOpen={setSelectedReq} />
          )}
          {section === 'borrowed' && (
            <BorrowedMaterials materials={materials} requests={requests} onOpen={setSelectedReq} />
          )}
          {section === 'log' && (
            <ActivityLog activityLog={activityLog} onClear={clearLog} />
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          MODALS
      ═══════════════════════════════════════════════ */}

      {/* Request action */}
      <Modal isOpen={!!selectedReq} onClose={() => setSelectedReq(null)}
        title={selectedReq ? `Request — ${selectedReq.reference || selectedReq.id}` : ''} size="lg">
        <RequestActionModal
          req={selectedReq}
          material={selectedMaterial}
          onApprove={handleApprove}
          onReject={handleReject}
          onReturn={handleReturn}
          onCancel={handleCancel}
          onClose={() => setSelectedReq(null)}
        />
      </Modal>

      {/* Add material */}
      <Modal isOpen={addMatOpen} onClose={() => setAddMatOpen(false)} title="Add New Material" size="lg">
        <MaterialFormModal onSave={addMaterial} onClose={() => setAddMatOpen(false)} />
      </Modal>

      {/* Edit material */}
      <Modal isOpen={!!editMat} onClose={() => setEditMat(null)} title="Edit Material" size="lg">
        <MaterialFormModal
          initial={editMat}
          onSave={data => { updateMaterial(editMat.id, data); setEditMat(null); }}
          onClose={() => setEditMat(null)}
        />
      </Modal>
    </div>
  );
}
