import React from 'react';
import { Check, LogIn, Save, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { LOCALITIES } from '../constants/config';

const inputCls = 'w-full px-3 py-2 border border-[#DCE6DF] rounded-xl focus:outline-none focus:border-[#2C6E49]';
const labelCls = 'text-[11px] font-bold text-[#152A1B] block mb-1';

function Field({ label, children }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

export default function ProfilePage() {
  const { profile, updateProfile, saveProfile, savedFeedback, setIsLoginOpen, orders } = useStore();
  const text = (key, extra = {}) => ({
    value: profile[key],
    onChange: (e) => updateProfile({ [key]: e.target.value }),
    className: inputCls,
    ...extra
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6ECE7] pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#2C6E49]">Hyderabad Resident Account</span>
          <h2 className="font-serif text-3xl font-bold text-[#152A1B]">Customer Profile & Delivery Settings</h2>
          <p className="text-sm text-[#6C7D6E]">Your default harvest morning address, dietary preferences, and account records.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="px-3.5 py-1.5 bg-white border border-[#DCE6DF] text-[#152A1B] rounded-xl text-xs font-bold hover:bg-[#F5F8F6] transition flex items-center space-x-1"
          >
            <LogIn size={13} className="text-[#2C6E49]" />
            <span>Switch Account</span>
          </button>
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#EAF5EC] text-[#2C6E49] rounded-xl text-xs font-bold border border-[#CDE5D4]">
            <Shield size={14} />
            <span>Verified Hydro-Club Member</span>
          </div>
        </div>
      </div>

      {savedFeedback && (
        <div className="p-3 bg-[#EAF5EC] border border-[#A2E3C4] text-[#1E3A25] rounded-xl text-xs font-bold flex items-center space-x-2">
          <Check size={16} className="text-[#2C6E49]" />
          <span>Profile details saved! Your checkout form will now automatically use this delivery address.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E2EAE4] shadow-2xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#153B2B] text-[#98E59E] flex items-center justify-center text-2xl font-serif font-bold">
            {profile.name ? profile.name[0] : 'U'}
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#152A1B]">{profile.name}</h3>
            <p className="text-xs text-[#5C6E5F]">{profile.email}</p>
          </div>
          <div className="pt-3 border-t border-[#F0F4F1] space-y-2 text-xs">
            {[
              ['Tier', profile.memberTier],
              ['Active Hub', profile.locality],
              ['Orders Placed', orders.userOrders.length]
            ].map(([k, v]) => (
              <p key={k} className="text-[#7A8C7E]">
                <span className="font-semibold text-[#152A1B]">{k}:</span> {v}
              </p>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-[#E2EAE4] shadow-2xs">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveProfile();
            }}
            className="space-y-4 text-xs"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name">
                <input type="text" required {...text('name')} />
              </Field>
              <Field label="Phone (WhatsApp Order Tracking)">
                <input type="tel" required {...text('phone')} />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Email Address">
                <input type="email" required {...text('email')} />
              </Field>
              <Field label="Hyderabad Delivery Locality">
                <select {...text('locality', { className: `${inputCls} bg-white font-medium` })}>
                  {LOCALITIES.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Street Address / Society & Flat No.">
              <input type="text" required {...text('street')} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Pincode">
                <input type="text" required {...text('pincode')} />
              </Field>
              <Field label="Preferred Morning Delivery Slot">
                <select {...text('deliverySlot', { className: `${inputCls} bg-white font-medium` })}>
                  <option value="morning_6_30_to_9_00">6:30 AM – 9:00 AM (Fresh Morning Harvest)</option>
                  <option value="afternoon_12_00_to_2_00">12:00 PM – 2:00 PM (Office Lunch Delivery)</option>
                </select>
              </Field>
            </div>

            <Field label="Primary Dietary Goal">
              <input type="text" {...text('dietaryFocus')} />
            </Field>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#153B2B] hover:bg-[#234F3C] text-white rounded-xl font-bold flex items-center space-x-2 transition shadow"
              >
                <Save size={15} />
                <span>Save Profile Settings</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
