import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Home,
  LogIn,
  LogOut,
  MapPin,
  Menu,
  Package,
  Search,
  Shield,
  ShoppingBag,
  User,
  X
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { FREE_SHIPPING_THRESHOLD, LOCALITIES, TABS } from '../../constants/config';
import logo from '../../../public/logo.svg';

function ProfileMenu() {
  const { profile, orders, setActiveTab, setIsLoginOpen, signOut } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close);

  const name = profile.name || '';
  const initial = name ? name.charAt(0).toUpperCase() : 'U';

  const go = (tab) => {
    setActiveTab(tab);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        title={name}
        className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF5EC] sm:h-9 sm:w-9 text-xs font-bold text-[#153B2B] ring-1 ring-[#CFE6D4] transition hover:ring-2 hover:ring-[#2C6E49]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49]"
      >
        {initial}
        <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white ring-1 ring-[#CFE6D4]">
          <ChevronDown
            size={9}
            aria-hidden="true"
            className={`text-[#2C6E49] transition ${open ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-3xl border border-[#E2EAE4] bg-white py-2 shadow-[0_24px_60px_-16px_rgba(21,59,43,0.35)]"
        >
          <div className="mb-1 flex items-center gap-3 border-b border-[#F0F4F1] px-4 pb-3 pt-2">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#153B2B] text-sm font-bold text-[#98E59E]">
              {initial}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#152A1B]">{profile.name}</p>
              <p className="truncate text-[11px] text-[#7A8C7E]">{profile.email}</p>
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#EAF5EC] px-2 py-0.5 text-[10px] font-semibold text-[#2C6E49]">
                <Shield size={10} aria-hidden="true" />
                <span>{profile.memberTier}</span>
              </div>
            </div>
          </div>

          <div className="space-y-0.5 px-1.5 text-xs">
            <button
              type="button"
              role="menuitem"
              onClick={() => go('profile')}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[#152A1B] transition hover:bg-[#F4F7F5]"
            >
              <User size={15} className="text-[#2C6E49]" aria-hidden="true" />
              <span>Profile &amp; Address</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => go('orders')}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[#152A1B] transition hover:bg-[#F4F7F5]"
            >
              <span className="flex items-center gap-2.5">
                <Package size={15} className="text-[#2C6E49]" aria-hidden="true" />
                <span>Orders Dashboard</span>
              </span>
              <span className="rounded-full bg-[#EAF5EC] px-1.5 py-0.5 text-[10px] font-bold text-[#2C6E49]">
                {orders.orders.length}
              </span>
            </button>

            <div className="my-1 border-t border-[#F0F4F1]" />

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsLoginOpen(true);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left font-bold text-[#2C6E49] transition hover:bg-[#F4F7F5]"
            >
              <LogIn size={15} aria-hidden="true" />
              <span>Login / Signup</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                signOut();
                go('shop');
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left font-semibold text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={15} aria-hidden="true" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function HubSelect({ value, onChange, className = '', variant = 'pill' }) {
  if (variant === 'strip') {
    return (
      <label className={`inline-flex items-center gap-1.5 text-[11px] font-medium text-white/80 ${className}`}>
        <MapPin size={12} className="shrink-0 text-[#98E59E]" aria-hidden="true" />
        <span>Delivering to</span>
        <select
          value={value}
          onChange={onChange}
          aria-label="Delivery hub"
          className="cursor-pointer rounded bg-transparent font-bold text-[#98E59E] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#98E59E]"
        >
          {LOCALITIES.map((loc) => (
            <option key={loc} value={loc} className="text-[#152A1B]">
              {loc}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label
      className={`flex h-10 items-center gap-1.5 rounded-full bg-[#EAF5EC] px-3 text-xs font-semibold text-[#153B2B] transition focus-within:ring-2 focus-within:ring-[#2C6E49] ${className}`}
    >
      <MapPin size={14} className="shrink-0 text-[#2C6E49]" aria-hidden="true" />
      <span className="sr-only">Delivery hub</span>
      <select
        value={value}
        onChange={onChange}
        aria-label="Delivery hub"
        className="max-w-[110px] cursor-pointer truncate bg-transparent font-bold focus:outline-none"
      >
        {LOCALITIES.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </label>
  );
}

function SearchField({ value, onChange, onClear, autoFocus = false, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search
        size={15}
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A8C7E]"
      />
      <input
        type="text"
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        placeholder="Search Sprouts, Bowls..."
        aria-label="Search products"
        className="h-10 w-full rounded-full border border-transparent bg-[#F1F6F2] pl-10 pr-9 text-sm text-[#152A1B] placeholder-[#8A9B8E] transition focus:border-[#2C6E49] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2C6E49]/10"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-[#7A8C7E] hover:text-[#152A1B]"
        >
          <X size={15} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default function Header() {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedLocality,
    changeLocality,
    setIsCartOpen,
    totals,
    orders
  } = useStore();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Cart total (uses whichever total field your store exposes)
  const amount = [totals.total, totals.grandTotal, totals.subtotal].find((n) => typeof n === 'number');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, searchOpen]);

  const goTab = (id) => {
    setActiveTab(id);
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (activeTab !== 'shop') setActiveTab('shop');
  };

  const clearSearch = () => setSearchQuery('');

  return (
    <>
      <div className="bg-[#0F2D20] px-4 py-1.5 text-[11px] font-medium text-white/85">
        <div className="mx-auto flex max-w-[100rem] items-center justify-center md:grid md:grid-cols-3">
          <p className="hidden text-left text-white/70 md:block">
            Free delivery above <span className="font-bold text-[#98E59E]">₹{FREE_SHIPPING_THRESHOLD}</span>
          </p>
          <span className="inline-flex items-center justify-center gap-2 text-center">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#98E59E] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#98E59E]" />
            </span>
            5:00 AM Harvest <span className="text-white/30">•</span> 6:30–9:00 AM Delivery
          </span>
          <div className="hidden justify-end md:flex">
            <HubSelect variant="strip" value={selectedLocality} onChange={(e) => changeLocality(e.target.value)} />
          </div>
        </div>
      </div>

      <header className="pointer-events-none sticky top-0 z-40 px-3 pt-3 sm:px-6">
        <div className="relative mx-auto max-w-[100rem]">
          <div
            className={`pointer-events-auto relative grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-full border border-[#E2EAE4] bg-white/90 px-2.5 backdrop-blur-2xl transition-all duration-300 sm:px-3 min-[1500px]:flex min-[1500px]:justify-between ${
              scrolled
                ? 'h-16 shadow-[0_12px_32px_-12px_rgba(21,59,43,0.35)]'
                : 'h-[72px] shadow-[0_4px_16px_-8px_rgba(21,59,43,0.2)]'
            }`}
          >
            {/* Left: menu button / tabs */}
            <div className="flex items-center justify-start">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen((o) => !o);
                  setSearchOpen(false);
                }}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#153B2B] transition hover:bg-[#F1F6F2] min-[1500px]:hidden"
              >
                {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              </button>

              <nav
                aria-label="Main"
                className="hidden items-center gap-1 rounded-full bg-[#F1F6F2] p-1 min-[1500px]:flex"
              >
                {TABS.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      aria-current={active ? 'page' : undefined}
                      className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49] ${
                        active
                          ? 'bg-[#153B2B] text-white shadow-sm'
                          : 'text-[#4B5F50] hover:bg-white hover:text-[#153B2B]'
                      }`}
                    >
                      {tab.id === 'home' ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Home size={14} aria-hidden="true" />
                          {tab.label}
                        </span>
                      ) : (
                        tab.label
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Center: logo + name */}
            <button
              type="button"
              onClick={() => goTab('home')}
              aria-label="Verdant Greens home"
              className="flex min-w-0 select-none items-center justify-center gap-1.5 justify-self-center sm:gap-2 rounded-full py-1 pl-1 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49] min-[1500px]:absolute min-[1500px]:left-1/2 min-[1500px]:-translate-x-1/2"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#153B2B] p-1.5 sm:h-12 sm:w-12 min-[1500px]:h-11 min-[1500px]:w-11 min-[1700px]:h-12 min-[1700px]:w-12 text-[#98E59E]">
                <img src={logo} alt="" className="h-full w-full object-contain" />
              </span>
              <span className="whitespace-nowrap font-serif text-base font-bold tracking-tight text-[#152A1B] sm:text-2xl min-[1500px]:text-xl min-[1700px]:text-2xl min-[1900px]:text-3xl">
                Verdant<span className="text-[#2C6E49]">Greens</span>
              </span>
            </button>

            {/* Right: search, cart, profile */}
            <div className="flex items-center justify-end gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => {
                  setSearchOpen((o) => !o);
                  setMenuOpen(false);
                }}
                aria-label="Toggle search"
                aria-expanded={searchOpen}
                className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#153B2B] transition hover:bg-[#F1F6F2] sm:flex"
              >
                {searchOpen ? <X size={18} aria-hidden="true" /> : <Search size={18} aria-hidden="true" />}
              </button>

              {/* Cart: same 36px circle as search and avatar; shows the total on desktop */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Open cart${totals.count > 0 ? `, ${totals.count} items` : ''}`}
                className={`relative flex h-8 shrink-0 items-center justify-center gap-2 rounded-full bg-[#153B2B] sm:h-9 text-white transition hover:bg-[#0E291D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49] ${
                  amount > 0 ? 'w-8 sm:w-9 min-[1500px]:w-auto min-[1500px]:px-3.5' : 'w-8 sm:w-9'
                }`}
              >
                <ShoppingBag size={16} className="text-[#98E59E]" aria-hidden="true" />
                {amount > 0 && (
                  <span className="hidden text-xs font-bold min-[1500px]:inline">₹{Math.round(amount)}</span>
                )}
                {totals.count > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#98E59E] px-1 text-[9px] font-bold text-[#0F2D20] ring-2 ring-white">
                    {totals.count}
                  </span>
                )}
              </button>

              <ProfileMenu />
            </div>
          </div>

          {/* Search panel */}
          {searchOpen && (
            <div className="pointer-events-auto absolute inset-x-0 top-full mt-2 rounded-3xl border border-[#E2EAE4] bg-white p-3 shadow-[0_24px_60px_-16px_rgba(21,59,43,0.35)]">
              <SearchField autoFocus value={searchQuery} onChange={handleSearch} onClear={clearSearch} />
            </div>
          )}

          {/* Mobile / tablet menu panel */}
          {menuOpen && (
            <nav
              aria-label="Mobile"
              className="pointer-events-auto absolute inset-x-0 top-full mt-2 rounded-3xl border border-[#E2EAE4] bg-white p-3 shadow-[0_24px_60px_-16px_rgba(21,59,43,0.35)] min-[1500px]:hidden"
            >
              <SearchField
                className="mb-3 sm:hidden"
                value={searchQuery}
                onChange={handleSearch}
                onClear={clearSearch}
              />
              <ul className="space-y-1">
                {TABS.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <li key={tab.id}>
                      <button
                        type="button"
                        onClick={() => goTab(tab.id)}
                        aria-current={active ? 'page' : undefined}
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                          active ? 'bg-[#153B2B] text-white' : 'text-[#3F5445] hover:bg-[#F1F6F2]'
                        }`}
                      >
                        {tab.label}
                        {active && <span className="h-2 w-2 rounded-full bg-[#98E59E]" />}
                      </button>
                    </li>
                  );
                })}
                <li>
                  <button
                    type="button"
                    onClick={() => goTab('orders')}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-[#3F5445] hover:bg-[#F1F6F2]"
                  >
                    <span className="flex items-center gap-2">
                      <Package size={16} className="text-[#2C6E49]" aria-hidden="true" />
                      Orders
                    </span>
                    <span className="rounded-full bg-[#EAF5EC] px-2 py-0.5 text-[11px] font-bold text-[#2C6E49]">
                      {orders.orders.length}
                    </span>
                  </button>
                </li>
              </ul>
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#F0F4F1] pt-3">
                <span className="text-xs font-semibold text-[#5C6E5F]">Delivering to</span>
                <HubSelect value={selectedLocality} onChange={(e) => changeLocality(e.target.value)} />
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}