import { DependencyList, EffectCallback, useEffect } from 'react';

import { useIsFirstMount } from './useIsFirstMount';

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirstMount = useIsFirstMount();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
