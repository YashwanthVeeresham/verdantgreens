import React, { useState } from 'react';
import PageIntro from '../components/ui/PageIntro';
import { GROWTH_STAGES } from '../data/products';

export default function FarmPage() {
  const [stageIdx, setStageIdx] = useState(1);
  const stage = GROWTH_STAGES[stageIdx];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageIntro
        eyebrow="Clean Hydroponic Cultivation"
        title="The Biology: Sprouts vs Microgreens"
        description="How living enzymes progress from seed awakening to full leaf development."
      />

      <div className="flex justify-center space-x-2 border-b border-[#E6ECE7] pb-4 overflow-x-auto">
        {GROWTH_STAGES.map((s, idx) => (
          <button
            key={s.tab}
            onClick={() => setStageIdx(idx)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full transition shrink-0 ${
              stageIdx === idx ? 'bg-[#153B2B] text-white' : 'bg-[#EAF0EC] text-[#5C6E5F]'
            }`}
          >
            {s.tab}
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-[#E2EAE4] space-y-5">
        <div className="h-56 w-full rounded-2xl overflow-hidden shadow-inner">
          <img src={stage.image} alt={stage.alt} className="w-full h-full object-cover" />
        </div>
        <h3 className="font-serif text-2xl text-[#152A1B]">{stage.title}</h3>
        <p className="text-sm text-[#5C6E5F] leading-relaxed">{stage.body}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {stage.facts.map(([label, value]) => (
            <div key={label} className="p-4 bg-[#F5F8F6] rounded-xl">
              <p className="text-xs text-[#7A8C7E]">{label}</p>
              <p className="font-bold text-[#152A1B]">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
