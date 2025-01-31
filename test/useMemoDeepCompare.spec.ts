import { DependencyList } from 'react';
import { renderHook } from '@testing-library/react';

import { FunctionWithArguments } from '../src/types';
import { useMemoDeepCompare } from '../src/useMemoDeepCompare';

const setup = (initialFactory: FunctionWithArguments, initialDependencies: DependencyList) => {
  return renderHook(({ dependencies, factory }) => useMemoDeepCompare(factory, dependencies), {
    initialProps: { dependencies: initialDependencies, factory: initialFactory },
  });
};

describe('useMemoDeepCompare', () => {
  it('should return the same memoized value if dependencies are deeply equal', () => {
    const { rerender, result } = setup(() => [42, 21], [{ key: 'value' }]);
    const initialValue = result.current;

    rerender({ factory: () => [42, 21], dependencies: [{ key: 'value' }] });

    expect(result.current).toBe(initialValue);
  });

  it('should return a new memoized value if dependencies change deeply', () => {
    const { rerender, result } = setup(() => [42, 21], [{ key: 'value' }]);
    const initialValue = result.current;

    rerender({ factory: () => [42, 21], dependencies: [{ key: 'newValue' }] });

    expect(result.current).not.toBe(initialValue);
  });

  it('should return the same memoized value when dependencies are referentially the same', () => {
    const { rerender, result } = setup(() => [42, 21], [{}]);
    const initialValue = result.current;

    rerender({ factory: () => [42, 21], dependencies: [{}] });

    expect(result.current).toBe(initialValue);
  });
});
