import React from 'react';
import { ArrowUpRight, Clock, Leaf, Mail, MapPin, Sprout, Truck, Droplets } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import logo from '../../../public/logo.svg';

const TRUST_POINTS = [
  { icon: Sprout, title: 'Harvested at 5:00 AM', text: 'Cut fresh, never stored' },
  { icon: Truck, title: 'Delivered by 9:00 AM', text: 'Across Hyderabad' },
  { icon: Droplets, title: 'Hydro-organic', text: 'Clean, pesticide-free growing' },
  { icon: Leaf, title: 'Living & root-intact', text: 'Stays fresh for a week' }
];

const DELIVERY_AREAS = ['Gachibowli', 'Hitec City', 'Jubilee Hills', 'Banjara Hills', 'Madhapur', 'Kondapur'];

function LinkList({ title, links }) {
  return (
    <nav aria-label={title} className="md:col-span-2">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#98E59E]">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map(([label, onClick]) => (
          <li key={label}>
            <button
              type="button"
              onClick={onClick}
              className="group inline-flex items-center gap-1 text-sm text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:text-white focus-visible:underline"
            >
              {label}
              <ArrowUpRight
                size={13}
                className="-translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden="true"
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const { setActiveTab, setIsLoginOpen } = useStore();

  return (
    <footer className="bg-[#0F2D20] text-white">
      {/* Trust strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {TRUST_POINTS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#98E59E] ring-1 ring-white/10">
                <Icon size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">{title}</p>
                <p className="mt-1 text-xs text-white/60">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#153B2B] p-1.5 text-[#98E59E] ring-1 ring-white/10">
              <img src={logo} alt="Verdant Greens logo" className="h-full w-full object-contain" />
            </span>
            <span className="font-serif text-2xl font-bold tracking-tight">
              Verdant<span className="text-[#98E59E]">Greens</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            Morning-harvested microgreens, germinated sprout bowls and living wheatgrass trays, grown
            locally and delivered to your door across Hyderabad.
          </p>
          <a
            href="mailto:care@verdantgreens.in"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-[#98E59E] hover:text-[#98E59E] focus-visible:outline-none focus-visible:border-[#98E59E]"
          >
            <Mail size={15} aria-hidden="true" />
            care@verdantgreens.in
          </a>
        </div>

        <LinkList
          title="Explore"
          links={[
            ['Shop Harvest', () => setActiveTab('shop')],
            ['Weekly Boxes', () => setActiveTab('box-builder')],
            ['Health Match', () => setActiveTab('health')],
            ['Growing Biology', () => setActiveTab('farm')],
            ['About Us', () => setActiveTab('about')]
          ]}
        />

        <LinkList
          title="Account"
          links={[
            ['Track Orders', () => setActiveTab('orders')],
            ['Profile Settings', () => setActiveTab('profile')],
            ['Sign In / Register', () => setIsLoginOpen(true)]
          ]}
        />

        <div className="md:col-span-4">
          <h3 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#98E59E]">
            <MapPin size={13} aria-hidden="true" />
            Hyderabad delivery hubs
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {DELIVERY_AREAS.map((area) => (
              <li
                key={area}
                className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/80 ring-1 ring-white/10"
              >
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-2 text-xs text-white/60">
            <Clock size={13} className="text-[#98E59E]" aria-hidden="true" />
            Morning delivery slots: 6:00 AM – 9:00 AM
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Verdant Greens. All rights reserved.</p>
          <p>100% clean hydro-organic harvest · Grown in Hyderabad</p>
        </div>
      </div>
    </footer>
  );
}