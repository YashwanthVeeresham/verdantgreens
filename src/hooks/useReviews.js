import { useCallback, useState } from 'react';
import { INITIAL_REVIEWS } from '../data/products';

export function useReviews() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);

  const addReview = useCallback((review) => {
    // Keep the featured review pinned first; newest goes right after it.
    setReviews((prev) => [prev[0], review, ...prev.slice(1)]);
  }, []);

  return { reviews, addReview };
}
