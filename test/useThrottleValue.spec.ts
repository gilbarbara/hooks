import { act, renderHook } from '@testing-library/react';

import { useThrottleValue } from '../src/useThrottleValue';

describe('useThrottleValue', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should throttle the value changes', () => {
    const { rerender, result } = renderHook(value => useThrottleValue(value, 100), {
      initialProps: '',
    });

    expect(result.current).toBe('');

    rerender('test');

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(result.current).toBe('');

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(result.current).toBe('test');

    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender('testing');
    rerender('testing my');

    expect(result.current).toBe('testing');

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe('testing my');
  });
});
