// src/utils/helpers.js

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-PH', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('en-PH', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function getAvailabilityColor(available, total) {
  if (available === 0) return 'text-red-600 bg-red-50';
  const ratio = available / total;
  if (ratio <= 0.25) return 'text-orange-600 bg-orange-50';
  if (ratio <= 0.5) return 'text-yellow-700 bg-yellow-50';
  return 'text-green-700 bg-green-50';
}

export function getStatusColor(status) {
  switch (status) {
    case 'Pending': return 'text-yellow-800 bg-yellow-100';
    case 'Approved': return 'text-green-800 bg-green-100';
    case 'Rejected': return 'text-red-800 bg-red-100';
    case 'Returned': return 'text-blue-800 bg-blue-100';
    default: return 'text-gray-800 bg-gray-100';
  }
}

export function getConditionColor(condition) {
  switch (condition) {
    case 'Excellent': return 'text-emerald-700';
    case 'Very Good': return 'text-green-700';
    case 'Good': return 'text-yellow-700';
    case 'Fair': return 'text-orange-700';
    case 'Needs Repair': return 'text-red-700';
    default: return 'text-gray-600';
  }
}

export function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
}

export function truncate(str, len = 120) {
  if (!str) return '';
  return str.length <= len ? str : str.slice(0, len).trim() + '…';
}
