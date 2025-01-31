import { DependencyList } from 'react';
import { renderHook } from '@testing-library/react';

import { FunctionWithArguments } from '../src/types';
import { useCallbackDeepCompare } from '../src/useCallbackDeepCompare';

const setup = (initialCallback: FunctionWithArguments, initialDependencies: DependencyList) => {
  return renderHook(
    ({ callback, dependencies }) => useCallbackDeepCompare(callback, dependencies),
    {
      initialProps: { callback: initialCallback, dependencies: initialDependencies },
    },
  );
};

describe('useCallbackDeepCompare', () => {
  const callback = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the same callback if dependencies are deeply equal', () => {
    const { rerender, result } = setup(callback, [{ key: 'value' }]);
    const initialCallback = result.current;

    rerender({ callback, dependencies: [{ key: 'value' }] });

    expect(result.current).toBe(initialCallback);
  });

  it('should return a new callback if dependencies change deeply', () => {
    const { rerender, result } = setup(callback, [{ key: 'value' }]);
    const initialCallback = result.current;

    rerender({ callback, dependencies: [{ key: 'newValue' }] });

    expect(result.current).not.toBe(initialCallback);
  });

  it('should return the same callback when dependencies are referentially the same', () => {
    const { rerender, result } = setup(callback, [{}]);
    const initialCallback = result.current;

    rerender({ callback, dependencies: [{}] });

    expect(result.current).toBe(initialCallback);
  });
});
