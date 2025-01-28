import { useEffect } from 'react';
import { renderHook } from '@testing-library/react';

import { useEffectDeepCompare } from '../src/useEffectDeepCompare';

let options = { max: 10 };

describe('useEffectDeepCompare', () => {
  beforeAll(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should compare only once', () => {
    const mockEffectNormal = vi.fn();
    const mockEffectDeep = vi.fn();

    const { rerender: rerenderNormal } = renderHook(() => useEffect(mockEffectNormal, [options]));
    const { rerender: rerenderDeep } = renderHook(() =>
      useEffectDeepCompare(mockEffectDeep, [options]),
    );

    expect(mockEffectNormal).toHaveBeenCalledTimes(1);
    expect(mockEffectDeep).toHaveBeenCalledTimes(1);

    options = { max: 10 };
    rerenderDeep();
    rerenderNormal();

    expect(mockEffectNormal).toHaveBeenCalledTimes(2);
    expect(mockEffectDeep).toHaveBeenCalledTimes(1);

    options = { max: 10 };
    rerenderNormal();
    rerenderDeep();

    expect(mockEffectNormal).toHaveBeenCalledTimes(3);
    expect(mockEffectDeep).toHaveBeenCalledTimes(1);
  });

  it('should run clean-up provided on unmount', () => {
    const mockEffectCleanup = vi.fn();
    const mockEffectCallback = vi.fn().mockReturnValue(mockEffectCleanup);

    const { unmount } = renderHook(() => useEffectDeepCompare(mockEffectCallback, [options]));

    expect(mockEffectCleanup).not.toHaveBeenCalled();

    unmount();
    expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
  });

  it('should warn about primitive dependencies', () => {
    renderHook(() => useEffectDeepCompare(() => {}, [1, true]));

    expect(console.warn).toHaveBeenCalledExactlyOnceWith(
      'useEffectDeepCompare should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
    );
  });

  it('should warn about empty dependencies', () => {
    renderHook(() => useEffectDeepCompare(() => {}, []));

    expect(console.warn).toHaveBeenCalledExactlyOnceWith(
      'useEffectDeepCompare should not be used with no dependencies. Use React.useEffect instead.',
    );
  });
});
