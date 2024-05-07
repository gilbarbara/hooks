import { Dispatch, SetStateAction } from 'react';

import { PlainObject } from './types';
import { useDeepCompareEffect } from './useDeepCompareEffect';
import { useLocalStorage } from './useLocalStorage';
import { useSetState } from './useSetState';

export interface UseLocalStorageStateOptions<TState> {
  /**
   * Check if the saved state keys are different from the initial state and override it if needed.
   * @default false
   */
  overrideDivergentSavedState?: boolean;
  /**
   * Reset properties in the saved state.
   */
  resetProperties?: Partial<TState>;
}

export type UseLocalStorageStateResult<T> = [
  state: T,
  setState: Dispatch<SetStateAction<Partial<T>>>,
  remove: () => void,
];

function getState<TState extends PlainObject>(
  initialState: TState,
  savedState: TState,
  shouldOverride: boolean,
  restoreProperties?: Partial<TState>,
): TState {
  if (shouldOverride) {
    const initialStateKeys = Object.keys(initialState);
    const savedStateKeys = savedState ? Object.keys(savedState) : [];
    const restorePropertiesKeys = restoreProperties ? Object.keys(restoreProperties) : [];

    if (![...initialStateKeys, ...restorePropertiesKeys].every(k => savedStateKeys.includes(k))) {
      return { ...initialState, ...restoreProperties };
    }

    return { ...savedState, ...restoreProperties };
  }

  return { ...savedState, ...restoreProperties };
}

export function useLocalStorageState<TState extends PlainObject>(
  key: string,
  initialState: TState,
  options?: UseLocalStorageStateOptions<TState>,
): UseLocalStorageStateResult<TState> {
  const { overrideDivergentSavedState = false, resetProperties } = options || {};

  const [value, setValue, remove] = useLocalStorage(key, initialState);
  const [state, setState] = useSetState<TState>(
    getState(initialState, value!, overrideDivergentSavedState, resetProperties) as TState,
  );

  useDeepCompareEffect(() => {
    setValue(state);
  }, [setValue, state]);

  return [state, setState, remove];
}
