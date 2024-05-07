import { act, renderHook, RenderHookResult } from '@testing-library/react';

import { useTimeout, UseTimeoutResult } from '../src/useTimeout';

function getHook(
  ms: number = 5,
  callback_: () => void = vi.fn(),
): [() => void, RenderHookResult<UseTimeoutResult, { callback: () => void; delay: number }>] {
  return [
    callback_,
    renderHook(({ callback, delay = 5 }) => useTimeout(callback, delay), {
      initialProps: { callback: callback_, delay: ms },
    }),
  ];
}

describe('useTimeout', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should be defined', () => {
    expect(useTimeout).toBeDefined();
  });

  it('should return memoized functions', () => {
    const { rerender, result } = renderHook(() => useTimeout(() => {}, 5));

    const { cancel, getStatus, reset } = result.current;

    expect(typeof cancel).toBe('function');
    expect(typeof getStatus).toBe('function');
    expect(typeof reset).toBe('function');

    rerender();

    expect(cancel).toBe(result.current.cancel);
    expect(getStatus).toBe(result.current.getStatus);
    expect(reset).toBe(result.current.reset);
  });

  it('should call the callback after the delay', () => {
    const [callback] = getHook();

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(5);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should cancel the callback call on unmount', () => {
    const [callback, hook] = getHook();

    expect(callback).not.toHaveBeenCalled();
    hook.unmount();

    act(() => {
      vi.advanceTimersByTime(5);
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it('should return the "status"', () => {
    let [, hook] = getHook();
    let { getStatus } = hook.result.current;

    expect(getStatus()).toBe('pending');

    hook.unmount();

    expect(getStatus()).toBe('cancelled');

    [, hook] = getHook();
    ({ getStatus } = hook.result.current);

    act(() => {
      vi.advanceTimersByTime(5);
    });

    expect(getStatus()).toBe('completed');
  });

  it('should return a "cancel" function that clear the timeout', () => {
    const [callback, hook] = getHook();
    const { cancel, getStatus } = hook.result.current;

    expect(callback).not.toHaveBeenCalled();
    expect(getStatus()).toBe('pending');

    act(() => {
      cancel();
      vi.advanceTimersByTime(5);
    });

    expect(callback).not.toHaveBeenCalled();
    expect(getStatus()).toBe('cancelled');
  });

  it('should return a "reset" function that reset the timeout', () => {
    const [callback, hook] = getHook();
    const { cancel, getStatus, reset } = hook.result.current;

    expect(getStatus()).toBe('pending');

    act(() => {
      cancel();
      vi.advanceTimersByTime(5);
    });

    expect(getStatus()).toBe('cancelled');

    act(() => {
      reset();
    });

    expect(getStatus()).toBe('pending');

    act(() => {
      vi.advanceTimersByTime(5);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(getStatus()).toBe('completed');
  });

  it('should reset timeout on delay change', () => {
    const [callback, hook] = getHook(50);

    expect(callback).not.toHaveBeenCalled();
    hook.rerender({ delay: 5, callback });

    act(() => {
      vi.advanceTimersByTime(5);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should NOT reset timeout when the callback changes', () => {
    const [callback, hook] = getHook(50);

    act(() => {
      vi.advanceTimersByTime(25);
    });

    expect(callback).not.toHaveBeenCalled();

    const callback2 = vi.fn();

    hook.rerender({ delay: 50, callback: callback2 });

    act(() => {
      vi.advanceTimersByTime(25);
    });

    expect(callback).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
