import React from 'react';

export default function Spinner({ label, size = 'md' }) {
  const dim = size === 'lg' ? 'w-10 h-10' : 'w-9 h-9';
  return (
    <div className="py-12 text-center text-[#5C6E5F] space-y-3">
      <div className={`${dim} border-4 border-[#2C6E49] border-t-transparent rounded-full animate-spin mx-auto`} />
      {label && <p className="text-xs font-medium">{label}</p>}
    </div>
  );
}
