import React from 'react';
import {
  Check,
  ChevronDown,
  Clock,
  Home,
  LogIn,
  Mail,
  MapPin,
  Package,
  Phone,
  Save,
  Shield,
  Target,
  User
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { LOCALITIES } from '../constants/config';

const inputCls =
  'w-full h-11 pl-10 pr-3 rounded-xl border border-[#DCE6DF] bg-[#F8FBF9] text-sm text-[#152A1B] placeholder-[#9AAA9E] transition hover:border-[#B9D0BF] focus:outline-none focus:border-[#2C6E49] focus:bg-white focus:ring-4 focus:ring-[#2C6E49]/10';
const labelCls = 'mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-[#4B5F50]';

function Field({ label, icon: Icon, select = false, children }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="relative">
        <Icon
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2C6E49]"
        />
        {children}
        {select && (
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A8C7E]"
          />
        )}
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, title, hint }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF5EC] text-[#2C6E49]">
        <Icon size={17} aria-hidden="true" />
      </span>
      <div>
        <h4 className="font-serif text-base font-bold text-[#152A1B]">{title}</h4>
        <p className="text-[11px] text-[#7A8C7E]">{hint}</p>
      </div>
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
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Page header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2D20] via-[#153B2B] to-[#2C6E49] p-6 text-white shadow-[0_20px_50px_-24px_rgba(21,59,43,0.7)] sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#98E59E]/20 blur-3xl"
        />
        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#98E59E] ring-1 ring-white/15">
              <Home size={12} aria-hidden="true" />
              Hyderabad Resident Account
            </span>
            <h2 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">Customer Profile &amp; Delivery Settings</h2>
            <p className="mt-1.5 max-w-xl text-sm text-white/70">
              Your default harvest morning address, dietary preferences, and account records.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsLoginOpen(true)}
            className="flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-[#153B2B] shadow-sm transition hover:bg-[#98E59E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <LogIn size={14} className="text-[#2C6E49]" aria-hidden="true" />
            <span>Switch Account</span>
          </button>
        </div>
      </div>

      {savedFeedback && (
        <div
          role="status"
          className="flex items-center gap-2.5 rounded-2xl border border-[#A2E3C4] bg-[#EAF5EC] p-3.5 text-xs font-bold text-[#1E3A25]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2C6E49] text-white">
            <Check size={14} aria-hidden="true" />
          </span>
          <span>Profile details saved! Your checkout form will now automatically use this delivery address.</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Profile card */}
        <aside className="h-fit overflow-hidden rounded-3xl border border-[#E2EAE4] bg-white/90 shadow-[0_8px_30px_-16px_rgba(21,59,43,0.25)] backdrop-blur md:sticky md:top-28">
          <div className="h-20 bg-gradient-to-r from-[#2C6E49] to-[#98E59E]" />
          <div className="-mt-10 space-y-4 px-6 pb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#153B2B] font-serif text-3xl font-bold text-[#98E59E] ring-4 ring-white">
              {profile.name ? profile.name[0] : 'U'}
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#152A1B]">{profile.name}</h3>
              <p className="break-all text-xs text-[#5C6E5F]">{profile.email}</p>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#CDE5D4] bg-[#EAF5EC] px-3 py-1.5 text-[11px] font-bold text-[#2C6E49]">
              <Shield size={13} aria-hidden="true" />
              <span>Verified Hydro-Club Member</span>
            </div>

            <dl className="space-y-3 border-t border-[#F0F4F1] pt-4 text-xs">
              {[
                [Shield, 'Tier', profile.memberTier],
                [MapPin, 'Active Hub', profile.locality],
                [Package, 'Orders Placed', orders.userOrders.length]
              ].map(([Icon, k, v]) => (
                <div key={k} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F6F2] text-[#2C6E49]">
                    <Icon size={15} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[10px] font-semibold uppercase tracking-wide text-[#7A8C7E]">{k}</dt>
                    <dd className="font-semibold text-[#152A1B]">{v}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        {/* Form */}
        <div className="rounded-3xl border border-[#E2EAE4] bg-white/90 p-6 shadow-[0_8px_30px_-16px_rgba(21,59,43,0.25)] backdrop-blur sm:p-8 md:col-span-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveProfile();
            }}
            className="space-y-8 text-xs"
          >
            <section className="space-y-4">
              <SectionTitle icon={User} title="Personal details" hint="How we reach you about your harvest" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name" icon={User}>
                  <input type="text" required {...text('name')} />
                </Field>
                <Field label="Phone (WhatsApp Order Tracking)" icon={Phone}>
                  <input type="tel" required {...text('phone')} />
                </Field>
              </div>
              <Field label="Email Address" icon={Mail}>
                <input type="email" required {...text('email')} />
              </Field>
            </section>

            <section className="space-y-4 border-t border-[#F0F4F1] pt-8">
              <SectionTitle icon={MapPin} title="Delivery address" hint="Used automatically at checkout" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Hyderabad Delivery Locality" icon={MapPin} select>
                  <select {...text('locality', { className: `${inputCls} appearance-none font-medium` })}>
                    {LOCALITIES.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Pincode" icon={MapPin}>
                  <input type="text" required {...text('pincode')} />
                </Field>
              </div>
              <Field label="Street Address / Society & Flat No." icon={Home}>
                <input type="text" required {...text('street')} />
              </Field>
            </section>

            <section className="space-y-4 border-t border-[#F0F4F1] pt-8">
              <SectionTitle icon={Target} title="Preferences" hint="Tune your deliveries to your routine" />
              <Field label="Preferred Morning Delivery Slot" icon={Clock} select>
                <select {...text('deliverySlot', { className: `${inputCls} appearance-none font-medium` })}>
                  <option value="morning_6_30_to_9_00">6:30 AM – 9:00 AM (Fresh Morning Harvest)</option>
                  <option value="afternoon_12_00_to_2_00">12:00 PM – 2:00 PM (Office Lunch Delivery)</option>
                </select>
              </Field>
              <Field label="Primary Dietary Goal" icon={Target}>
                <input type="text" {...text('dietaryFocus')} />
              </Field>
            </section>

            <div className="flex justify-end border-t border-[#F0F4F1] pt-6">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#153B2B] px-7 py-3 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgba(21,59,43,0.6)] transition hover:bg-[#234F3C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49] focus-visible:ring-offset-2 active:scale-[0.98] sm:w-auto"
              >
                <Save size={16} aria-hidden="true" />
                <span>Save Profile Settings</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}