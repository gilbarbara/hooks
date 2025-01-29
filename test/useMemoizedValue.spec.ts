import { renderHook } from '@testing-library/react';

import { useMemoizedValue } from '../src/useMemoizedValue';

describe('useMemoizedValue', () => {
  it('should return exactly the same value', () => {
    const initialValue = [1];
    const { rerender, result } = renderHook(value => useMemoizedValue(value), {
      initialProps: initialValue,
    });

    rerender([1]);

    expect(result.current).toBe(initialValue);
  });

  it('should return exactly the same value with functions', () => {
    const initialValue = () => 1;
    const { rerender, result } = renderHook(value => useMemoizedValue(value), {
      initialProps: initialValue,
    });

    rerender(() => 1);

    expect(result.current).toBe(initialValue);
  });

  it('should return the updated value', () => {
    const initialValue = { options: [1, 2], settings: { saved: true } };
    const updatedValue = { ...initialValue, settings: { saved: false } };
    const { rerender, result } = renderHook(value => useMemoizedValue(value), {
      initialProps: initialValue,
    });

    expect(result.current).toBe(initialValue);

    rerender(updatedValue);
    expect(result.current).toBe(updatedValue);
  });
});
