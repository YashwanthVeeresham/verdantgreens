import React, { useEffect, useState } from 'react';
import { X, User, Mail, Lock, Eye, EyeOff, Check, ArrowRight, Sprout } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { DEMO_PROFILE } from '../../constants/config';
import logo from '../../../public/logo.svg';

const EMPTY_FORM = { name: '', email: '', phone: '', password: '', remember: true };

const inputCls =
  'w-full h-11 rounded-xl border border-[#DCE6DF] bg-[#F8FBF9] pl-10 pr-3 text-sm text-[#152A1B] placeholder-[#9AAA9E] transition hover:border-[#B9D0BF] focus:border-[#2C6E49] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2C6E49]/10';

export default function LoginModal() {
  const { isLoginOpen, setIsLoginOpen, signIn } = useStore();
  const [mode, setMode] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [successMsg, setSuccessMsg] = useState(null);

  // Clear the form whenever the modal closes.
  useEffect(() => {
    if (!isLoginOpen) {
      setForm(EMPTY_FORM);
      setSuccessMsg(null);
    }
  }, [isLoginOpen]);

  // Close on Escape and lock page scroll while open
  useEffect(() => {
    if (!isLoginOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setIsLoginOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isLoginOpen, setIsLoginOpen]);

  if (!isLoginOpen) return null;

  const isSignup = mode === 'signup';
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = signIn({ ...form, isNew: isSignup });
    setSuccessMsg(isSignup ? 'Account created successfully!' : `Welcome back, ${next.name}!`);
    setTimeout(() => setIsLoginOpen(false), 1200);
  };

  const handleIdentifier = (val) => {
    if (/^\d+$/.test(val)) set({ phone: val, email: `${val}@verdant.local` });
    else set({ email: val });
  };

  return (
    <div
      className="vg-login-fade fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setIsLoginOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isSignup ? 'Create an Account' : 'Welcome Back'}
        onClick={(e) => e.stopPropagation()}
        className="vg-login-pop relative my-auto w-full max-w-md overflow-hidden rounded-3xl border border-[#E2EAE4] bg-white shadow-2xl"
      >
        {/* Brand banner: same logo and wordmark as the header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0F2D20] via-[#153B2B] to-[#2C6E49] px-8 pb-7 pt-8 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#98E59E]/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-[#98E59E]/10 blur-3xl"
          />
          <button
            type="button"
            onClick={() => setIsLoginOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={18} aria-hidden="true" />
          </button>

          <div className="relative flex flex-col items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white/10 p-2.5 text-[#98E59E] ring-1 ring-white/20">
              <img src={logo} alt="" className="h-full w-full object-contain" />
            </span>
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              Verdant<span className="text-[#98E59E]">Greens</span>
            </span>
          </div>
        </div>

        <div className="p-8 pt-6">
          <div className="mb-5 space-y-1.5 text-center">
            <h3 className="font-serif text-2xl font-bold text-[#152A1B]">
              {isSignup ? 'Create an Account' : 'Welcome Back'}
            </h3>
            <p className="text-xs leading-relaxed text-[#6C7D6E]">
              {isSignup
                ? 'Join VerdantGreens for farm-to-table microgreens and living bowls.'
                : 'Access your Hyderabad morning harvest subscriptions & orders.'}
            </p>
          </div>

          <div className="mb-6 flex rounded-full border border-[#E2EAE4] bg-[#F1F6F2] p-1" role="tablist">
            {[
              ['signin', 'Sign In'],
              ['signup', 'New Account']
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={mode === id}
                onClick={() => setMode(id)}
                className={`flex-1 rounded-full py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49] ${
                  mode === id ? 'bg-[#153B2B] text-white shadow' : 'text-[#6C7D6E] hover:text-[#152A1B]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {successMsg && (
            <div
              role="status"
              className="mb-4 flex items-center gap-2.5 rounded-xl border border-[#A2E3C4] bg-[#EAF5EC] p-3 text-xs font-bold text-[#1E3A25]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2C6E49] text-white">
                <Check size={14} aria-hidden="true" />
              </span>
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {isSignup && (
              <Field icon={User} label="Full Name">
                <input
                  type="text"
                  required
                  placeholder="e.g. Sravan Kumar"
                  value={form.name}
                  onChange={(e) => set({ name: e.target.value })}
                  className={inputCls}
                />
              </Field>
            )}

            <Field icon={Mail} label="Email or Phone Number">
              <input
                type="text"
                required
                placeholder="name@example.com or 9876543210"
                value={form.email}
                onChange={(e) => handleIdentifier(e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field
              icon={Lock}
              label="Password"
              aside={
                !isSignup && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to your registered WhatsApp/Email!')}
                    className="text-[10px] font-bold text-[#2C6E49] hover:underline"
                  >
                    Forgot?
                  </button>
                )
              }
            >
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => set({ password: e.target.value })}
                className={`${inputCls} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full text-[#7A8C7E] transition hover:bg-[#F1F6F2] hover:text-[#152A1B]"
              >
                {showPassword ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
              </button>
            </Field>

            <label className="flex cursor-pointer items-center gap-2 pt-1 text-[11px] text-[#5C6E5F]">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => set({ remember: e.target.checked })}
                className="h-3.5 w-3.5 rounded accent-[#2C6E49]"
              />
              <span>Remember me for 30 days</span>
            </label>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-[#153B2B] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_12px_28px_-12px_rgba(21,59,43,0.7)] transition hover:bg-[#234F3C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49] focus-visible:ring-offset-2 active:scale-[0.99]"
            >
              <span>{isSignup ? 'Complete Registration' : 'Sign In to Account'}</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </form>

          <div className="mt-6 border-t border-[#F0F4F1] pt-4 text-center">
            <button
              type="button"
              onClick={() => setForm({ ...DEMO_PROFILE, password: 'password123', remember: true })}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F6F2] px-3.5 py-1.5 text-[11px] font-semibold text-[#4B5F50] transition hover:bg-[#EAF5EC] hover:text-[#2C6E49]"
            >
              <Sprout size={13} aria-hidden="true" />
              Auto-fill demo customer details
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes vg-login-pop-in { from { opacity: 0; transform: translateY(12px) scale(0.97); } to { opacity: 1; transform: none; } }
        @keyframes vg-login-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .vg-login-pop { animation: vg-login-pop-in 0.25s cubic-bezier(0.22, 1, 0.36, 1); }
        .vg-login-fade { animation: vg-login-fade-in 0.2s ease-out; }
        @media (prefers-reduced-motion: reduce) { .vg-login-pop, .vg-login-fade { animation: none; } }
      `}</style>
    </div>
  );
}

function Field({ icon: Icon, label, aside, children }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-[11px] font-bold uppercase tracking-wide text-[#4B5F50]">{label}</label>
        {aside}
      </div>
      <div className="relative flex items-center">
        <Icon size={15} aria-hidden="true" className="pointer-events-none absolute left-3.5 text-[#2C6E49]" />
        {children}
      </div>
    </div>
  );
}