import React, { useEffect, useState } from 'react';
import { X, Leaf, User, Mail, Lock, Eye, EyeOff, Check, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { DEMO_PROFILE } from '../../constants/config';

const EMPTY_FORM = { name: '', email: '', phone: '', password: '', remember: true };

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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-[#E2EAE4] relative">
        <button
          onClick={() => setIsLoginOpen(false)}
          aria-label="Close"
          className="absolute top-5 right-5 p-2 rounded-full text-[#7A8C7E] hover:bg-[#F5F8F6] hover:text-[#152A1B] transition"
        >
          <X size={20} />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#153B2B] text-[#98E59E] mx-auto flex items-center justify-center shadow-md">
            <Leaf size={22} />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#152A1B]">{isSignup ? 'Create an Account' : 'Welcome Back'}</h3>
          <p className="text-xs text-[#6C7D6E]">
            {isSignup
              ? 'Join VerdantMart for farm-to-table microgreens and living bowls.'
              : 'Access your Hyderabad morning harvest subscriptions & orders.'}
          </p>
        </div>

        <div className="flex bg-[#F5F8F6] p-1 rounded-xl mb-6 border border-[#E2EAE4]">
          {[
            ['signin', 'Sign In'],
            ['signup', 'New Account']
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                mode === id ? 'bg-[#153B2B] text-white shadow' : 'text-[#7A8C7E] hover:text-[#152A1B]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {successMsg && (
          <div className="mb-4 p-3 bg-[#EAF5EC] border border-[#A2E3C4] text-[#1E3A25] text-xs font-bold rounded-xl flex items-center space-x-2">
            <Check size={16} className="text-[#2C6E49]" />
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
                className="w-full pl-9 pr-3 py-2.5 border border-[#DCE6DF] rounded-xl focus:outline-none focus:border-[#2C6E49]"
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
              className="w-full pl-9 pr-3 py-2.5 border border-[#DCE6DF] rounded-xl focus:outline-none focus:border-[#2C6E49]"
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
                  className="text-[10px] text-[#2C6E49] hover:underline font-bold"
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
              className="w-full pl-9 pr-10 py-2.5 border border-[#DCE6DF] rounded-xl focus:outline-none focus:border-[#2C6E49]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 text-[#7A8C7E] hover:text-[#152A1B]"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </Field>

          <label className="flex items-center space-x-2 text-[11px] text-[#5C6E5F] cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => set({ remember: e.target.checked })}
              className="rounded accent-[#2C6E49] w-3.5 h-3.5"
            />
            <span>Remember me for 30 days</span>
          </label>

          <button
            type="submit"
            className="w-full py-3 bg-[#153B2B] hover:bg-[#234F3C] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition shadow flex items-center justify-center space-x-1.5"
          >
            <span>{isSignup ? 'Complete Registration' : 'Sign In to Account'}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#F0F4F1] text-center">
          <button
            type="button"
            onClick={() => setForm({ ...DEMO_PROFILE, password: 'password123', remember: true })}
            className="text-[11px] text-[#7A8C7E] hover:text-[#2C6E49] underline"
          >
            Auto-fill demo customer details
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, aside, children }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-[11px] font-bold text-[#152A1B]">{label}</label>
        {aside}
      </div>
      <div className="relative flex items-center">
        <Icon size={15} className="absolute left-3 text-[#7A8C7E]" />
        {children}
      </div>
    </div>
  );
}
