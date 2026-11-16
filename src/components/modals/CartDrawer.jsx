import React, { useEffect } from 'react';
import { X, ShoppingBag, Leaf, Plus, Minus, Truck, Tag, MapPin, Phone, Home, User, Lock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { getProductImage } from '../../utils/images';
import { getId } from '../../utils/filters';
import { COUPONS, FREE_SHIPPING_THRESHOLD } from '../../constants/config';

function CartLine({ item }) {
  const { updateQty } = useStore();
  const id = getId(item);
  const lineTotal = Number(item.price) * Number(item.qty);

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#E2EAE4] bg-white p-3 shadow-[0_1px_2px_rgba(21,59,43,0.04)] transition hover:border-[#2C6E49]/40 hover:shadow-[0_8px_24px_-12px_rgba(21,59,43,0.25)]">
      <img
        src={getProductImage(item)}
        alt={item.name}
        className="h-16 w-16 shrink-0 rounded-xl border border-[#E2EAE4] object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#152A1B]">{item.name.split('/')[0]}</p>
        <p className="text-xs text-[#7A8C7E]">₹{item.price} each</p>
        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#F1F6F2] p-0.5">
          <button
            type="button"
            onClick={() => updateQty(id, -1)}
            aria-label="Decrease quantity"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#153B2B] shadow-sm transition hover:bg-[#153B2B] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49]"
          >
            <Minus size={12} aria-hidden="true" />
          </button>
          <span className="w-6 text-center text-xs font-bold text-[#152A1B]">{item.qty}</span>
          <button
            type="button"
            onClick={() => updateQty(id, 1)}
            aria-label="Increase quantity"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#153B2B] shadow-sm transition hover:bg-[#153B2B] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49]"
          >
            <Plus size={12} aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="shrink-0 self-start text-sm font-extrabold text-[#153B2B]">₹{lineTotal}</p>
    </div>
  );
}

function DeliveryField({ label, icon: Icon, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-[#6C7D6E]">{label}</label>
      <div className="relative">
        <Icon
          size={14}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#2C6E49]"
        />
        <input
          {...props}
          className="h-10 w-full rounded-xl border border-[#DCE6DF] bg-[#F8FBF9] pl-9 pr-3 text-xs text-[#152A1B] transition hover:border-[#B9D0BF] focus:border-[#2C6E49] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2C6E49]/10"
        />
      </div>
    </div>
  );
}

function DeliveryForm() {
  const { profile, updateProfile, setIsCartOpen, setActiveTab } = useStore();
  return (
    <div className="space-y-3 rounded-2xl border border-[#E2EAE4] bg-[#F8FBF9] p-4">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2C6E49]">
          <MapPin size={13} aria-hidden="true" />
          Delivery Details
        </p>
        <button
          type="button"
          onClick={() => {
            setIsCartOpen(false);
            setActiveTab('profile');
          }}
          className="rounded text-[10px] font-bold text-[#2C6E49] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49]"
        >
          Edit in Profile
        </button>
      </div>
      <div className="space-y-2.5">
        <DeliveryField
          label="Full Name"
          icon={User}
          type="text"
          value={profile.name}
          onChange={(e) => updateProfile({ name: e.target.value })}
        />
        <div className="grid grid-cols-2 gap-2.5">
          <DeliveryField
            label="Phone"
            icon={Phone}
            type="text"
            value={profile.phone}
            onChange={(e) => updateProfile({ phone: e.target.value })}
          />
          <DeliveryField
            label="Pincode"
            icon={MapPin}
            type="text"
            value={profile.pincode}
            onChange={(e) => updateProfile({ pincode: e.target.value })}
          />
        </div>
        <DeliveryField
          label="Street & Flat / House"
          icon={Home}
          type="text"
          value={profile.street}
          onChange={(e) => updateProfile({ street: e.target.value })}
        />
      </div>
    </div>
  );
}

function ShippingProgress({ subtotal }) {
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const pct = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  return (
    <div className="rounded-2xl bg-[#EAF5EC] p-3.5">
      <p className="flex items-center gap-2 text-xs font-semibold text-[#153B2B]">
        <Truck size={15} className="text-[#2C6E49]" aria-hidden="true" />
        {remaining === 0 ? (
          <span>You've unlocked free morning delivery!</span>
        ) : (
          <span>
            Add <strong>₹{remaining}</strong> more for free delivery
          </span>
        )}
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#2C6E49] to-[#98E59E] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function CartSummary() {
  const {
    totals,
    appliedCoupon,
    couponInput,
    setCouponInput,
    couponError,
    applyCoupon,
    profile,
    selectedLocality,
    checkout,
    isSubmitting
  } = useStore();

  const coupon = COUPONS[appliedCoupon];
  const belowMin = coupon && totals.subtotal < coupon.minSubtotal;

  return (
    <div className="space-y-3 border-t border-[#E6ECE7] bg-white pt-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag
            size={14}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#2C6E49]"
          />
          <input
            type="text"
            placeholder="Coupon (HYD15 or MORNING20)"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            className="h-10 w-full rounded-xl border border-[#DCE6DF] bg-[#F8FBF9] pl-9 pr-3 text-xs transition focus:border-[#2C6E49] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2C6E49]/10"
          />
        </div>
        <button
          type="button"
          onClick={() => applyCoupon()}
          className="rounded-xl bg-[#153B2B] px-4 text-xs font-bold text-white transition hover:bg-[#234F3C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49] focus-visible:ring-offset-2"
        >
          Apply
        </button>
      </div>

      {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}

      {belowMin && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] text-amber-700">
          Add ₹{coupon.minSubtotal - totals.subtotal} more to unlock {coupon.label} with <strong>{appliedCoupon}</strong>.
        </p>
      )}

      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between text-[#7A8C7E]">
          <span>Subtotal</span>
          <span>₹{totals.subtotal}</span>
        </div>
        {totals.discount > 0 && (
          <div className="flex justify-between font-semibold text-[#2C6E49]">
            <span>
              Code: {appliedCoupon} ({coupon.label})
            </span>
            <span>-₹{totals.discount}</span>
          </div>
        )}
        <div className="flex justify-between text-[#7A8C7E]">
          <span>Morning Delivery ({profile.locality || selectedLocality})</span>
          <span className={totals.shipping === 0 ? 'font-semibold text-[#2C6E49]' : ''}>
            {totals.shipping === 0 ? `FREE (Over ₹${FREE_SHIPPING_THRESHOLD})` : `₹${totals.shipping}`}
          </span>
        </div>
        <div className="flex items-baseline justify-between border-t border-dashed border-[#DCE6DF] pt-3 text-[#152A1B]">
          <span className="text-sm font-bold">Total Amount</span>
          <span className="font-serif text-2xl font-bold">₹{totals.total}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={checkout}
        disabled={isSubmitting}
        className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_-12px_rgba(21,59,43,0.7)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49] focus-visible:ring-offset-2 ${
          isSubmitting ? 'cursor-not-allowed bg-[#7A8C7E]' : 'bg-[#153B2B] hover:bg-[#234F3C] active:scale-[0.99]'
        }`}
      >
        <Lock size={15} aria-hidden="true" />
        <span>{isSubmitting ? 'Scheduling with Harvest API...' : `Confirm Order via UPI / COD (₹${totals.total})`}</span>
      </button>
    </div>
  );
}

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, totals } = useStore();

  // Close on Escape and lock page scroll while the drawer is open
  useEffect(() => {
    if (!isCartOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setIsCartOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const itemCount = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);

  return (
    <div
      className="vg-fade fixed inset-0 z-50 flex justify-end overflow-hidden bg-black/40 backdrop-blur-sm"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Your Harvest Basket"
        onClick={(e) => e.stopPropagation()}
        className="vg-slide flex h-full w-full max-w-md flex-col bg-white p-5 shadow-2xl sm:rounded-l-3xl sm:p-6"
      >
        <div className="flex items-center justify-between border-b border-[#E6ECE7] pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#153B2B] text-[#98E59E]">
              <ShoppingBag size={19} aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-serif text-xl font-bold leading-tight text-[#152A1B]">Your Harvest Basket</h3>
              {cart.length > 0 && (
                <p className="text-[11px] text-[#7A8C7E]">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} ready for tomorrow morning
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#5C6E5F] transition hover:bg-[#F1F6F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49]"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto py-4 pr-1">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-3 py-12 text-center text-[#7A8C7E]">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF5EC]">
                <Leaf size={34} className="text-[#2C6E49]" aria-hidden="true" />
              </span>
              <p className="font-serif text-lg font-bold text-[#152A1B]">Your basket is currently empty.</p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="rounded-full bg-[#153B2B] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#234F3C]"
              >
                Keep Shopping
              </button>
            </div>
          ) : (
            <>
              <ShippingProgress subtotal={totals.subtotal} />
              <div className="space-y-3">
                {cart.map((item) => (
                  <CartLine key={getId(item)} item={item} />
                ))}
              </div>
              <DeliveryForm />
            </>
          )}
        </div>

        {cart.length > 0 && <CartSummary />}
      </div>

      <style>{`
        @keyframes vg-slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes vg-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .vg-slide { animation: vg-slide-in 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
        .vg-fade { animation: vg-fade-in 0.2s ease-out; }
        @media (prefers-reduced-motion: reduce) { .vg-slide, .vg-fade { animation: none; } }
      `}</style>
    </div>
  );
}