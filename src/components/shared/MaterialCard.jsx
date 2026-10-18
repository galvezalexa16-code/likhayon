// src/components/shared/MaterialCard.jsx
import { Link } from 'react-router-dom';
import { Package, MapPin, Tag, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { getAvailabilityColor, getConditionColor } from '../../utils/helpers';

export default function MaterialCard({ material, onClick }) {
  const availColor = getAvailabilityColor(material.available, material.quantity);
  const isUnavailable = material.available === 0;

  return (
    <div
      onClick={() => onClick && onClick(material)}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group border border-gray-100 hover:border-[#3d7a35]/30"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-[#f0ebe0]">
        <img
          src={material.imageUrl}
          alt={material.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => { e.target.src = '/images/materials/kawayan-arch.jpg'; }}
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#1e3d1a]/80 text-white text-[10px] font-medium rounded uppercase tracking-wider backdrop-blur-sm">
          {material.category}
        </span>
        {/* Availability badge */}
        <span className={`absolute top-3 right-3 px-2 py-0.5 text-[11px] font-semibold rounded-full backdrop-blur-sm ${availColor}`}>
          {isUnavailable ? 'Unavailable' : `${material.available} available`}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif font-semibold text-[#1a1a18] text-base leading-tight mb-1 group-hover:text-[#2d5a27] transition-colors line-clamp-2">
          {material.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-[#6b6b5e] mb-2">
          <MapPin size={11} />
          <span>{material.origin} — {material.festival}</span>
        </div>

        <p className="text-xs text-[#6b6b5e] line-clamp-2 mb-3">{material.description}</p>

        <div className="flex items-center justify-between text-xs">
          <span className={`font-medium ${getConditionColor(material.condition)}`}>
            {material.condition}
          </span>
          <div className="flex items-center gap-1 text-[#6b6b5e]">
            <Package size={11} />
            <span>{material.quantity} total</span>
          </div>
        </div>

        {material.tags && (
          <div className="flex flex-wrap gap-1 mt-3">
            {material.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-1.5 py-0.5 bg-[#f0ebe0] text-[#6b6b5e] text-[10px] rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
