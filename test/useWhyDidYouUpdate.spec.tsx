import { renderHook } from '@testing-library/react';

import { useWhyDidYouUpdate } from '../src/useWhyDidYouUpdate';

describe('useWhyDidYouUpdate', () => {
  beforeAll(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should return the changes', () => {
    const { rerender, result } = renderHook(
      (props: Record<string, any>) => useWhyDidYouUpdate(props, { skipLog: true }),
      {
        initialProps: {
          version: 1,
        },
      },
    );

    expect(result.current).toBeFalse();

    rerender({ version: 2 });
    expect(result.current).toEqual({
      version: { from: 1, to: 2 },
    });

    rerender({ version: 2 });
    expect(result.current).toBeFalse();
  });

  it('should log the changes', () => {
    const { rerender, result } = renderHook(
      (props: Record<string, any>) => useWhyDidYouUpdate(props),
      {
        initialProps: {
          version: 1,
        },
      },
    );

    expect(console.log).toHaveBeenCalledTimes(0);

    rerender({ version: 2 });

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenLastCalledWith('[why-did-you-update]', {
      version: { from: 1, to: 2 },
    });

    rerender({ version: 2 });
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it('should log the changes with `name`', () => {
    const { rerender, result } = renderHook(
      (props: Record<string, any>) => useWhyDidYouUpdate(props, { name: 'Component' }),
      {
        initialProps: {
          version: 1,
        },
      },
    );

    expect(console.log).toHaveBeenCalledTimes(0);

    rerender({ version: 2 });

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenLastCalledWith('[why-did-you-update: Component]', {
      version: { from: 1, to: 2 },
    });
  });
});
