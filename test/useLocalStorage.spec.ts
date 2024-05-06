import { act, renderHook } from '@testing-library/react';

import { useLocalStorage } from '../src/useLocalStorage';

describe('useLocalStorage', () => {
  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should retrieve an existing value from localStorage', () => {
    localStorage.setItem('foo', '"bar"');
    const { result } = renderHook(() => useLocalStorage('foo'));

    expect(result.current[0]).toEqual('bar');
  });

  it('should return initialValue if localStorage empty and set that to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('foo', 'bar'));

    expect(result.current[0]).toEqual('bar');
    expect(localStorage.foo).toEqual('"bar"');
  });

  it('should use existing value over initial state', () => {
    localStorage.setItem('foo', '"bar"');
    const { result } = renderHook(() => useLocalStorage('foo', 'baz'));

    expect(result.current[0]).toEqual('bar');
  });

  it('should not change the existing localStorage value with initialState', () => {
    localStorage.setItem('foo', '"bar"');
    const { result } = renderHook(() => useLocalStorage('foo', 'buzz'));

    expect(result.current[0]).toBe('bar');
    expect(localStorage.foo).toEqual('"bar"');
  });

  it('should update localStorage properly', () => {
    const { rerender, result } = renderHook(() => useLocalStorage('foo', 'bar'));

    act(() => {
      result.current[1]('baz');
    });
    rerender();

    expect(localStorage.foo).toEqual('"baz"');
  });

  it('should return undefined if no initialValue provided and localStorage empty', () => {
    const { result } = renderHook(() => useLocalStorage('some_key'));

    expect(result.current[0]).toBeUndefined();
  });

  it('should return and allows null setting', () => {
    localStorage.setItem('foo', 'null');
    const { rerender, result } = renderHook(() => useLocalStorage('foo'));
    const [state, setState] = result.current;

    act(() => setState(null));
    rerender();

    expect(state).toEqual(null);
    expect(result.current[0]).toEqual(null);
  });

  it('should set the initialState for an object', () => {
    renderHook(() => useLocalStorage('foo', { bar: true }));
    expect(localStorage.foo).toEqual('{"bar":true}');
  });

  it('should return the new value', () => {
    const { rerender, result } = renderHook(() => useLocalStorage('foo', 'bar'));

    act(() => {
      result.current[1]('baz');
    });

    rerender();

    expect(result.current[0]).toEqual('baz');
  });

  it('should reinitialize the state when key changes', () => {
    let key = 'foo';
    const { rerender, result } = renderHook(() => useLocalStorage(key, 'bar'));

    act(() => {
      result.current[1]('baz');
    });
    key = 'bar';
    rerender();

    expect(result.current[0]).toEqual('bar');
  });

  it('should parse objects from localStorage', () => {
    localStorage.setItem('foo', JSON.stringify({ ok: true }));

    const { result } = renderHook(() => useLocalStorage<{ ok: boolean }>('foo'));

    expect(result.current[0]).toEqual({ ok: true });
  });

  it('should initialize properly with objects', () => {
    const { result } = renderHook(() => useLocalStorage<{ ok: boolean }>('foo', { ok: true }));

    expect(result.current[0]?.ok).toBe(true);
  });

  it('should safely sets objects to localStorage', () => {
    const { rerender, result } = renderHook(() =>
      useLocalStorage<{ ok: any }>('foo', { ok: true }),
    );

    act(() => {
      result.current[1]({ ok: false });
    });
    rerender();

    expect(result.current[0]?.ok).toBe(false);
  });

  it('should return objects from updates', () => {
    const { rerender, result } = renderHook(() =>
      useLocalStorage<{ ok: any }>('foo', { ok: true }),
    );

    act(() => {
      result.current[1]({ ok: false });
    });
    rerender();

    const [state] = result.current;

    expect(state).toBeInstanceOf(Object);
    expect(state?.ok).toBe(false);
  });

  it('should set localStorage with the function updater', () => {
    const { rerender, result } = renderHook(() =>
      useLocalStorage<{ fizz?: string; foo: string }>('foo', { foo: 'bar' }),
    );

    act(() => {
      result.current[1](state => ({ ...state!, fizz: 'buzz' }));
    });
    rerender();

    const [state] = result.current;

    expect(state?.foo).toEqual('bar');
    expect(state?.fizz).toEqual('buzz');
  });

  it('should throw with nullish or undefined keys', () => {
    let error: any;

    try {
      renderHook(() => {
        try {
          /* @ts-expect-error */
          useLocalStorage(null);
        } catch (error_) {
          error = error_;
        }
      });
    } catch (error_) {
      error = error_;
    }

    expect(error).toEqual(new Error('useLocalStorage: "key" is required'));
  });

  it('should memoize an object between re-renders', () => {
    const { rerender, result } = renderHook(() => useLocalStorage('foo', { ok: true }));

    (() => {
      return result.current; // if localStorage isn't set then r1 and r2 will be different
    })();

    rerender();
    const [r2] = result.current;

    rerender();
    const [r3] = result.current;

    expect(r2).toBe(r3);
  });

  it('should memoize an object immediately if localStorage is already set', () => {
    localStorage.setItem('foo', JSON.stringify({ ok: true }));
    const { rerender, result } = renderHook(() => useLocalStorage('foo', { ok: true }));

    const [r1] = result.current; // if localStorage isn't set then r1 and r2 will be different

    rerender();
    const [r2] = result.current;

    expect(r1).toBe(r2);
  });

  it('should memoize the setState function', () => {
    localStorage.setItem('foo', JSON.stringify({ ok: true }));
    const { rerender, result } = renderHook(() => useLocalStorage('foo', { ok: true }));
    const [, s1] = result.current;

    rerender();
    const [, s2] = result.current;

    expect(s1).toBe(s2);
  });

  it('should handle setState with undefined', () => {
    const { result } = renderHook(() => useLocalStorage('foo', { ok: true }));

    expect(result.current[0]).toEqual({ ok: true });

    act(() => {
      result.current[1](undefined);
    });

    expect(result.current[0]).toEqual({ ok: true });
  });

  it('should handle custom serializer', () => {
    const { result } = renderHook(() =>
      useLocalStorage(
        'foo',
        { ok: true },
        { raw: false, deserializer: JSON.parse, serializer: JSON.stringify },
      ),
    );

    act(() => {
      result.current[1]({ ok: false });
    });

    expect(result.current[0]).toEqual({ ok: false });
  });

  it('should default to JSON.stringify if the custom serializer is missing', () => {
    const { result } = renderHook(() =>
      useLocalStorage(
        'foo',
        { ok: true },
        // @ts-expect-error - testing missing serializer
        { raw: false, deserializer: JSON.parse, serializer: null },
      ),
    );

    act(() => {
      result.current[1]({ ok: false });
    });

    expect(result.current[0]).toEqual({ ok: false });
  });

  it('should remove from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('foo', { ok: true }));

    expect(localStorage.getItem('foo')).toBe('{"ok":true}');

    act(() => {
      result.current[2]();
    });

    expect(localStorage.getItem('foo')).toBe(null);
  });

  describe('With Options: raw', () => {
    it('should return a string when localStorage is a stringified object', () => {
      localStorage.setItem('foo', JSON.stringify({ fizz: 'buzz' }));
      const { result } = renderHook(() => useLocalStorage('foo', null, { raw: true }));
      const [foo] = result.current;

      expect(typeof foo).toBe('string');
    });

    it('should return a string after an update', () => {
      localStorage.setItem('foo', JSON.stringify({ fizz: 'buzz' }));
      const { rerender, result } = renderHook(() => useLocalStorage('foo', null, { raw: true }));

      const [, setFoo] = result.current;

      act(() => setFoo({ fizz: 'bang' } as any));
      rerender();

      const [foo] = result.current;

      expect(typeof foo).toBe('string');

      expect(JSON.parse(foo!)).toBeInstanceOf(Object);

      // expect(JSON.parse(foo!).fizz).toEqual('bang');
    });

    it('should force setState to a string', () => {
      localStorage.setItem('foo', JSON.stringify({ fizz: 'buzz' }));
      const { rerender, result } = renderHook(() => useLocalStorage('foo', null, { raw: true }));

      act(() => {
        /* @ts-expect-error - we're testing the raw option */
        result.current[1]({ fizz: 'bang' });
      });
      rerender();

      expect(JSON.parse(result.current[0]!).fizz).toEqual('bang');
    });
  });
});
