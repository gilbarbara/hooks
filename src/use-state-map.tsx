import { useCallback, useState } from 'react';

type Updater<T> = (input: Partial<T>) => void;

export default function useStateMap<T extends object>(initialValue: T): [T, Updater<T>] {
  const [state, setState] = useState(initialValue);

  const updateState = useCallback(input => {
    setState(s => ({
      ...s,
      ...input,
    }));
  }, []);

  return [state, updateState];
}
