import React from 'react';
import { Leaf } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import logo from "../../../public/logo.svg";

function LinkList({ title, links }) {
  return (
    <div className="md:col-span-2 space-y-2">
      <p className="font-bold text-[#152A1B]">{title}</p>
      <ul className="space-y-1.5">
        {links.map(([label, onClick]) => (
          <li key={label}>
            <button onClick={onClick} className="hover:text-[#153B2B]">
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { setActiveTab, setIsLoginOpen } = useStore();

  return (
    <footer className="bg-white border-t border-[#E6ECE7] text-xs text-[#5C6E5F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-lg bg-[#153B2B] text-[#98E59E] flex items-center justify-center">
      <img src={logo} alt="Sideshwara Greens Logo" className="w-full h-full object-contain" />
            </span>
            <span className="font-serif text-xl font-bold text-[#153B2B]">VerdantGreens</span>
          </div>
          <p className="text-xs text-[#687A6D] max-w-sm leading-relaxed">
            Fresh, 5:00 AM morning-harvested microgreens, germinated sprout bowls, and living wheatgrass trays
            delivered across Hyderabad before 9:00 AM.
          </p>
        </div>

        <LinkList
          title="Main Pages"
          links={[
            ['Shop Harvest', () => setActiveTab('shop')],
            ['Weekly Boxes', () => setActiveTab('box-builder')],
            ['Health Match', () => setActiveTab('health')],
            ['Growing Biology', () => setActiveTab('farm')]
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

        <div className="md:col-span-3 space-y-2">
          <p className="font-bold text-[#152A1B]">Hyderabad Delivery Hubs</p>
          <p className="leading-relaxed">Gachibowli • Hitec City • Jubilee Hills • Banjara Hills • Madhapur • Kondapur</p>
          <p className="font-semibold text-[#2C6E49] pt-1">care@verdantmart.in</p>
        </div>
      </div>
      <div className="border-t border-[#F0F4F1] py-4 text-center text-[11px] text-[#8A9B8E]">
        © {new Date().getFullYear()} VerdantGreens. 100% Clean Hydro-Organic Harvest.
      </div>
    </footer>
  );
}
