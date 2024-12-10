import { act, renderHook } from '@testing-library/react';

import { useToggle } from '../src/useToggle';

describe('isToggle', () => {
  it('should return properly', () => {
    const { rerender, result } = renderHook(() => useToggle());
    const [state, { toggle, toggleOff, toggleOn }] = result.current;

    expect(state).toBeTrue();
    expect(toggle).toBeInstanceOf(Function);
    expect(toggleOn).toBeInstanceOf(Function);
    expect(toggleOff).toBeInstanceOf(Function);

    rerender();

    expect(state).toBe(result.current[0]);
    expect(toggle).toBe(result.current[1].toggle);
    expect(toggleOn).toBe(result.current[1].toggleOn);
    expect(toggleOff).toBe(result.current[1].toggleOff);
  });

  it('should initialize with "true"', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);
  });

  it('should initialize with "false"', () => {
    const { result } = renderHook(() => useToggle(false));

    expect(result.current[0]).toBe(false);
  });

  it('should handle "toggle" action with parameters', () => {
    const { result } = renderHook(() => useToggle(false));
    const [value, actions] = result.current;

    expect(value).toBe(false);

    act(() => {
      actions.toggle(true);
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      actions.toggle(false);
    });

    expect(result.current[0]).toBe(false);
  });

  it('should handle "toggle" action without parameters', () => {
    const { result } = renderHook(() => useToggle(true));
    const [, actions] = result.current;

    act(() => {
      actions.toggle();
    });

    expect(result.current[0]).toBe(false);

    act(() => {
      actions.toggle();
    });

    expect(result.current[0]).toBe(true);
  });

  it('should handle the "toggleOn" and "toggleOff" actions', () => {
    const { result } = renderHook(() => useToggle(false));
    const [, actions] = result.current;

    act(() => {
      actions.toggleOn();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      actions.toggleOn();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      actions.toggleOff();
    });

    expect(result.current[0]).toBe(false);

    act(() => {
      actions.toggleOff();
    });

    expect(result.current[0]).toBe(false);
  });

  it('should ignore non-boolean parameters', () => {
    const { result } = renderHook(() => useToggle(true));
    const [, actions] = result.current;

    act(() => {
      actions.toggle('string');
    });

    expect(result.current[0]).toBe(false);

    act(() => {
      actions.toggle({});
    });

    expect(result.current[0]).toBe(true);
  });
});
