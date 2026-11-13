import React from 'react';
import { X, ShoppingBag, Leaf, Plus, Minus } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { getProductImage } from '../../utils/images';
import { getId } from '../../utils/filters';
import { COUPONS } from '../../constants/config';

function CartLine({ item }) {
  const { updateQty } = useStore();
  const id = getId(item);
  return (
    <div className="p-3 bg-[#F5F8F6] rounded-xl border border-[#E2EAE4] flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img src={getProductImage(item)} alt={item.name} className="w-12 h-12 object-cover rounded-lg border border-[#E2EAE4]" />
        <div>
          <p className="font-semibold text-sm text-[#152A1B]">{item.name.split('/')[0]}</p>
          <p className="text-xs text-[#7A8C7E]">₹{item.price} each</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateQty(id, -1)}
          aria-label="Decrease quantity"
          className="w-6 h-6 rounded-full bg-white border border-[#DCE6DF] flex items-center justify-center"
        >
          <Minus size={12} />
        </button>
        <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
        <button
          onClick={() => updateQty(id, 1)}
          aria-label="Increase quantity"
          className="w-6 h-6 rounded-full bg-white border border-[#DCE6DF] flex items-center justify-center"
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
}

function DeliveryForm() {
  const { profile, updateProfile, setIsCartOpen, setActiveTab } = useStore();
  const inputCls = 'w-full px-2.5 py-1.5 border border-[#DCE6DF] rounded-lg focus:outline-none';
  return (
    <div className="pt-4 border-t border-[#E6ECE7] space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-xs font-bold uppercase tracking-wider text-[#2C6E49]">Delivery Details</p>
        <button
          onClick={() => {
            setIsCartOpen(false);
            setActiveTab('profile');
          }}
          className="text-[10px] text-[#2C6E49] underline font-bold"
        >
          Edit in Profile
        </button>
      </div>
      <div className="space-y-2 text-xs">
        <div>
          <label className="text-[11px] text-[#7A8C7E] block">Full Name</label>
          <input type="text" value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-[#7A8C7E] block">Phone</label>
            <input type="text" value={profile.phone} onChange={(e) => updateProfile({ phone: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className="text-[11px] text-[#7A8C7E] block">Pincode</label>
            <input type="text" value={profile.pincode} onChange={(e) => updateProfile({ pincode: e.target.value })} className={inputCls} />
          </div>
        </div>
        <div>
          <label className="text-[11px] text-[#7A8C7E] block">Street & Flat / House</label>
          <input type="text" value={profile.street} onChange={(e) => updateProfile({ street: e.target.value })} className={inputCls} />
        </div>
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
    <div className="border-t border-[#E6ECE7] pt-4 space-y-3">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Coupon (HYD15 or MORNING20)"
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
          className="flex-1 px-3 py-1.5 border border-[#DCE6DF] rounded-lg text-xs focus:outline-none"
        />
        <button onClick={() => applyCoupon()} className="px-3 py-1.5 bg-[#153B2B] text-white rounded-lg text-xs font-bold">
          Apply
        </button>
      </div>

      {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}

      {belowMin && (
        <p className="text-[11px] text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
          Add ₹{coupon.minSubtotal - totals.subtotal} more to unlock {coupon.label} with <strong>{appliedCoupon}</strong>.
        </p>
      )}

      <div className="space-y-1 text-xs">
        <div className="flex justify-between text-[#7A8C7E]">
          <span>Subtotal</span>
          <span>₹{totals.subtotal}</span>
        </div>
        {totals.discount > 0 && (
          <div className="flex justify-between text-[#2C6E49]">
            <span>
              Code: {appliedCoupon} ({coupon.label})
            </span>
            <span>-₹{totals.discount}</span>
          </div>
        )}
        <div className="flex justify-between text-[#7A8C7E]">
          <span>Morning Delivery ({profile.locality || selectedLocality})</span>
          <span>{totals.shipping === 0 ? 'FREE (Over ₹399)' : `₹${totals.shipping}`}</span>
        </div>
        <div className="flex justify-between text-base font-bold text-[#152A1B] pt-2 border-t border-[#E6ECE7]">
          <span>Total Amount</span>
          <span>₹{totals.total}</span>
        </div>
      </div>

      <button
        onClick={checkout}
        disabled={isSubmitting}
        className={`w-full py-3 text-white rounded-xl font-bold text-sm transition shadow flex items-center justify-center space-x-1 ${
          isSubmitting ? 'bg-[#7A8C7E] cursor-not-allowed' : 'bg-[#153B2B] hover:bg-[#234F3C]'
        }`}
      >
        <span>{isSubmitting ? 'Scheduling with Harvest API...' : `Confirm Order via UPI / COD (₹${totals.total})`}</span>
      </button>
    </div>
  );
}

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart } = useStore();
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6">
        <div className="flex justify-between items-center pb-4 border-b border-[#E6ECE7]">
          <div className="flex items-center space-x-2">
            <ShoppingBag size={20} className="text-[#153B2B]" />
            <h3 className="font-serif text-xl font-bold text-[#152A1B]">Your Harvest Basket</h3>
          </div>
          <button onClick={() => setIsCartOpen(false)} aria-label="Close cart" className="p-1 rounded-full hover:bg-gray-100 text-[#5C6E5F]">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-[#7A8C7E] space-y-2">
              <Leaf size={32} className="mx-auto text-[#C2D1C6]" />
              <p>Your basket is currently empty.</p>
            </div>
          ) : (
            <>
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
    </div>
  );
}
