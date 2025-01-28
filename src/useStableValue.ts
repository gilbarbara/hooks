import { useState } from 'react';

import { useEffectDeepCompare } from './useEffectDeepCompare';
import { useIsFirstMount } from './useIsFirstMount';

export function useStableValue<T = any>(value: T) {
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
