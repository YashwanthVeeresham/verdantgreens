import { useCallback, useEffect, useState } from 'react';
import { fetchProductsApi } from '../services/api';
import { FALLBACK_PRODUCTS } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setApiError(null);
    try {
      setProducts(await fetchProductsApi());
    } catch (err) {
      console.warn('Backend API warning, falling back to local list:', err.message);
      setApiError('Backend offline or connecting... Showing cached menu.');
      setProducts(FALLBACK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { products, loading, apiError, reload: load };
}
