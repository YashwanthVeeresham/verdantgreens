import React, { useCallback, useRef, useState } from 'react';
import { Leaf, ShoppingBag, MapPin, Package, Search, X, User, Shield, LogIn, LogOut } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { LOCALITIES, TABS } from '../../constants/config';

function ProfileMenu() {
  const { profile, orders, setActiveTab, setIsLoginOpen, signOut } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close);

  const go = (tab) => {
    setActiveTab(tab);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center space-x-1.5 pl-2 pr-3 py-1 rounded-full bg-[#F4F7F5] hover:bg-[#E6EFE8] border border-[#DCE6DF] text-[#152A1B] transition"
      >
        <span className="w-6 h-6 rounded-full bg-[#153B2B] text-[#98E59E] flex items-center justify-center text-[11px] font-bold">
          {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
        </span>
        <span className="hidden md:inline max-w-[90px] truncate">{profile.name.split(' ')[0]}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-[#E2EAE4] py-2 z-50">
          <div className="px-4 py-2.5 border-b border-[#F0F4F1] mb-1">
            <p className="font-bold text-sm text-[#152A1B] truncate">{profile.name}</p>
            <p className="text-[11px] text-[#7A8C7E] truncate">{profile.email}</p>
            <div className="mt-1 flex items-center space-x-1 text-[10px] text-[#2C6E49] font-semibold">
              <Shield size={11} />
              <span>{profile.memberTier}</span>
            </div>
          </div>

          <div className="space-y-0.5 px-1.5 text-xs">
            <button
              onClick={() => go('profile')}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-[#152A1B] hover:bg-[#F4F7F5] transition text-left"
            >
              <User size={14} className="text-[#2C6E49]" />
              <span>Profile & Address</span>
            </button>

            <button
              onClick={() => go('orders')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#152A1B] hover:bg-[#F4F7F5] transition text-left"
            >
              <div className="flex items-center space-x-2">
                <Package size={14} className="text-[#2C6E49]" />
                <span>Orders Dashboard</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF5EC] text-[#2C6E49]">
                {orders.orders.length}
              </span>
            </button>

            <div className="border-t border-[#F0F4F1] my-1" />

            <button
              onClick={() => {
                setIsLoginOpen(true);
                setOpen(false);
              }}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-[#2C6E49] hover:bg-[#F4F7F5] transition text-left font-bold"
            >
              <LogIn size={14} />
              <span>Login / Signup</span>
            </button>

            <button
              onClick={() => {
                signOut();
                go('shop');
              }}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 transition text-left font-semibold"
            >
              <LogOut size={14} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6ECE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 border-b border-[#F0F4F1]">
        <div className="relative w-44 sm:w-64 lg:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A8C7E]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== 'shop') setActiveTab('shop');
            }}
            placeholder="Search Sprouts, Bowls..."
            className="w-full pl-9 pr-7 py-1.5 bg-[#F5F8F6] border border-[#E2EAE4] rounded-full text-xs text-[#152A1B] placeholder-[#8A9B8E] focus:outline-none focus:border-[#2C6E49] focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7A8C7E] hover:text-[#152A1B]"
            >
              <X size={13} />
            </button>
          )}
        </div>

        <div onClick={() => setActiveTab('shop')} className="flex items-center space-x-2 cursor-pointer select-none">
          <span className="w-7 h-7 rounded-lg bg-[#153B2B] text-[#98E59E] flex items-center justify-center">
            <Leaf size={15} />
          </span>
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#153B2B]">
            Verdant<span className="text-[#2C6E49]">Mart</span>
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full transition ${
              activeTab === 'orders' ? 'bg-[#EAF5EC] text-[#153B2B] font-bold' : 'text-[#3F5445] hover:text-[#153B2B]'
            }`}
          >
            <Package size={15} className="text-[#2C6E49]" />
            <span>Orders ({orders.orders.length})</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full text-[#3F5445] hover:text-[#153B2B] transition"
          >
            <ShoppingBag size={15} className="text-[#2C6E49]" />
            <span className="hidden sm:inline">Cart</span>
            {totals.count > 0 && (
              <span className="bg-[#153B2B] text-[#98E59E] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {totals.count}
              </span>
            )}
          </button>

          <ProfileMenu />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-between text-xs overflow-x-auto gap-6">
        <nav className="flex items-center space-x-6 font-semibold shrink-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`transition py-1 ${
                activeTab === tab.id
                  ? 'text-[#153B2B] font-bold border-b-2 border-[#153B2B]'
                  : 'text-[#5C6E5F] hover:text-[#153B2B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-4 text-[11px] text-[#5C6E5F] shrink-0">
          <div className="flex items-center space-x-1 font-semibold text-[#153B2B]">
            <MapPin size={13} className="text-[#2C6E49]" />
            <span>Hub:</span>
            <select
              value={selectedLocality}
              onChange={(e) => changeLocality(e.target.value)}
              className="bg-transparent font-bold text-[#153B2B] focus:outline-none cursor-pointer"
            >
              {LOCALITIES.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <span className="hidden md:inline text-[#D1DDD4]">|</span>
          <span className="hidden md:inline font-medium text-[#2C6E49]">5:00 AM Harvest • 6:30–9:00 AM Delivery</span>
        </div>
      </div>
    </header>
  );
}
