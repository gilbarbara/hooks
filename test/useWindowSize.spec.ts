import { act, renderHook } from '@testing-library/react';

import { useWindowSize } from '../src/useWindowSize';

describe('useWindowSize', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should return the size', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toEqual({ height: 768, width: 1024 });
  });

  it('should update the size on window resize', async () => {
    const { result } = renderHook(() => useWindowSize(100));

    expect(result.current).toEqual({ height: 768, width: 1024 });

    window = Object.assign(window, { innerWidth: 768, innerHeight: 1024 });
    window.dispatchEvent(new Event('resize'));

    await act(async () => {
      vi.advanceTimersByTime(50);
    });

    expect(result.current).toEqual({ height: 768, width: 1024 });

    await act(async () => {
      vi.runOnlyPendingTimers();
    });

    expect(result.current).toEqual({ height: 1024, width: 768 });
  });
});
