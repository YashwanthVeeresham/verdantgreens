import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
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
import { LOCALITIES, TABS } from '../../constants/config';
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
        className="flex h-10 items-center gap-1.5 rounded-full border border-[#DCE6DF] bg-white p-1 text-[#152A1B] transition hover:border-[#2C6E49]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49] xl:pr-3"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#153B2B] text-xs font-bold text-[#98E59E]">
          {initial}
        </span>
        <span className="hidden max-w-[80px] truncate text-xs font-semibold xl:inline">{name.split(' ')[0]}</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`hidden text-[#7A8C7E] transition xl:block ${open ? 'rotate-180' : ''}`}
        />
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

function HubSelect({ value, onChange, className = '' }) {
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
      <div className="bg-[#0F2D20] px-4 py-1.5 text-center text-[11px] font-medium text-white/85">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#98E59E] opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#98E59E]" />
          </span>
          5:00 AM Harvest <span className="text-white/30">•</span> 6:30–9:00 AM Delivery
        </span>
      </div>

      <header className="pointer-events-none sticky top-0 z-40 px-3 pt-3 sm:px-6">
        <div className="relative mx-auto max-w-7xl">
          <div
            className={`pointer-events-auto grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-full border border-[#E2EAE4] bg-white/85 px-2.5 backdrop-blur-xl transition-all duration-300 sm:px-3 xl:grid-cols-[1fr_auto_1fr] ${
              scrolled
                ? 'h-14 shadow-[0_12px_32px_-12px_rgba(21,59,43,0.35)]'
                : 'h-16 shadow-[0_4px_16px_-8px_rgba(21,59,43,0.2)]'
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
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#153B2B] transition hover:bg-[#F1F6F2] xl:hidden"
              >
                {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              </button>

              <nav
                aria-label="Main"
                className="hidden items-center gap-1 rounded-full bg-[#F1F6F2] p-1 xl:flex"
              >
                {TABS.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      aria-current={active ? 'page' : undefined}
                      className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49] ${
                        active
                          ? 'bg-[#153B2B] text-white shadow-sm'
                          : 'text-[#4B5F50] hover:bg-white hover:text-[#153B2B]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Center: logo + name */}
            <button
              type="button"
              onClick={() => goTab('shop')}
              aria-label="Sideshwara Greens home"
              className="flex select-none items-center justify-center gap-2 justify-self-center rounded-full py-1 pl-1 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#153B2B] p-1.5 text-[#98E59E]">
                <img src={logo} alt="" className="h-full w-full object-contain" />
              </span>
              <span className="whitespace-nowrap font-serif text-base font-bold tracking-tight text-[#152A1B] sm:text-xl">
                Sideshwara<span className="text-[#2C6E49]">Greens</span>
              </span>
            </button>

            {/* Right: search, hub, orders, cart, profile (Reduced gap to gap-1) */}
            <div className="flex items-center justify-end gap-1">
              <button
                type="button"
                onClick={() => {
                  setSearchOpen((o) => !o);
                  setMenuOpen(false);
                }}
                aria-label="Toggle search"
                aria-expanded={searchOpen}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#153B2B] transition hover:bg-[#F1F6F2]"
              >
                {searchOpen ? <X size={19} aria-hidden="true" /> : <Search size={19} aria-hidden="true" />}
              </button>

              <HubSelect
                value={selectedLocality}
                onChange={(e) => changeLocality(e.target.value)}
                className="hidden xl:flex"
              />

              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                aria-label={`Orders (${orders.orders.length})`}
                className={`hidden h-10 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition xl:flex ${
                  activeTab === 'orders'
                    ? 'bg-[#EAF5EC] text-[#153B2B]'
                    : 'text-[#3F5445] hover:bg-[#F1F6F2] hover:text-[#153B2B]'
                }`}
              >
                <Package size={17} className="text-[#2C6E49]" aria-hidden="true" />
                <span className="rounded-full bg-[#EAF5EC] px-1.5 py-0.5 text-[10px] font-bold text-[#2C6E49]">
                  {orders.orders.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Open cart${totals.count > 0 ? `, ${totals.count} items` : ''}`}
                className="relative flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#153B2B] px-3 text-xs font-bold text-white transition hover:bg-[#0E291D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49] focus-visible:ring-offset-2 sm:px-4"
              >
                <ShoppingBag size={17} className="text-[#98E59E]" aria-hidden="true" />
                <span className="hidden sm:inline">Cart</span>
                {totals.count > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#98E59E] px-1 text-[10px] font-bold text-[#0F2D20] ring-2 ring-white sm:static sm:ring-0">
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
              className="pointer-events-auto absolute inset-x-0 top-full mt-2 rounded-3xl border border-[#E2EAE4] bg-white p-3 shadow-[0_24px_60px_-16px_rgba(21,59,43,0.35)] xl:hidden"
            >
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