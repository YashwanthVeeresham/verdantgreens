import React from 'react';
import ArrowButton from './ArrowButton';

export default function SectionHeader({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#152A1B]">{title}</h2>
        {subtitle && <p className="text-[11px] text-[#687A6D]">{subtitle}</p>}
      </div>
      {actionLabel && <ArrowButton onClick={onAction}>{actionLabel}</ArrowButton>}
    </div>
  );
}
