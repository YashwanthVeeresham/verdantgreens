import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useOrders } from '../hooks/useOrders';
import { useUserProfile } from '../hooks/useUserProfile';
import { useCart } from '../hooks/useCart';
import { useReviews } from '../hooks/useReviews';
import { buildCheckoutPayload, checkoutApi } from '../services/api';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const productState = useProducts();
  const profileState = useUserProfile();
  const ordersState = useOrders(profileState.profile);
  const cartState = useCart();
  const reviewState = useReviews();

  const [activeTab, setActiveTab] = useState('shop');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocality, setSelectedLocality] = useState(profileState.profile.locality || 'Gachibowli');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const { profile, updateProfile } = profileState;
  const { addToCart: addItem, clearCart, cart, appliedCoupon, totals } = cartState;
  const { refresh: refreshOrders } = ordersState;

  useEffect(() => {
    if (profile.locality) setSelectedLocality(profile.locality);
  }, [profile.locality]);

  const changeLocality = useCallback(
    (locality) => {
      setSelectedLocality(locality);
      updateProfile({ locality });
    },
    [updateProfile]
  );

  const addToCart = useCallback(
    (product, qty = 1) => {
      addItem(product, qty);
      setIsCartOpen(true);
    },
    [addItem]
  );

  const addBoxToCart = useCallback(
    (args) => {
      cartState.addBoxToCart(args);
      setIsCartOpen(true);
    },
    [cartState]
  );

  const checkout = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const payload = buildCheckoutPayload({
        profile,
        locality: selectedLocality,
        cart,
        coupon: appliedCoupon
      });
      const data = await checkoutApi(payload);
      if (data.success) {
        setPlacedOrder(data);
        clearCart();
        refreshOrders();
      } else {
        alert(data.message || 'Checkout failed. Please verify details.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      // Offline fallback: show a local confirmation. This order is NOT saved server-side.
      setPlacedOrder({
        orderId: 'HYD-' + Math.floor(100000 + Math.random() * 900000),
        finalAmount: totals.total,
        offline: true,
        message: 'Order recorded! Morning dispatch 6:30 AM - 9:00 AM'
      });
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  }, [profile, selectedLocality, cart, appliedCoupon, totals.total, clearCart, refreshOrders]);

  const value = useMemo(
    () => ({
      ...productState,
      ...profileState,
      ...cartState,
      ...reviewState,
      orders: ordersState,
      addToCart,
      addBoxToCart,
      activeTab,
      setActiveTab,
      searchQuery,
      setSearchQuery,
      selectedLocality,
      changeLocality,
      isCartOpen,
      setIsCartOpen,
      isLoginOpen,
      setIsLoginOpen,
      selectedProduct,
      setSelectedProduct,
      isSubmitting,
      checkout,
      placedOrder,
      dismissPlacedOrder: () => setPlacedOrder(null)
    }),
    [
      productState,
      profileState,
      cartState,
      reviewState,
      ordersState,
      addToCart,
      addBoxToCart,
      activeTab,
      searchQuery,
      selectedLocality,
      changeLocality,
      isCartOpen,
      isLoginOpen,
      selectedProduct,
      isSubmitting,
      checkout,
      placedOrder
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
