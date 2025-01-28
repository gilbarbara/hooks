import { act } from 'react';
import { renderHook } from '@testing-library/react';

import { usePersistentState } from '../src/usePersistentState';

const key = 'my-key';
const lastLogin = '2024-01-01T00:00:00.000Z';

const initialState = {
  name: 'John Doe',
  username: 'johndoe',
  age: 30,
  isSubscribed: true,
  theme: 'dark',
  lastLogin,
};

describe('usePersistentState', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should use the existing value from localStorage if present', () => {
    localStorage.setItem(key, JSON.stringify(initialState));
    const { result } = renderHook(() => usePersistentState(key, { foo: 'bar' }));

    expect(result.current[0]).toEqual(initialState);
  });

  it('should set and update the localStorage', () => {
    expect(localStorage.getItem(key)).toBeNull();

    const { result } = renderHook(() => usePersistentState(key, initialState));

    expect(localStorage.getItem(key)).toEqual(JSON.stringify(initialState));

    const [, setState] = result.current;

    act(() => {
      setState({ name: 'Johnny Doe' });
    });
    const nextState = { ...initialState, name: 'Johnny Doe' };

    expect(result.current[0]).toEqual(nextState);
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(nextState));
  });

  it("should override the saved value from localStorage if it doesn't match the initialState shape", () => {
    localStorage.setItem(key, JSON.stringify({ foo: 'bar' }));
    const { rerender, result } = renderHook(() =>
      usePersistentState(key, initialState, { overrideDivergentSavedState: true }),
    );

    rerender();
    expect(result.current[0]).toEqual(initialState);
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(initialState));
  });

  it('should reset properties in the saved value from localStorage', () => {
    localStorage.setItem(
      key,
      JSON.stringify({
        ...initialState,
        lastLogin: '2023-01-01T00:00:00.000Z',
      }),
    );
    const { rerender, result } = renderHook(() =>
      usePersistentState(key, initialState, {
        resetProperties: { lastLogin },
      }),
    );

    rerender();

    expect(result.current[0]).toEqual(initialState);
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(initialState));
  });
});
