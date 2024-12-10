import { renderHook } from '@testing-library/react';

import { useHasChanged } from '../src/useHasChanged';

describe('useHasChanged', () => {
  it('should return the expected values', () => {
    const { rerender, result } = renderHook(({ value }) => useHasChanged(value), {
      initialProps: { value: 'ab' },
    });

    expect(result.current).toEqual([false, undefined]);

    rerender({ value: 'ab' });

    expect(result.current).toEqual([false, 'ab']);

    rerender({ value: 'ac' });

    expect(result.current).toEqual([true, 'ab']);

    rerender({ value: 'ac' });

    expect(result.current).toEqual([false, 'ac']);
  });

  it('should execute the callback when the value changes', () => {
    const callbackMock = vi.fn();
    const { rerender, result } = renderHook(({ value }) => useHasChanged(value, callbackMock), {
      initialProps: { value: false },
    });

    expect(result.current).toEqual([false, undefined]);
    expect(callbackMock).not.toHaveBeenCalled();

    rerender({ value: false });

    expect(result.current).toEqual([false, false]);
    expect(callbackMock).not.toHaveBeenCalled();

    rerender({ value: true });

    expect(result.current).toEqual([true, false]);
    expect(callbackMock).toHaveBeenCalledTimes(1);

    rerender({ value: true });

    expect(result.current).toEqual([false, true]);
    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});
