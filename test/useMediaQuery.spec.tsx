import { renderHook, waitFor } from '@testing-library/react';

import { useMediaQuery } from '../src/useMediaQuery';

import matchMediaMock from './__fixtures__/matchMediaMock';

describe('useMediaQuery', () => {
  const matches = false;

  beforeAll(() => {
    window.matchMedia = (query: string) => matchMediaMock(query, matches);
  });

  afterAll(() => {
    // @ts-expect-error
    delete window.matchMedia;
  });

  it('should return a boolean', async () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });
});
