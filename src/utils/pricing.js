import {
  BOX_CAPACITIES,
  BOX_FREQUENCY_DISCOUNT,
  COUPONS,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE
} from '../constants/config';

export const getCartSubtotal = (cart) => cart.reduce((sum, item) => sum + item.price * item.qty, 0);

export const getCartCount = (cart) => cart.reduce((sum, item) => sum + item.qty, 0);

export const calculateTotals = (subtotal, couponCode) => {
  const coupon = COUPONS[couponCode];
  const discount = coupon && subtotal >= coupon.minSubtotal ? Math.round(subtotal * coupon.rate) : 0;
  const shipping = subtotal > FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  return { discount, shipping, total: subtotal - discount + shipping };
};

export const getBoxPrice = (boxSize, frequency) =>
  Math.round(BOX_CAPACITIES[boxSize].price * BOX_FREQUENCY_DISCOUNT[frequency]);
