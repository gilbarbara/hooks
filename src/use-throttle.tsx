import { useEffect, useRef, useState } from 'react';

interface UseThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export default function useThrottle(
  fn: () => void,
  ms = 500,
  options?: UseThrottleOptions,
): () => void {
  const [now, setNow] = useState(0);
  const timer = useRef<number>();
  const coolDown = useRef(Date.now());

  const leading = options?.leading ?? true;
  const trailing = options?.trailing ?? false;

  useEffect(() => {
    if (!now) {
      return undefined;
    }

    const timerFn = () => {
      timer.current = undefined;

      if (trailing) {
        fn();
      }
    };

    if (timer.current) {
      timer.current = window.setTimeout(timerFn, Date.now() - coolDown.current);
    }

    if (!timer.current) {
      /* istanbul ignore else */
      if (leading) {
        fn();
      }

      timer.current = window.setTimeout(timerFn, ms);
      coolDown.current = Date.now();
    }

    return () => {
      if (timer.current) {
        window.clearTimeout(timer.current);
      }
    };
  }, [fn, leading, ms, now, trailing]);

  return () => setNow(Date.now());
}
