import React from 'react';
import { Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function CheckoutSuccessModal() {
  const { placedOrder, dismissPlacedOrder, profile, selectedLocality, setIsCartOpen, setActiveTab } = useStore();
  if (!placedOrder) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
        <div className="w-12 h-12 bg-[#EAF5EC] text-[#2C6E49] rounded-full mx-auto flex items-center justify-center">
          <Check size={24} />
        </div>
        <h3 className="font-serif text-xl font-bold text-[#152A1B]">Order Placed with Farm!</h3>
        <p className="text-xs text-[#5C6E5F]">
          {placedOrder.offline
            ? 'We could not reach the server, so this confirmation is local only. Please contact care@verdantmart.in to confirm.'
            : 'Your order has been synced with our Hyderabad greenhouse server.'}
        </p>
        <div className="p-3 bg-[#F5F8F6] rounded-xl text-xs text-left border border-[#E2EAE4] space-y-1.5">
          <p>
            <strong>Order ID:</strong>{' '}
            <span className="font-mono text-[#2C6E49]">{placedOrder.orderId || placedOrder._id}</span>
          </p>
          <p>
            <strong>Recipient:</strong> {profile.name} ({profile.phone})
          </p>
          <p>
            <strong>Locality:</strong> {profile.locality || selectedLocality}, Hyderabad
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{placedOrder.finalAmount}
          </p>
          <p>
            <strong>Delivery Window:</strong> 6:30 AM – 9:00 AM Morning Dispatch
          </p>
        </div>
        <button
          onClick={() => {
            dismissPlacedOrder();
            setIsCartOpen(false);
            setActiveTab('orders');
          }}
          className="w-full py-2.5 bg-[#153B2B] text-white rounded-xl text-xs font-bold hover:bg-[#234F3C] transition"
        >
          View in Orders Dashboard
        </button>
      </div>
    </div>
  );
}
