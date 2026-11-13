import { useCallback, useMemo, useState } from 'react';
import { BOX_CAPACITIES, COUPONS } from '../constants/config';
import { calculateTotals, getBoxPrice, getCartCount, getCartSubtotal } from '../utils/pricing';
import { getId } from '../utils/filters';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState(null);

  const addToCart = useCallback((product, quantity = 1) => {
    const id = getId(product);
    setCart((prev) => {
      const existing = prev.find((i) => getId(i) === id);
      if (existing) return prev.map((i) => (getId(i) === id ? { ...i, qty: i.qty + quantity } : i));
      return [...prev, { ...product, id, _id: id, qty: quantity }];
    });
  }, []);

  const updateQty = useCallback((id, delta) => {
    setCart((prev) =>
      prev.map((i) => (getId(i) === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0)
    );
  }, []);

  const addBoxToCart = useCallback(({ boxSize, frequency, items }) => {
    const config = BOX_CAPACITIES[boxSize];
    const id = `box-${boxSize}-${Date.now()}`;
    setCart((prev) => [
      ...prev,
      {
        id,
        _id: id,
        name: `${config.name} (${frequency})`,
        tagline: items.map((c) => c.name.split(' ')[0]).join(', '),
        price: getBoxPrice(boxSize, frequency),
        qty: 1,
        badge: 'Weekly Subscription'
      }
    ]);
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const applyCoupon = useCallback(
    (override) => {
      const code = (typeof override === 'string' ? override : couponInput).trim().toUpperCase();
      if (COUPONS[code]) {
        setCouponInput(code);
        setAppliedCoupon(code);
        setCouponError(null);
      } else {
        setCouponError('Invalid coupon code. Try HYD15 (15% off) or MORNING20 (20% off above ₹299).');
      }
    },
    [couponInput]
  );

  const totals = useMemo(() => {
    const subtotal = getCartSubtotal(cart);
    return { subtotal, count: getCartCount(cart), ...calculateTotals(subtotal, appliedCoupon) };
  }, [cart, appliedCoupon]);

  return {
    cart,
    totals,
    couponInput,
    setCouponInput,
    appliedCoupon,
    couponError,
    addToCart,
    updateQty,
    addBoxToCart,
    clearCart,
    applyCoupon
  };
}
