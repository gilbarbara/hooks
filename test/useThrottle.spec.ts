import { act, renderHook } from '@testing-library/react';

import { useThrottle } from '../src/useThrottle';

const mockFn = vi.fn();

describe('useThrottle', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    mockFn.mockClear();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should throttle the callback', () => {
    const { result } = renderHook(() => useThrottle(mockFn, 500));

    expect(mockFn).toHaveBeenCalledTimes(0);

    act(() => {
      result.current();
      result.current();
    });

    expect(mockFn).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    act(() => {
      result.current();
      result.current();
    });

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should execute the callback after the timeout with "trailing"', () => {
    const { result } = renderHook(() => useThrottle(mockFn, 500, true));

    act(() => {
      result.current();
    });

    expect(mockFn).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);

    act(() => {
      result.current();
    });

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
