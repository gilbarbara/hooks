import { Reducer, useCallback, useMemo, useReducer } from 'react';

export type UseToggleResult = [
  boolean,
  actions: {
    toggle: (nextValue?: boolean) => void;
    toggleOff: () => void;
    toggleOn: () => void;
  },
];

export function useToggle(initialValue: boolean = true): UseToggleResult {
  const [value, toggle] = useReducer<Reducer<boolean, any>>(
    (state: boolean, nextValue?: any) => (typeof nextValue === 'boolean' ? nextValue : !state),
    initialValue,
  );

  const toggleOn = useCallback(() => toggle(true), []);
  const toggleOff = useCallback(() => toggle(false), []);

  return useMemo(() => [value, { toggle, toggleOn, toggleOff }], [value, toggleOn, toggleOff]);
}
