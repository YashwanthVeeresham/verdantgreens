import React from 'react';

export default function PageIntro({ eyebrow, title, description }) {
  return (
    <div className="text-center space-y-2">
      <span className="text-xs font-bold uppercase tracking-widest text-[#2C6E49]">{eyebrow}</span>
      <h2 className="font-serif text-3xl sm:text-4xl text-[#152A1B]">{title}</h2>
      {description && <p className="text-sm text-[#6C7D6E] max-w-lg mx-auto">{description}</p>}
    </div>
  );
}
