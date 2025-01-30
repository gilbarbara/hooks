import { renderHook } from '@testing-library/react';

import { useDataChanges } from '../src/useDataChanges';

describe('useDataChanges', () => {
  beforeAll(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should detect changes', () => {
    const { rerender, result } = renderHook(data => useDataChanges(data), {
      initialProps: { key: 'value' },
    });

    rerender({ key: 'newValue' });

    expect(result.current).toEqual({ key: { from: 'value', to: 'newValue' } });
  });

  it('should log with name', () => {
    const { rerender } = renderHook(data => useDataChanges(data, 'Test'), {
      initialProps: { key: 'value' },
    });

    rerender({ key: 'newValue' });

    expect(console.log).toHaveBeenCalledWith('[data-changes: Test]', {
      key: { from: 'value', to: 'newValue' },
    });
  });

  it('should handle the only prop and track specified keys', () => {
    const { rerender, result } = renderHook(data => useDataChanges(data, { only: ['key1'] }), {
      initialProps: { key1: 'value1', key2: 'value2' },
    });

    rerender({ key1: 'newValue1', key2: 'newValue2' });

    expect(result.current).toEqual({ key1: { from: 'value1', to: 'newValue1' } });
  });

  it('should not log when skipLog is true', () => {
    renderHook(() => useDataChanges({ key: 'value' }, { skipLog: true }));

    expect(console.log).not.toHaveBeenCalled();
  });

  it('should handle deep comparison', () => {
    const { rerender, result } = renderHook(data => useDataChanges(data, { comparison: 'deep' }), {
      initialProps: { obj: { nested: 'value' } },
    });

    rerender({ obj: { nested: 'value' } });

    expect(result.current).toBeUndefined();

    rerender({ obj: { nested: 'newValue' } });

    expect(result.current).toEqual({
      obj: { from: { nested: 'value' }, to: { nested: 'newValue' } },
    });
  });

  it('should return undefined and skip log without changes', () => {
    const { rerender, result } = renderHook(data => useDataChanges(data), {
      initialProps: { key: 'value' },
    });

    rerender({ key: 'value2' });

    expect(result.current).toEqual({ key: { from: 'value', to: 'value2' } });
    expect(console.log).toHaveBeenCalledTimes(1);

    rerender({ key: 'value2' });

    expect(result.current).toBeUndefined();
    expect(console.log).toHaveBeenCalledTimes(1);
  });
});
