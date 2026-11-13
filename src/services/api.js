import { API_BASE_URL } from '../constants/config';

async function request(path, options) {
  const res = await fetch(`${API_BASE_URL}${path}`, options);
  return res.json();
}

export const fetchProductsApi = async () => {
  const data = await request('/products');
  if (data.success && data.data?.length > 0) return data.data;
  throw new Error(data.message || 'Failed to fetch items');
};

export const fetchOrdersApi = async () => {
  const data = await request('/orders');
  if (data.success && data.data) return data.data;
  throw new Error(data.message || 'Could not fetch orders list');
};

export const checkoutApi = (payload) =>
  request('/orders/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

export const buildCheckoutPayload = ({ profile, locality, cart, coupon }) => ({
  customer: {
    name: profile.name,
    phone: profile.phone,
    address: {
      street: profile.street,
      locality: profile.locality || locality,
      pincode: profile.pincode
    }
  },
  items: cart.map((item) => ({
    product: item._id || item.id,
    name: item.name,
    price: item.price,
    qty: item.qty
  })),
  coupon: coupon || null,
  deliverySlot: profile.deliverySlot,
  paymentMethod: 'upi'
});
