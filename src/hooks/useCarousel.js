import { useEffect, useState } from 'react';

export function useCarousel(length, { intervalMs = 3200 } = {}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || length <= 1) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % length), intervalMs);
    return () => clearInterval(t);
  }, [paused, length, intervalMs]);

  return {
    index,
    setIndex,
    next: () => setIndex((i) => (i + 1) % length),
    prev: () => setIndex((i) => (i - 1 + length) % length),
    pause: () => setPaused(true),
    resume: () => setPaused(false)
  };
}
