// src/pages/BorrowingRequest.jsx
// LIKHAYON — Borrowing Request Form
// ⚠ PROTOTYPE ONLY — No emails are sent. No real request is processed.
import { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle, AlertCircle, FileText, Calendar, Building, Info,
  Package, MapPin, ArrowRight, AlertTriangle, User, Phone, Mail,
  Clipboard, ChevronDown, Star, Search, ExternalLink,
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { ORG_TYPES } from '../data/requests';

/* ─────────────────────────────────────────────────────────────────
   FIELD COMPONENTS
───────────────────────────────────────────────────────────────── */
function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
      <AlertCircle size={11} /> {msg}
    </p>
  );
}

function Label({ children, required, hint }) {
  return (
    <div className="mb-1.5">
      <label className="block text-xs font-semibold text-[#1a1a18] uppercase tracking-wide">
        {children} {required && <span className="text-red-500">*</span>}
      </label>
      {hint && <p className="text-[10px] text-[#9e9e8f] mt-0.5">{hint}</p>}
    </div>
  );
}

function Input({ id, type = 'text', value, onChange, placeholder, error, min, max, ...rest }) {
  return (
    <>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all bg-white text-[#1a1a18] placeholder:text-[#c0b9ad] ${
          error
            ? 'border-red-400 focus:ring-red-200 bg-red-50'
            : 'border-[#e0d8cc] focus:border-[#3d7a35] focus:ring-[#3d7a35]/20'
        }`}
        {...rest}
      />
      <FieldError msg={error} />
    </>
  );
}

function Select({ id, value, onChange, children, error }) {
  return (
    <>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all bg-white text-[#1a1a18] appearance-none pr-10 ${
            error
              ? 'border-red-400 focus:ring-red-200 bg-red-50'
              : 'border-[#e0d8cc] focus:border-[#3d7a35] focus:ring-[#3d7a35]/20'
          }`}
        >
          {children}
        </select>
        <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9e9e8f] pointer-events-none" />
      </div>
      <FieldError msg={error} />
    </>
  );
}

function Textarea({ id, value, onChange, placeholder, error, rows = 4, maxLength }) {
  return (
    <>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all bg-white text-[#1a1a18] placeholder:text-[#c0b9ad] resize-none ${
          error
            ? 'border-red-400 focus:ring-red-200 bg-red-50'
            : 'border-[#e0d8cc] focus:border-[#3d7a35] focus:ring-[#3d7a35]/20'
        }`}
      />
      {maxLength && (
        <p className="text-right text-[10px] text-[#9e9e8f] mt-0.5">{value.length}/{maxLength}</p>
      )}
      <FieldError msg={error} />
    </>
  );
}

function FormSection({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
      <h2 className="font-serif text-lg font-bold text-[#1a1a18] mb-5 pb-3.5 border-b border-gray-100 flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-full bg-[#f0ebe0] flex items-center justify-center flex-shrink-0">
          <Icon size={16} className="text-[#c9942a]" />
        </span>
        {title}
      </h2>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   EMPTY FORM STATE
───────────────────────────────────────────────────────────────── */
const EMPTY_FORM = {
  orgType: '',
  organization: '',
  contactPerson: '',
  contactEmail: '',
  contactPhone: '',
  materialId: '',
  quantity: 1,
  festival: '',
  intendedUse: '',
  additionalNotes: '',
  borrowDate: '',
  returnDate: '',
  agreeToTerms: false,
};

/* ─────────────────────────────────────────────────────────────────
   CONFIRMATION SCREEN
───────────────────────────────────────────────────────────────── */
function ConfirmationScreen({ req, material, onReset }) {
  return (
    <div className="page-enter min-h-[80vh] flex items-start justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        {/* Prototype banner */}
        <div className="mb-5 flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <AlertTriangle size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 text-xs leading-relaxed">
            <strong>Prototype demonstration only.</strong> This is a simulated request. No email has been sent, and no real request has been received or processed by any organization.
          </p>
        </div>

        {/* Success card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-black/8 border border-gray-100 overflow-hidden">
          {/* Green header */}
          <div className="bg-[#1e3d1a] px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '20px 20px' }} />
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-[#c9942a]/20 border-2 border-[#c9942a]/40 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-[#c9942a]" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-white mb-1">Request Submitted!</h2>
              <p className="text-white/65 text-sm">Your borrowing request is now under review.</p>
            </div>
          </div>

          {/* Reference number */}
          <div className="px-8 py-6 border-b border-gray-100 text-center bg-[#f9f7f4]">
            <p className="text-xs font-bold uppercase tracking-widest text-[#9e9e8f] mb-2">Your Reference Number</p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#c9942a] rounded-xl">
              <Clipboard size={16} className="text-[#c9942a]" />
              <span className="font-mono text-xl font-bold text-[#1a1a18] tracking-wider">{req.reference}</span>
            </div>
            <p className="text-xs text-[#9e9e8f] mt-2.5">Save this reference to track your request</p>
          </div>

          {/* Status + details */}
          <div className="px-8 py-6 space-y-4">
            {/* Status */}
            <div className="flex items-center gap-3 p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-800">Status: Pending Review</p>
                <p className="text-xs text-amber-700 mt-0.5">In a real system, admin would review within 2–3 business days</p>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2.5">
              {[
                ['Material', req.materialName],
                ['Quantity', `${req.quantity} ${material?.unit || 'unit'}${req.quantity > 1 ? 's' : ''}`],
                ['Organization', req.organization],
                ['Contact', req.contactEmail],
                ['Planned Dates', `${formatDateShort(req.borrowDate)} → ${formatDateShort(req.returnDate)}`],
              ].map(([label, val]) => (
                <div key={label} className="flex gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#9e9e8f] w-24 flex-shrink-0 pt-0.5">{label}</span>
                  <span className="text-sm text-[#1a1a18] font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="px-8 pb-8 space-y-3">
            <Link
              to={`/track?ref=${req.reference}&email=${encodeURIComponent(req.contactEmail)}`}
              className="w-full py-3 bg-[#1e3d1a] text-white font-semibold rounded-xl text-sm hover:bg-[#2d5a27] transition-colors flex items-center justify-center gap-2"
            >
              <Search size={15} /> Track This Request
            </Link>
            <button
              id="submit-another-btn"
              onClick={onReset}
              className="w-full py-3 bg-[#f0ebe0] text-[#1a1a18] font-semibold rounded-xl text-sm hover:bg-[#e0d8cc] transition-colors"
            >
              Submit Another Request
            </button>
            <Link
              to="/materials"
              className="w-full py-3 border border-gray-200 text-[#6b6b5e] font-medium rounded-xl text-sm hover:bg-[#f0ebe0] transition-colors flex items-center justify-center gap-1.5"
            >
              Back to Materials Bank
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDateShort(d) {
  if (!d) return '—';
  return new Date(d + 'T00:00:00').toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function BorrowingRequest() {
  const { materials, addRequest } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const formTopRef = useRef(null);

  // Pre-select material from URL (?materialId=...) or router state
  const initialMaterialId = (() => {
    if (location.state?.materialId) return location.state.materialId;
    const params = new URLSearchParams(location.search);
    return params.get('materialId') || '';
  })();

  const [form, setForm] = useState({ ...EMPTY_FORM, materialId: initialMaterialId });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedReq, setSubmittedReq] = useState(null);

  const today = new Date().toISOString().split('T')[0];
  const selectedMaterial = materials.find(m => m.id === form.materialId);

  // Auto-update quantity max when material changes
  useEffect(() => {
    if (selectedMaterial && form.quantity > selectedMaterial.available) {
      setForm(prev => ({ ...prev, quantity: Math.max(1, selectedMaterial.available) }));
    }
  }, [form.materialId]);

  const set = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  /* ── Validation ─────────────────────────────────── */
  function validate() {
    const e = {};
    if (!form.orgType) e.orgType = 'Please select your organization type';
    if (!form.organization.trim()) e.organization = 'Organization name is required';
    if (!form.contactPerson.trim()) e.contactPerson = 'Contact person name is required';
    if (!form.contactEmail.trim()) {
      e.contactEmail = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) {
      e.contactEmail = 'Please enter a valid email address';
    }
    if (!form.contactPhone.trim()) e.contactPhone = 'Contact phone number is required';
    if (!form.materialId) e.materialId = 'Please select a material to borrow';
    if (!form.quantity || Number(form.quantity) < 1) {
      e.quantity = 'Quantity must be at least 1';
    } else if (selectedMaterial && Number(form.quantity) > selectedMaterial.available) {
      e.quantity = `Only ${selectedMaterial.available} ${selectedMaterial.unit}s currently available`;
    }
    if (!form.festival.trim()) e.festival = 'Please name the festival or activity';
    if (!form.intendedUse.trim() || form.intendedUse.trim().length < 30) {
      e.intendedUse = 'Please describe your intended use (at least 30 characters)';
    }
    if (!form.borrowDate) {
      e.borrowDate = 'Pickup date is required';
    } else if (form.borrowDate < today) {
      e.borrowDate = 'Pickup date cannot be in the past';
    }
    if (!form.returnDate) {
      e.returnDate = 'Return date is required';
    } else if (form.returnDate <= form.borrowDate) {
      e.returnDate = 'Return date must be after the pickup date';
    } else {
      // Max 30 days
      const diff = (new Date(form.returnDate) - new Date(form.borrowDate)) / (1000 * 60 * 60 * 24);
      if (diff > 30) e.returnDate = 'Maximum loan period is 30 days';
    }
    if (!form.agreeToTerms) e.agreeToTerms = 'You must agree to the borrowing terms to continue';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      const first = Object.keys(errs)[0];
      document.getElementById(first)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const req = addRequest({
      orgType: form.orgType,
      organization: form.organization.trim(),
      contactPerson: form.contactPerson.trim(),
      contactEmail: form.contactEmail.trim().toLowerCase(),
      contactPhone: form.contactPhone.trim(),
      materialId: form.materialId,
      materialName: selectedMaterial?.name || '',
      quantity: Number(form.quantity),
      festival: form.festival.trim(),
      intendedUse: form.intendedUse.trim(),
      additionalNotes: form.additionalNotes.trim(),
      borrowDate: form.borrowDate,
      returnDate: form.returnDate,
    });
    setSubmittedReq(req);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleReset() {
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
    setSubmittedReq(null);
  }

  if (submitted && submittedReq) {
    return <ConfirmationScreen req={submittedReq} material={selectedMaterial} onReset={handleReset} />;
  }

  /* ── Available material options, grouped by category ── */
  const availableMats = materials.filter(m => m.available > 0);
  const unavailableMats = materials.filter(m => m.available === 0);

  return (
    <div className="page-enter" ref={formTopRef}>

      {/* ── Page Header ─────────────────────────────────── */}
      <div className="bg-[#1a2e18] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490750967868-88df5691cc90?w=1200&q=30')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative page-container pt-28 pb-14 text-white">
          <p className="text-[#c9942a] text-xs font-semibold tracking-widest uppercase mb-3">Community Access</p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mb-3 tracking-tight">Borrowing Request</h1>
          <p className="text-white/75 max-w-xl text-sm sm:text-base leading-relaxed">
            Request to borrow cultural materials from LIKHAYON for your festival, school event, or community celebration. All requests are reviewed within 2–3 business days.
          </p>
        </div>
      </div>

      {/* ── Prototype notice ────────────────────────────── */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="page-container py-3 flex items-center gap-3">
          <AlertTriangle size={14} className="text-amber-600 flex-shrink-0" />
          <p className="text-amber-800 text-xs leading-snug">
            <strong>Front-end prototype:</strong> Submitting this form will store a simulated request in your browser's localStorage. No email is sent and no real request is received.
          </p>
          <Link to="/track" className="ml-auto text-xs text-amber-700 underline whitespace-nowrap flex-shrink-0 hover:text-amber-900 flex items-center gap-1">
            Track a request <ExternalLink size={10} />
          </Link>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────── */}
      <div className="page-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── FORM ────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <form id="borrow-form" onSubmit={handleSubmit} noValidate>

              {/* ── Section 1: Applicant ─────────────── */}
              <FormSection icon={Building} title="Applicant Information">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label required>Organization Type</Label>
                    <Select id="orgType" value={form.orgType} onChange={set('orgType')} error={errors.orgType}>
                      <option value="">— Select organization type —</option>
                      {ORG_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <Label required hint="Full legal name of your school, organization, or group">
                      Organization / Group Name
                    </Label>
                    <Input id="organization" value={form.organization} onChange={set('organization')} placeholder="e.g., Malolos National High School Cultural Club" error={errors.organization} />
                  </div>
                  <div>
                    <Label required>Contact Person</Label>
                    <Input id="contactPerson" value={form.contactPerson} onChange={set('contactPerson')} placeholder="Full name" error={errors.contactPerson} />
                  </div>
                  <div>
                    <Label required>Contact Phone</Label>
                    <Input id="contactPhone" type="tel" value={form.contactPhone} onChange={set('contactPhone')} placeholder="09XX-XXX-XXXX" error={errors.contactPhone} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label required hint="Used to send your reference number and decision notice">
                      Email Address
                    </Label>
                    <Input id="contactEmail" type="email" value={form.contactEmail} onChange={set('contactEmail')} placeholder="your.email@organization.org" error={errors.contactEmail} />
                  </div>
                </div>
              </FormSection>

              {/* ── Section 2: Material ─────────────── */}
              <FormSection icon={Package} title="Material Request">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label required>Select Material</Label>
                    <Select id="materialId" value={form.materialId} onChange={set('materialId')} error={errors.materialId}>
                      <option value="">— Select a material —</option>
                      {availableMats.length > 0 && (
                        <optgroup label="✓ Available Now">
                          {availableMats.map(m => (
                            <option key={m.id} value={m.id}>
                              {m.name} — {m.available} of {m.quantity} {m.unit}s available
                            </option>
                          ))}
                        </optgroup>
                      )}
                      {unavailableMats.length > 0 && (
                        <optgroup label="✗ Currently On Loan">
                          {unavailableMats.map(m => (
                            <option key={m.id} value={m.id} disabled>
                              {m.name} — All {m.quantity} on loan
                            </option>
                          ))}
                        </optgroup>
                      )}
                    </Select>
                  </div>

                  {/* Material preview card */}
                  {selectedMaterial && (
                    <div className="sm:col-span-2 rounded-xl border border-[#e0d8cc] overflow-hidden">
                      <div className="flex gap-3 items-start p-4 bg-[#f9f7f4]">
                        <img
                          src={selectedMaterial.imageUrl}
                          alt={selectedMaterial.name}
                          className="w-18 h-16 w-16 object-cover rounded-lg flex-shrink-0 bg-[#e0d8cc]"
                          onError={e => { e.target.src = '/images/materials/kawayan-arch.jpg'; }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif font-bold text-[#1a1a18] text-sm leading-snug">{selectedMaterial.name}</p>
                          <p className="text-xs text-[#9e9e8f] flex items-center gap-1 mt-0.5">
                            <MapPin size={10} /> {selectedMaterial.origin} · {selectedMaterial.category}
                          </p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            {selectedMaterial.available > 0 ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {selectedMaterial.available} of {selectedMaterial.quantity} {selectedMaterial.unit}s available
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-[10px] font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> All on loan
                              </span>
                            )}
                            <span className="text-[10px] text-[#9e9e8f]">Condition: {selectedMaterial.condition}</span>
                          </div>
                        </div>
                        <Link to="/materials" className="flex-shrink-0 text-[10px] text-[#2d5a27] flex items-center gap-1 hover:text-[#c9942a] transition-colors mt-0.5">
                          View <ExternalLink size={10} />
                        </Link>
                      </div>
                      {selectedMaterial.usageNotes && (
                        <div className="px-4 py-2.5 border-t border-[#e0d8cc] flex items-start gap-2 bg-white">
                          <Info size={12} className="text-[#c9942a] flex-shrink-0 mt-0.5" />
                          <p className="text-[11px] text-[#6b6b5e] leading-relaxed">{selectedMaterial.usageNotes}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <Label required hint={selectedMaterial ? `Max: ${selectedMaterial.available} ${selectedMaterial.unit}s` : undefined}>
                      Requested Quantity
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      min={1}
                      max={selectedMaterial?.available || 9999}
                      value={form.quantity}
                      onChange={set('quantity')}
                      error={errors.quantity}
                    />
                  </div>
                </div>
              </FormSection>

              {/* ── Section 3: Event Details ─────────── */}
              <FormSection icon={Star} title="Festival & Event Details">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label required hint="Name of the festival, school event, barangay activity, etc.">
                      Festival or Activity Name
                    </Label>
                    <Input id="festival" value={form.festival} onChange={set('festival')} placeholder="e.g., Obando Parish Fiesta 2025, MNHS Heritage Week" error={errors.festival} />
                  </div>
                  <div>
                    <Label required hint="Describe how the material will be used, displayed, or worn. Minimum 30 characters.">
                      Purpose of Use
                    </Label>
                    <Textarea
                      id="intendedUse"
                      rows={5}
                      maxLength={800}
                      value={form.intendedUse}
                      onChange={set('intendedUse')}
                      placeholder="Describe in detail: What event? Where? How will the material be used? How many people will handle it? Who is responsible?"
                      error={errors.intendedUse}
                    />
                  </div>
                  <div>
                    <Label hint="Optional: special handling arrangements, team size, transport plans, etc.">
                      Additional Notes
                    </Label>
                    <Textarea
                      id="additionalNotes"
                      rows={3}
                      maxLength={400}
                      value={form.additionalNotes}
                      onChange={set('additionalNotes')}
                      placeholder="Any other information for the LIKHAYON team (optional)"
                    />
                  </div>
                </div>
              </FormSection>

              {/* ── Section 4: Schedule ──────────────── */}
              <FormSection icon={Calendar} title="Pickup & Return Schedule">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label required hint="When will you pick up the materials?">
                      Planned Pickup Date
                    </Label>
                    <Input id="borrowDate" type="date" min={today} value={form.borrowDate} onChange={set('borrowDate')} error={errors.borrowDate} />
                  </div>
                  <div>
                    <Label required hint="Must be after pickup date. Maximum 30-day loan period.">
                      Expected Return Date
                    </Label>
                    <Input id="returnDate" type="date" min={form.borrowDate || today} value={form.returnDate} onChange={set('returnDate')} error={errors.returnDate} />
                  </div>

                  {/* Duration info */}
                  {form.borrowDate && form.returnDate && form.returnDate > form.borrowDate && (() => {
                    const days = Math.round((new Date(form.returnDate) - new Date(form.borrowDate)) / (1000 * 60 * 60 * 24));
                    return (
                      <div className="sm:col-span-2 flex items-center gap-2 text-xs text-[#2d5a27]">
                        <CheckCircle size={13} />
                        <span>Loan duration: <strong>{days} day{days !== 1 ? 's' : ''}</strong> {days > 21 ? '(approaching max 30-day limit)' : ''}</span>
                      </div>
                    );
                  })()}
                </div>
              </FormSection>

              {/* ── Section 5: Terms ─────────────────── */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <h3 className="font-serif font-bold text-[#1a1a18] mb-4 text-sm">Terms & Conditions</h3>
                <ul className="space-y-1.5 text-xs text-[#6b6b5e] mb-5 list-inside">
                  <li className="flex items-start gap-2"><span className="text-[#c9942a] mt-0.5">•</span> Materials must be returned by the agreed date in the same or better condition.</li>
                  <li className="flex items-start gap-2"><span className="text-[#c9942a] mt-0.5">•</span> Borrower is responsible for transport, handling, and storage during the loan period.</li>
                  <li className="flex items-start gap-2"><span className="text-[#c9942a] mt-0.5">•</span> Maximum loan period is 30 days. Extensions require a new request.</li>
                  <li className="flex items-start gap-2"><span className="text-[#c9942a] mt-0.5">•</span> Any damage must be reported immediately. Borrower may be liable for repair costs.</li>
                  <li className="flex items-start gap-2"><span className="text-[#c9942a] mt-0.5">•</span> Inventory is reserved only upon admin approval — not upon submission.</li>
                  <li className="flex items-start gap-2"><span className="text-[#c9942a] mt-0.5">•</span> LIKHAYON may cancel or modify any loan if materials are needed for higher-priority events.</li>
                </ul>
                <div className="flex items-start gap-3 p-3.5 bg-[#f0ebe0] rounded-xl">
                  <input
                    id="agreeToTerms"
                    type="checkbox"
                    checked={form.agreeToTerms}
                    onChange={set('agreeToTerms')}
                    className="mt-0.5 w-4 h-4 rounded border-[#d4c9b8] text-[#2d5a27] focus:ring-[#2d5a27] cursor-pointer"
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-[#1a1a18] cursor-pointer leading-relaxed">
                    I have read and agree to the LIKHAYON Borrowing Terms and Conditions, and I confirm that the information above is accurate.
                  </label>
                </div>
                <FieldError msg={errors.agreeToTerms} />
              </div>

              {/* ── Submit ───────────────────────────── */}
              <button
                type="submit"
                id="submit-borrow-request"
                className="w-full py-4 bg-[#1e3d1a] text-white font-bold rounded-2xl hover:bg-[#2d5a27] active:scale-[0.99] transition-all text-sm shadow-lg shadow-[#1e3d1a]/20 flex items-center justify-center gap-2"
              >
                <FileText size={16} /> Submit Borrowing Request
              </button>
              <p className="text-center text-[11px] text-[#9e9e8f] mt-3">
                This is a prototype. No real request will be processed or emailed.
              </p>
            </form>
          </div>

          {/* ── SIDEBAR ─────────────────────────────────── */}
          <div className="space-y-5">
            {/* Who can borrow */}
            <div className="bg-[#1e3d1a] rounded-2xl p-5 text-white">
              <h3 className="font-serif font-semibold mb-4 text-[#c9942a] flex items-center gap-2">
                <User size={15} /> Who Can Borrow?
              </h3>
              <ul className="space-y-2 text-sm text-white/80">
                {ORG_TYPES.filter(t => t !== 'Other').slice(0, 8).map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#c9942a] mt-0.5 flex-shrink-0 text-xs">✦</span>
                    <span className="text-xs">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about" className="mt-4 flex items-center gap-1 text-xs text-[#c9942a] hover:text-white transition-colors font-medium">
                Learn more <ArrowRight size={11} />
              </Link>
            </div>

            {/* Process */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-serif font-semibold text-[#1a1a18] mb-4 flex items-center gap-2">
                <Info size={15} className="text-[#c9942a]" /> How It Works
              </h3>
              <ol className="space-y-3">
                {[
                  { n: '01', t: 'Submit this form with your event details' },
                  { n: '02', t: 'Admin reviews your request within 2–3 business days' },
                  { n: '03', t: 'You receive an approval or rejection decision' },
                  { n: '04', t: 'Coordinate material pickup from LIKHAYON' },
                  { n: '05', t: 'Use materials responsibly at your event' },
                  { n: '06', t: 'Return materials by the agreed date' },
                ].map(({ n, t }) => (
                  <li key={n} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#f0ebe0] text-[#2d5a27] font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">{n}</span>
                    <span className="text-xs text-[#6b6b5e] leading-relaxed">{t}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Inventory policy */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <h3 className="font-semibold text-blue-900 text-xs mb-2 flex items-center gap-2">
                <Info size={13} /> Inventory Policy
              </h3>
              <p className="text-xs text-blue-800 leading-relaxed">
                Submitting this form <strong>does not immediately reserve</strong> any materials. Inventory is deducted from available stock only when an admin approves your request. Multiple pending requests for the same material are possible — the first to be approved takes priority.
              </p>
            </div>

            {/* Track existing */}
            <div className="bg-[#f9f7f4] border border-[#e0d8cc] rounded-2xl p-4">
              <h3 className="font-semibold text-[#1a1a18] text-xs mb-2 flex items-center gap-2">
                <Search size={13} className="text-[#c9942a]" /> Already submitted?
              </h3>
              <p className="text-xs text-[#6b6b5e] mb-3">Track the status of an existing request using your reference number and email.</p>
              <Link
                to="/track"
                className="w-full py-2 bg-white border border-[#e0d8cc] text-[#1a1a18] rounded-xl text-xs font-semibold hover:bg-[#f0ebe0] transition-colors flex items-center justify-center gap-1.5"
              >
                <Search size={12} /> Track a Request
              </Link>
            </div>

            {/* Conditions */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <h3 className="font-serif font-semibold text-amber-900 mb-2 text-sm flex items-center gap-2">
                <AlertTriangle size={14} /> Borrowing Conditions
              </h3>
              <ul className="space-y-1.5 text-xs text-amber-800">
                <li>• Return in same or better condition</li>
                <li>• Borrower handles pickup and return transport</li>
                <li>• Maximum 30-day loan period</li>
                <li>• Report damage immediately</li>
                <li>• Repeated non-return may suspend borrowing privileges</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
