import { useCallback, useEffect, useRef, MutableRefObject } from 'react';

type Callback = () => void;

export default function useInterval(callback: Callback, ms: number) {
  const savedCallback: MutableRefObject<null | Callback> = useRef(null);
  const interval: MutableRefObject<null | number> = useRef(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    interval.current = window.setInterval(() => {
      /* istanbul ignore else */
      if (savedCallback.current) {
        savedCallback.current();
      }
    }, ms);

    return () => {
      clearInterval(interval.current!);
    };
  }, [ms]);

  return useCallback(() => {
    clearInterval(interval.current!);
  }, []);
}
