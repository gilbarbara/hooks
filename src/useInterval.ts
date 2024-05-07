import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay: number | null = 100) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay);

      return () => {
        clearInterval(interval);
      };
    }

    return undefined;
  }, [delay]);
}
