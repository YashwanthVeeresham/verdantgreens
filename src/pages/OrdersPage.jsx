import React from 'react';
import {
  Package,
  RefreshCw,
  Calendar,
  Phone,
  MapPin,
  Clock,
  Truck,
  Tag,
  Receipt,
  IndianRupee,
  ArrowRight
} from 'lucide-react';
import Spinner from '../components/ui/Spinner';
import { useStore } from '../context/StoreContext';

const SLOT_LABELS = {
  morning_6_30_to_9_00: '6:30 AM – 9:00 AM Morning',
  afternoon_12_00_to_2_00: '12:00 PM – 2:00 PM Office Lunch'
};

function statusStyle(status = '') {
  if (/cancel|fail|reject/i.test(status)) return 'bg-red-50 text-red-700 border-red-200';
  if (/deliver|complete/i.test(status)) return 'bg-[#EAF5EC] text-[#2C6E49] border-[#CDE5D4]';
  return 'bg-amber-50 text-amber-700 border-amber-200';
}

function OrderCard({ order, idx }) {
  const date = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Just now';
  const status = order.orderStatus ? order.orderStatus.replace(/_/g, ' ').toUpperCase() : 'QUEUED';

  return (
    <article className="overflow-hidden rounded-3xl border border-[#E2EAE4] bg-white/90 shadow-[0_8px_30px_-18px_rgba(21,59,43,0.3)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-18px_rgba(21,59,43,0.35)]">
      <div className="flex flex-col justify-between gap-3 border-b border-[#F0F4F1] bg-gradient-to-r from-[#F5F8F6] to-white px-5 py-4 sm:px-6 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-lg border border-[#E2EAE4] bg-white px-2.5 py-1 font-mono text-xs font-bold text-[#152A1B]">
            <Receipt size={13} className="text-[#2C6E49]" aria-hidden="true" />#
            {order._id ? order._id.slice(-6).toUpperCase() : `ORD-${idx + 1}`}
          </span>
          <span className="flex items-center text-xs text-[#7A8C7E]">
            <Calendar size={13} className="mr-1" aria-hidden="true" />
            {date}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`rounded-full border px-3 py-1 text-[11px] font-bold ${statusStyle(order.orderStatus)}`}>
            {status}
          </span>
          <span className="font-serif text-2xl font-bold text-[#152A1B]">₹{order.finalAmount}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-5 text-xs sm:p-6 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#153B2B] font-serif text-sm font-bold text-[#98E59E]">
              {(order.customer?.name || 'W')[0].toUpperCase()}
            </span>
            <p className="text-sm font-bold text-[#152A1B]">{order.customer?.name || 'Walk-in Customer'}</p>
          </div>
          <p className="flex items-start text-[#5C6E5F]">
            <Phone size={14} className="mr-2 mt-0.5 shrink-0 text-[#2C6E49]" aria-hidden="true" />
            {order.customer?.phone || 'No phone'}
          </p>
          <p className="flex items-start text-[#5C6E5F]">
            <MapPin size={14} className="mr-2 mt-0.5 shrink-0 text-[#2C6E49]" aria-hidden="true" />
            <span>
              {order.customer?.address?.street}, {order.customer?.address?.locality || 'Hyderabad'} -{' '}
              {order.customer?.address?.pincode}
            </span>
          </p>
          <p className="flex items-start text-[#7A8C7E]">
            <Clock size={14} className="mr-2 mt-0.5 shrink-0 text-[#2C6E49]" aria-hidden="true" />
            <span>
              <span className="font-semibold text-[#152A1B]">Slot:</span>{' '}
              {SLOT_LABELS[order.deliverySlot] || order.deliverySlot}
            </span>
          </p>
        </div>

        <div className="space-y-2.5 rounded-2xl border border-[#E2EAE4] bg-[#F5F8F6] p-4">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#152A1B]">
            <Package size={13} className="text-[#2C6E49]" aria-hidden="true" />
            Items in Order
          </p>
          <div className="space-y-1.5">
            {order.items?.map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-3 text-[#2A432F]">
                <span className="min-w-0 truncate">
                  {item.name} × {item.qty}
                </span>
                <span className="shrink-0 font-mono font-semibold">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          {order.couponApplied && (
            <div className="flex items-center justify-between border-t border-dashed border-[#CFDCD2] pt-2.5 font-semibold text-[#2C6E49]">
              <span className="flex items-center gap-1.5">
                <Tag size={12} aria-hidden="true" />
                Coupon applied: {order.couponApplied}
              </span>
              <span>-₹{order.discount || 0}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function OrdersPage() {
  const { orders: ordersState, setActiveTab } = useStore();
  const { orders, totalRevenue, loading, error, refresh } = ordersState;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Page header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2D20] via-[#153B2B] to-[#2C6E49] p-6 text-white shadow-[0_20px_50px_-24px_rgba(21,59,43,0.7)] sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#98E59E]/20 blur-3xl"
        />
        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#98E59E] ring-1 ring-white/15">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#98E59E] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#98E59E]" />
              </span>
              Live Farm Dispatch Dashboard
            </span>
            <h2 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">Customer Orders ({orders.length})</h2>
            <p className="mt-1.5 max-w-xl text-sm text-white/70">
              All orders recorded in MongoDB Atlas, scheduled for Hyderabad delivery.
            </p>
          </div>
          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-[#153B2B] shadow-sm transition hover:bg-[#98E59E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-70"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} aria-hidden="true" />
            <span>Refresh Orders</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat icon={Package} label="Total Orders" value={orders.length} />
        <Stat icon={IndianRupee} label="Gross Revenue" value={`₹${totalRevenue}`} accent />
        <div className="flex items-center gap-4 rounded-3xl border border-[#E2EAE4] bg-white/90 p-5 shadow-[0_8px_30px_-18px_rgba(21,59,43,0.3)] backdrop-blur">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF5EC] text-[#2C6E49]">
            <Truck size={22} aria-hidden="true" />
          </span>
          <div>
            <span className="block text-xs font-medium text-[#7A8C7E]">Dispatch Logistics</span>
            <span className="mt-1 block text-base font-bold text-[#152A1B]">Hyderabad Metro Fleet</span>
          </div>
        </div>
      </div>

      {loading ? (
        <Spinner size="lg" label="Fetching orders from MongoDB Atlas..." />
      ) : error ? (
        <div role="alert" className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
          <p className="font-bold">Error loading orders from database:</p>
          <p className="mt-1 text-xs">{error}</p>
          <p className="mt-2 text-xs text-gray-600">
            Ensure <code>node src/server.js</code> is active in your backend folder.
          </p>
        </div>
      ) : orders.length === 0 ? (
        <div className="space-y-4 rounded-3xl border border-[#E2EAE4] bg-white/90 p-12 text-center shadow-[0_8px_30px_-18px_rgba(21,59,43,0.3)] backdrop-blur">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF5EC]">
            <Package size={36} className="text-[#2C6E49]" aria-hidden="true" />
          </span>
          <h3 className="font-serif text-xl font-bold text-[#152A1B]">No orders received yet</h3>
          <p className="mx-auto max-w-sm text-sm text-[#7A8C7E]">
            Add items to your basket and complete checkout to see real documents populated here from MongoDB Atlas.
          </p>
          <button
            type="button"
            onClick={() => setActiveTab('shop')}
            className="inline-flex items-center gap-2 rounded-full bg-[#153B2B] px-6 py-3 text-xs font-bold text-white shadow-[0_12px_28px_-12px_rgba(21,59,43,0.7)] transition hover:bg-[#234F3C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C6E49] focus-visible:ring-offset-2"
          >
            Browse Menu
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, idx) => (
            <OrderCard key={order._id || idx} order={order} idx={idx} />
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ icon: Icon, label, value, accent }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-[#E2EAE4] bg-white/90 p-5 shadow-[0_8px_30px_-18px_rgba(21,59,43,0.3)] backdrop-blur">
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
          accent ? 'bg-[#153B2B] text-[#98E59E]' : 'bg-[#EAF5EC] text-[#2C6E49]'
        }`}
      >
        <Icon size={22} aria-hidden="true" />
      </span>
      <div>
        <span className="block text-xs font-medium text-[#7A8C7E]">{label}</span>
        <span className={`mt-0.5 block font-serif text-3xl font-bold ${accent ? 'text-[#2C6E49]' : 'text-[#152A1B]'}`}>
          {value}
        </span>
      </div>
    </div>
  );
}