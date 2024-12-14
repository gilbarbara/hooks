import { DependencyList } from 'react';
import { act, renderHook, RenderHookResult } from '@testing-library/react';
import { Mock } from 'vitest';

import { useDebounce, UseDebounceResult } from '../src/useDebounce';

const defaultDelay = 5;

function getHook(
  initialDeps: DependencyList = [5],
  ms: number = defaultDelay,
): [Mock, RenderHookResult<UseDebounceResult, { delay: number; dependencies: DependencyList }>] {
  const mock = vi.fn();

  return [
    mock,
    renderHook(({ delay, dependencies = [] }) => useDebounce(mock, delay, dependencies), {
      initialProps: {
        delay: ms,
        dependencies: initialDeps,
      },
    }),
  ];
}

describe('useDebounce', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should return memoized functions', () => {
    const { rerender, result } = renderHook(() => useDebounce(() => {}, 5));
    const { cancel, getStatus } = result.current;

    expect(cancel).toBeInstanceOf(Function);
    expect(getStatus).toBeInstanceOf(Function);

    rerender();

    expect(cancel).toBe(result.current.cancel);
    expect(getStatus).toBe(result.current.getStatus);
  });

  it('should NOT execute the callback by itself', () => {
    const [mock] = getHook();

    expect(mock).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(defaultDelay);
    });

    expect(mock).not.toHaveBeenCalled();
  });

  it('should execute the callback when dependencies change', () => {
    const [mock, hook] = getHook();

    expect(mock).not.toHaveBeenCalled();

    hook.rerender({ delay: defaultDelay, dependencies: [6] });

    act(() => {
      vi.advanceTimersByTime(defaultDelay);
    });

    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('should stop the timer when "cancel" is called', () => {
    const [mock, hook] = getHook();

    hook.rerender({ delay: defaultDelay, dependencies: [6] });
    hook.result.current.cancel();

    act(() => {
      vi.advanceTimersByTime(defaultDelay);
    });

    expect(mock).not.toHaveBeenCalled();
  });

  it('should clear the timer on unmount', () => {
    const [mock, hook] = getHook();

    expect(mock).not.toHaveBeenCalled();

    hook.rerender({ delay: defaultDelay, dependencies: [6] });
    hook.unmount();

    act(() => {
      vi.advanceTimersByTime(defaultDelay);
    });

    expect(mock).not.toHaveBeenCalled();
  });

  it('should return the actual status when calling "getStatus"', () => {
    let [, hook] = getHook();
    let { getStatus } = hook.result.current;

    expect(getStatus()).toBe('pending');

    hook.rerender({ delay: defaultDelay, dependencies: [6] });
    hook.unmount();
    expect(getStatus()).toBe('cancelled');

    [, hook] = getHook();
    ({ getStatus } = hook.result.current);

    hook.rerender({ delay: defaultDelay, dependencies: [7] });

    act(() => {
      vi.advanceTimersByTime(defaultDelay);
    });

    expect(getStatus()).toBe('completed');
  });

  it('should clear the timeout when calling "cancel"', () => {
    const [mock, hook] = getHook();
    const { cancel, getStatus } = hook.result.current;

    expect(mock).not.toHaveBeenCalled();
    expect(getStatus()).toBe('pending');

    hook.rerender({ delay: defaultDelay, dependencies: [6] });

    act(() => {
      cancel();
      vi.advanceTimersByTime(defaultDelay);
    });

    expect(mock).not.toHaveBeenCalled();
    expect(getStatus()).toBe('cancelled');
  });

  it('should reset timeout on delay change', () => {
    const [mock, hook] = getHook();

    expect(mock).not.toHaveBeenCalled();
    hook.rerender({ delay: 10, dependencies: [6] });

    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('should reset timeout on dependencies change', () => {
    const [mock, hook] = getHook();

    hook.rerender({ delay: 10, dependencies: [6] });

    act(() => {
      vi.advanceTimersByTime(defaultDelay);
    });
    expect(mock).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(defaultDelay);
    });
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
