import { renderHook } from '@testing-library/react';

import { useEffectOnce } from '../src/useEffectOnce';

describe('useEffectOnce', () => {
  it('should run the effect only once', () => {
    const mockEffect = vi.fn();
    const mockDestroyer = vi.fn();

    const { rerender } = renderHook(() =>
      useEffectOnce(() => {
        mockEffect();

        return () => mockDestroyer();
      }),
    );

    expect(mockEffect).toHaveBeenCalledTimes(1);

    rerender();

    expect(mockEffect).toHaveBeenCalledTimes(1);
  });
});
