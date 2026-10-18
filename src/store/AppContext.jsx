// src/store/AppContext.jsx
// LIKHAYON — Inventory-aware state management
//
// Borrowing lifecycle:
//   Submitted (Pending)  → available UNCHANGED
//   Approved             → available -= req.quantity  (reserved)
//   Rejected             → available UNCHANGED
//   Cancelled (Pending)  → available UNCHANGED (nothing was reserved)
//   Cancelled (Approved) → available += req.quantity  (releases reservation)
//   Returned             → available += req.quantity  (restores stock)
//
// "available" always reflects units that can still be lent right now.

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { materials as defaultMaterials } from '../data/materials';
import { archiveEntries as defaultArchive } from '../data/archive';
import { initialRequests, generateReference } from '../data/requests';

const AppContext = createContext(null);

const LS_MATERIALS = 'likhayon_materials';
const LS_ARCHIVE   = 'likhayon_archive';
const LS_REQUESTS  = 'likhayon_requests';
const LS_LOG       = 'likhayon_activity_log';

const MAX_LOG_ENTRIES = 200;

function loadOrDefault(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage write failed:', e);
  }
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

// ── Activity log entry types ─────────────────────────────────────
export const LOG_TYPES = {
  REQUEST_SUBMITTED:  { label: 'Request Submitted',  color: 'blue',    icon: 'FileText'   },
  REQUEST_APPROVED:   { label: 'Request Approved',   color: 'emerald', icon: 'CheckCircle' },
  REQUEST_REJECTED:   { label: 'Request Rejected',   color: 'red',     icon: 'XCircle'    },
  REQUEST_RETURNED:   { label: 'Materials Returned', color: 'violet',  icon: 'RotateCcw'  },
  REQUEST_CANCELLED:  { label: 'Request Cancelled',  color: 'gray',    icon: 'X'          },
  MATERIAL_ADDED:     { label: 'Material Added',     color: 'green',   icon: 'Plus'       },
  MATERIAL_UPDATED:   { label: 'Material Updated',   color: 'amber',   icon: 'Edit3'      },
  MATERIAL_DELETED:   { label: 'Material Deleted',   color: 'red',     icon: 'Trash2'     },
};

function makeLogEntry(type, title, detail = '') {
  return {
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type,
    title,
    detail,
    timestamp: new Date().toISOString(),
  };
}

// Seed log from existing demo data
const SEED_LOG = [
  makeLogEntry('REQUEST_RETURNED',  'Materials Returned — BulSU Dance Troupe',  'Barong Tagalog Heritage Ensemble × 8 returned in Excellent condition'),
  makeLogEntry('REQUEST_APPROVED',  'Request Approved — St. Michael Parish',    'Kawayan Triumphal Arch × 1 reserved for Obando Parish Fiesta 2025'),
  makeLogEntry('REQUEST_REJECTED',  'Request Rejected — Bocaue Elementary',     'Obando Ritual Dance Headdresses × 6 — All units reserved for Obando Festival'),
  makeLogEntry('REQUEST_SUBMITTED', 'New Request — Malolos NHS Cultural Club',  'Giant Parol Star Lanterns × 10 requested for MNHS Christmas Cultural Showcase'),
  makeLogEntry('REQUEST_SUBMITTED', 'New Request — Meycauayan Tourism Office',  'Festival Street Banners × 30 requested for City Foundation Anniversary'),
  makeLogEntry('MATERIAL_ADDED',    'Material Added — Kawayan Triumphal Arch',  'Added to inventory: Bamboo Structures · 2 units · Obando, Bulacan'),
].reverse();

export function AppProvider({ children }) {
  const [materials, setMaterials] = useState(() => loadOrDefault(LS_MATERIALS, defaultMaterials));
  const [archive,   setArchive]   = useState(() => loadOrDefault(LS_ARCHIVE,   defaultArchive));
  const [requests,  setRequests]  = useState(() => loadOrDefault(LS_REQUESTS,  initialRequests));
  const [activityLog, setActivityLog] = useState(() => loadOrDefault(LS_LOG, SEED_LOG));

  useEffect(() => { save(LS_MATERIALS, materials); }, [materials]);
  useEffect(() => { save(LS_ARCHIVE,   archive);   }, [archive]);
  useEffect(() => { save(LS_REQUESTS,  requests);  }, [requests]);
  useEffect(() => { save(LS_LOG,       activityLog); }, [activityLog]);

  /* ── Internal: add log entry ─────────────────────────── */
  const log = useCallback((type, title, detail = '') => {
    setActivityLog(prev => [makeLogEntry(type, title, detail), ...prev].slice(0, MAX_LOG_ENTRIES));
  }, []);

  /* ── Internal: adjust available count ───────────────── */
  const adjustAvailable = useCallback((materialId, delta) => {
    setMaterials(prev => prev.map(m => {
      if (m.id !== materialId) return m;
      return { ...m, available: clamp(m.available + delta, 0, m.quantity) };
    }));
  }, []);

  /* ── Materials CRUD ──────────────────────────────────── */
  const addMaterial = useCallback((mat) => {
    const newMat = {
      ...mat,
      id: `mat-${Date.now()}`,
      addedDate: new Date().toISOString().split('T')[0],
      available: clamp(Number(mat.available ?? mat.quantity), 0, Number(mat.quantity)),
    };
    setMaterials(prev => [newMat, ...prev]);
    log('MATERIAL_ADDED', `Material Added — ${newMat.name}`,
      `Category: ${newMat.category} · ${newMat.quantity} ${newMat.unit}(s) · ${newMat.origin}`);
    return newMat;
  }, [log]);

  const updateMaterial = useCallback((id, updates) => {
    setMaterials(prev => prev.map(m => {
      if (m.id !== id) return m;
      const merged = { ...m, ...updates };
      merged.available = clamp(Number(merged.available), 0, Number(merged.quantity));
      return merged;
    }));
    log('MATERIAL_UPDATED', `Material Updated — ${updates.name || id}`,
      `Condition: ${updates.condition || '—'} · Available: ${updates.available ?? '—'} / ${updates.quantity ?? '—'}`);
  }, [log]);

  const deleteMaterial = useCallback((id, name = '') => {
    setMaterials(prev => prev.filter(m => m.id !== id));
    log('MATERIAL_DELETED', `Material Deleted — ${name || id}`, 'Removed from inventory');
  }, [log]);

  /* ── Requests ────────────────────────────────────────── */
  const addRequest = useCallback((formData) => {
    const id = `req-${Date.now()}`;
    const newReq = {
      ...formData,
      id,
      reference: generateReference(id),
      status: 'Pending',
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      reviewedBy: null,
      reviewNotes: null,
      returnedAt: null,
      returnNotes: null,
      returnCondition: null,
      cancelledAt: null,
      cancelNotes: null,
    };
    setRequests(prev => [newReq, ...prev]);
    log('REQUEST_SUBMITTED', `New Request — ${newReq.organization}`,
      `${newReq.materialName} × ${newReq.quantity} for ${newReq.festival}`);
    return newReq;
  }, [log]);

  const updateRequestStatus = useCallback((id, status, notes = '') => {
    setRequests(prev => {
      const req = prev.find(r => r.id === id);
      if (!req) return prev;

      if (req.status === 'Pending' && status === 'Approved') {
        adjustAvailable(req.materialId, -Number(req.quantity));
        log('REQUEST_APPROVED', `Request Approved — ${req.organization}`,
          `${req.materialName} × ${req.quantity} reserved · Ref: ${req.reference}`);
      } else if (status === 'Rejected') {
        log('REQUEST_REJECTED', `Request Rejected — ${req.organization}`,
          `${req.materialName} × ${req.quantity} · Reason: ${notes || 'No reason given'}`);
      }

      return prev.map(r =>
        r.id === id
          ? { ...r, status, reviewedAt: new Date().toISOString(), reviewedBy: 'Admin', reviewNotes: notes }
          : r
      );
    });
  }, [adjustAvailable, log]);

  const recordReturn = useCallback((id, notes = '', condition = null) => {
    setRequests(prev => {
      const req = prev.find(r => r.id === id);
      if (!req || req.status !== 'Approved') return prev;

      adjustAvailable(req.materialId, +Number(req.quantity));

      if (condition) {
        setMaterials(m => m.map(mat =>
          mat.id === req.materialId ? { ...mat, condition } : mat
        ));
      }

      log('REQUEST_RETURNED', `Materials Returned — ${req.organization}`,
        `${req.materialName} × ${req.quantity} · Condition: ${condition || 'Not recorded'}`);

      return prev.map(r =>
        r.id === id
          ? { ...r, status: 'Returned', returnedAt: new Date().toISOString(), returnNotes: notes, returnCondition: condition }
          : r
      );
    });
  }, [adjustAvailable, log]);

  const cancelRequest = useCallback((id, notes = '') => {
    setRequests(prev => {
      const req = prev.find(r => r.id === id);
      if (!req) return prev;

      if (req.status === 'Approved') {
        adjustAvailable(req.materialId, +Number(req.quantity));
        log('REQUEST_CANCELLED', `Approved Request Cancelled — ${req.organization}`,
          `${req.materialName} × ${req.quantity} released back to inventory · ${notes}`);
      } else {
        log('REQUEST_CANCELLED', `Request Cancelled — ${req.organization}`,
          `${req.materialName} × ${req.quantity} · ${notes}`);
      }

      return prev.map(r =>
        r.id === id
          ? { ...r, status: 'Cancelled', cancelledAt: new Date().toISOString(), cancelNotes: notes }
          : r
      );
    });
  }, [adjustAvailable, log]);

  const clearLog = useCallback(() => {
    setActivityLog([]);
    save(LS_LOG, []);
  }, []);

  /* ── Computed helpers ────────────────────────────────── */
  const getReservedCount = useCallback((materialId) => {
    return requests
      .filter(r => r.materialId === materialId && r.status === 'Approved')
      .reduce((sum, r) => sum + Number(r.quantity), 0);
  }, [requests]);

  const lookupRequest = useCallback((reference, email) => {
    return requests.find(
      r => r.reference?.toUpperCase() === reference?.toUpperCase().trim() &&
           r.contactEmail?.toLowerCase() === email?.toLowerCase().trim()
    ) || null;
  }, [requests]);

  /* ── Reset ───────────────────────────────────────────── */
  const resetData = useCallback(() => {
    setMaterials(defaultMaterials);
    setArchive(defaultArchive);
    setRequests(initialRequests);
    setActivityLog(SEED_LOG);
    save(LS_MATERIALS, defaultMaterials);
    save(LS_ARCHIVE,   defaultArchive);
    save(LS_REQUESTS,  initialRequests);
    save(LS_LOG,       SEED_LOG);
  }, []);

  const value = {
    materials, archive, requests, activityLog,
    addMaterial, updateMaterial, deleteMaterial,
    addRequest, updateRequestStatus, recordReturn, cancelRequest,
    getReservedCount, lookupRequest, clearLog,
    resetData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
