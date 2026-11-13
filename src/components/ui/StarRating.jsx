import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ value, size = 13, onChange }) {
  if (onChange) {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button" onClick={() => onChange(star)} className="p-1" aria-label={`${star} stars`}>
            <Star size={size} className={star <= value ? 'fill-amber-400 text-amber-400' : 'text-[#DCE6DF]'} />
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="flex items-center space-x-0.5">
      {Array.from({ length: value }).map((_, i) => (
        <Star key={i} size={size} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}
