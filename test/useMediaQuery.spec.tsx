import { renderHook } from '@testing-library/react';

import matchMediaMock from './__fixtures__/matchMediaMock';

import { useMediaQuery } from '../src/useMediaQuery';

describe('useMediaQuery', () => {
  it('should return a boolean', () => {
    window.matchMedia = (query: string) => matchMediaMock(query, false);

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(result.current).toBe(false);

    // @ts-expect-error
    delete window.matchMedia;
  });
});
