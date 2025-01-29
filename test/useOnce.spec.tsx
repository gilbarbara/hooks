import { renderHook } from '@testing-library/react';

import { useOnce } from '../src/useOnce';

const mockFn = vi.fn();

describe('useOnce', () => {
  it('should execute the callback just once', () => {
    const { rerender } = renderHook(() => useOnce(mockFn));

    expect(mockFn).toHaveBeenCalledTimes(1);

    rerender();
    rerender();

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
