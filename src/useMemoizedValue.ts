import { useState } from 'react';

import { useEffectDeepCompare } from './useEffectDeepCompare';
import { useIsFirstMount } from './useIsFirstMount';

export function useMemoizedValue<T = any>(value: T) {
  const [stableValue, setStableValue] = useState(() => value);
  const isFirstMount = useIsFirstMount();

  useEffectDeepCompare(() => {
    if (isFirstMount) {
      return;
    }

    setStableValue(() => value);
  }, [value]);

  return stableValue;
}
