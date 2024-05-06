import { renderHook } from '@testing-library/react';

import { useSingleton } from '../src/useSingleton';

const mockFn = vi.fn();

describe('useSingleton', () => {
  it('should execute the callback just once', () => {
    const { rerender } = renderHook(() => useSingleton(mockFn));

    expect(mockFn).toHaveBeenCalledTimes(1);

    rerender();
    rerender();

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
