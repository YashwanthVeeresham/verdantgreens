import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchOrdersApi } from '../services/api';

export function useOrders(profile) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setOrders(await fetchOrdersApi());
    } catch (err) {
      console.warn('Orders fetch error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const totalRevenue = useMemo(() => orders.reduce((sum, o) => sum + (o.finalAmount || 0), 0), [orders]);

  const userOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          (profile.phone && o.customer?.phone === profile.phone) ||
          o.customer?.name?.toLowerCase() === profile.name.toLowerCase()
      ),
    [orders, profile.phone, profile.name]
  );

  return { orders, userOrders, totalRevenue, loading, error, refresh };
}
