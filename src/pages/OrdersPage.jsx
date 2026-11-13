import React from 'react';
import { Package, RefreshCw, Calendar, Phone, MapPin } from 'lucide-react';
import Spinner from '../components/ui/Spinner';
import { useStore } from '../context/StoreContext';

const SLOT_LABELS = {
  morning_6_30_to_9_00: '6:30 AM – 9:00 AM Morning',
  afternoon_12_00_to_2_00: '12:00 PM – 2:00 PM Office Lunch'
};

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

  return (
    <div className="bg-white rounded-3xl border border-[#E2EAE4] p-6 shadow-2xs hover:shadow-md transition">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#F0F4F1] gap-2">
        <div className="flex items-center space-x-3">
          <span className="px-2.5 py-1 rounded-md bg-[#F5F8F6] font-mono text-xs font-bold text-[#152A1B] border border-[#E2EAE4]">
            #{order._id ? order._id.slice(-6).toUpperCase() : `ORD-${idx + 1}`}
          </span>
          <span className="text-xs text-[#7A8C7E] flex items-center">
            <Calendar size={13} className="mr-1" />
            {date}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#EAF5EC] text-[#2C6E49] border border-[#CDE5D4]">
            {order.orderStatus ? order.orderStatus.replace(/_/g, ' ').toUpperCase() : 'QUEUED'}
          </span>
          <span className="font-serif text-xl font-bold text-[#152A1B]">₹{order.finalAmount}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs">
        <div className="space-y-1.5">
          <p className="font-bold text-[#152A1B] text-sm">{order.customer?.name || 'Walk-in Customer'}</p>
          <p className="text-[#5C6E5F] flex items-center">
            <Phone size={13} className="mr-1.5 text-[#2C6E49]" />
            {order.customer?.phone || 'No phone'}
          </p>
          <p className="text-[#5C6E5F] flex items-center">
            <MapPin size={13} className="mr-1.5 text-[#2C6E49]" />
            {order.customer?.address?.street}, {order.customer?.address?.locality || 'Hyderabad'} -{' '}
            {order.customer?.address?.pincode}
          </p>
          <p className="text-[#7A8C7E]">
            <span className="font-semibold text-[#152A1B]">Slot:</span> {SLOT_LABELS[order.deliverySlot] || order.deliverySlot}
          </p>
        </div>

        <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-[#E2EAE4] space-y-2">
          <p className="font-bold text-[#152A1B] uppercase tracking-wider text-[11px]">Items in Order</p>
          <div className="space-y-1">
            {order.items?.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-[#2A432F]">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span className="font-mono">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          {order.couponApplied && (
            <div className="pt-2 border-t border-[#E2EAE4] flex justify-between text-[#2C6E49]">
              <span>Coupon applied: {order.couponApplied}</span>
              <span>-₹{order.discount || 0}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const { orders: ordersState, setActiveTab } = useStore();
  const { orders, totalRevenue, loading, error, refresh } = ordersState;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6ECE7] pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#2C6E49]">Live Farm Dispatch Dashboard</span>
          <h2 className="font-serif text-3xl font-bold text-[#152A1B]">Customer Orders ({orders.length})</h2>
          <p className="text-sm text-[#6C7D6E]">All orders recorded in MongoDB Atlas, scheduled for Hyderabad delivery.</p>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="self-start sm:self-auto px-4 py-2 bg-white border border-[#DCE6DF] hover:bg-[#F5F8F6] rounded-xl text-xs font-semibold text-[#152A1B] flex items-center space-x-2 shadow-2xs"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Refresh Orders</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat label="Total Orders" value={orders.length} />
        <Stat label="Gross Revenue" value={`₹${totalRevenue}`} accent />
        <div className="bg-white p-5 rounded-3xl border border-[#E2EAE4] shadow-2xs">
          <span className="text-xs text-[#7A8C7E] font-medium block">Dispatch Logistics</span>
          <span className="text-base font-bold text-[#152A1B] mt-2 block">Hyderabad Metro Fleet</span>
        </div>
      </div>

      {loading ? (
        <Spinner size="lg" label="Fetching orders from MongoDB Atlas..." />
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-3xl text-red-800 text-sm">
          <p className="font-bold">Error loading orders from database:</p>
          <p className="text-xs mt-1">{error}</p>
          <p className="text-xs mt-2 text-gray-600">
            Ensure <code>node src/server.js</code> is active in your backend folder.
          </p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E2EAE4] p-12 text-center space-y-3">
          <Package size={40} className="mx-auto text-[#C2D1C6]" />
          <h3 className="font-serif text-xl font-bold text-[#152A1B]">No orders received yet</h3>
          <p className="text-sm text-[#7A8C7E] max-w-sm mx-auto">
            Add items to your basket and complete checkout to see real documents populated here from MongoDB Atlas.
          </p>
          <button onClick={() => setActiveTab('shop')} className="px-6 py-2.5 bg-[#153B2B] text-white rounded-full text-xs font-bold">
            Browse Menu
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

function Stat({ label, value, accent }) {
  return (
    <div className="bg-white p-5 rounded-3xl border border-[#E2EAE4] shadow-2xs">
      <span className="text-xs text-[#7A8C7E] font-medium block">{label}</span>
      <span className={`font-serif text-3xl font-bold mt-1 block ${accent ? 'text-[#2C6E49]' : 'text-[#152A1B]'}`}>{value}</span>
    </div>
  );
}
