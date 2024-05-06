import { act, renderHook } from '@testing-library/react';

import { useSetState } from '../src/useSetState';

function setUp<TState extends Record<PropertyKey, unknown>>(initialState?: TState) {
  return renderHook(() => useSetState<TState>(initialState));
}

test('should init state and setter', () => {
  const { result } = setUp({ foo: 'bar' });
  const [state, setState] = result.current;

  expect(state).toEqual({ foo: 'bar' });
  expect(setState).toBeInstanceOf(Function);
});

test('should init empty state if not initial state provided', () => {
  const { result } = setUp();

  expect(result.current[0]).toEqual({});
});

test('should merge changes into current state when providing object', () => {
  const { result } = setUp({ foo: 'bar', count: 1 });
  const [state, setState] = result.current;

  act(() => {
    setState({ count: state.count + 1, foo: 'baz' });
  });

  expect(result.current[0]).toEqual({ foo: 'baz', count: 2 });
});

test('should merge changes into current state when providing function', () => {
  const { result } = setUp({ foo: 'bar', count: 1 });
  const [, setState] = result.current;

  act(() => {
    setState(previousState => ({ count: previousState.count + 1, someBool: true }));
  });

  expect(result.current[0]).toEqual({ foo: 'bar', count: 2, someBool: true });
});

/**
 * Enforces cases where a hook can safely depend on the callback without
 * causing an endless rerender cycle: useEffect(() => setState({ data }), [setState]);
 */
test('should return a memoized setState callback', () => {
  const { rerender, result } = setUp({ ok: false });
  const [, setState1] = result.current;

  act(() => {
    setState1({ ok: true });
  });
  rerender();

  const [, setState2] = result.current;

  expect(setState1).toBe(setState2);
});
