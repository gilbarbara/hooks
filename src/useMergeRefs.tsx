import { MutableRefObject, Ref, RefCallback, useCallback } from 'react';

export function useMergeRefs<T>(...refs: Ref<T>[]): RefCallback<T> {
  return useCallback(
    (value: T) => {
      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref && typeof ref === 'object') {
          (ref as MutableRefObject<T>).current = value;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );
}
