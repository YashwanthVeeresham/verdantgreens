import React, { useState } from 'react';
import StarRating from '../ui/StarRating';
import { useStore } from '../../context/StoreContext';
import { LOCALITIES } from '../../constants/config';

const inputCls = 'w-full px-3 py-2 border border-[#DCE6DF] rounded-xl focus:outline-none focus:border-[#2C6E49]';

export default function ReviewForm({ onDone }) {
  const { products, profile, selectedLocality, addReview } = useStore();
  const defaultSku = products[0] ? products[0].sku || products[0].id : '';
  const [form, setForm] = useState({
    name: '',
    locality: selectedLocality,
    rating: 5,
    productSku: defaultSku,
    comment: ''
  });
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.comment.trim()) return;
    const matched = products.find((p) => (p.sku || p.id) === form.productSku);
    addReview({
      id: `rev-${Date.now()}`,
      name: form.name.trim() || profile.name || 'Hyderabad Resident',
      locality: form.locality || selectedLocality,
      role: 'Verified Morning Customer',
      rating: Number(form.rating) || 5,
      productSku: form.productSku,
      productName: matched ? matched.name : 'Fresh Harvest Bowl',
      comment: form.comment.trim(),
      date: 'Just now',
      featured: false
    });
    onDone();
  };

  return (
    <form onSubmit={submit} className="bg-white p-5 rounded-3xl border border-[#E2EAE4] shadow-sm space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-[11px] font-bold text-[#152A1B] block mb-1">Your Name</label>
          <input
            type="text"
            required
            placeholder={profile.name || 'e.g. Rohan Sharma'}
            value={form.name}
            onChange={(e) => set({ name: e.target.value })}
            className={inputCls}
          />
        </div>
        <div>
          <label className="text-[11px] font-bold text-[#152A1B] block mb-1">Hyderabad Hub</label>
          <select value={form.locality} onChange={(e) => set({ locality: e.target.value })} className={`${inputCls} bg-white`}>
            {LOCALITIES.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[11px] font-bold text-[#152A1B] block mb-1">Ordered Bowl / Tray</label>
          <select value={form.productSku} onChange={(e) => set({ productSku: e.target.value })} className={`${inputCls} bg-white`}>
            {products.map((p) => (
              <option key={p.sku || p.id} value={p.sku || p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-[11px] font-bold text-[#152A1B] block mb-1">Your Review</label>
        <textarea
          rows={2}
          required
          placeholder="How was the morning harvest freshness, crunch, and delivery timing?"
          value={form.comment}
          onChange={(e) => set({ comment: e.target.value })}
          className={inputCls}
        />
      </div>

      <div className="flex items-center justify-between">
        <StarRating value={form.rating} size={16} onChange={(rating) => set({ rating })} />
        <button type="submit" className="px-5 py-2 bg-[#153B2B] hover:bg-[#234F3C] text-white rounded-full font-bold transition">
          Post Review
        </button>
      </div>
    </form>
  );
}
