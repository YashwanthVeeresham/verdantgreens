import React from 'react';
import { ArrowRight } from 'lucide-react';

const VARIANTS = {
  dark: { btn: 'bg-[#153B2B] hover:bg-[#234F3C] text-white', chip: 'bg-white text-[#153B2B]' },
  deep: { btn: 'bg-[#133325] hover:bg-[#0B2117] text-white', chip: 'bg-white text-[#133325]' }
};

export default function ArrowButton({ children, onClick, variant = 'dark', size = 'md', className = '' }) {
  const v = VARIANTS[variant] || VARIANTS.dark;
  const sizing = size === 'sm' ? 'pl-4 pr-1.5 py-1.5 text-[11px]' : 'pl-4 pr-1.5 py-1.5 text-xs';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center space-x-2 rounded-full font-bold transition shadow-xs ${sizing} ${v.btn} ${className}`}
    >
      <span>{children}</span>
      <span className={`w-5 h-5 rounded-full flex items-center justify-center ${v.chip}`}>
        <ArrowRight size={11} />
      </span>
    </button>
  );
}
