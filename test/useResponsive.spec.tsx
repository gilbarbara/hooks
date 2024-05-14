import { act, renderHook } from '@testing-library/react';

import { useResponsive } from '../src/useResponsive';

declare let window: any;

describe('useResponsive', () => {
  const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe('min', () => {
    it.each([
      { width: 320, min: 'xs', orientation: 'portrait', expected: true },
      { width: 320, min: 'xs', orientation: 'landscape', expected: false },
      { width: 400, min: 'sm', orientation: 'portrait', expected: true },
      { width: 400, min: 'sm', orientation: 'landscape', expected: false },
      { width: 768, min: 'md', orientation: 'portrait', expected: true },
      { width: 768, min: 'md', orientation: 'landscape', expected: false },
      { width: 1024, min: 'lg', orientation: 'portrait', expected: false },
      { width: 1024, min: 'lg', orientation: 'landscape', expected: true },
      { width: 1280, min: 'xl', orientation: 'portrait', expected: false },
      { width: 1280, min: 'xl', orientation: 'landscape', expected: true },
    ] as const)(
      'should render properly for $width with $min and $orientation',
      ({ expected, min, orientation, width }) => {
        window.innerWidth = width;

        const { result } = renderHook(() => useResponsive());

        expect(result.current.min(min, orientation)).toBe(expected);
      },
    );
  });

  describe('max', () => {
    it.each([
      { width: 360, max: 'sm', expected: true },
      { width: 568, max: 'sm', expected: false },
      { width: 568, max: 'md', expected: true },
      { width: 800, max: 'md', expected: false },
      { width: 800, max: 'lg', expected: true },
      { width: 1100, max: 'lg', expected: false },
      { width: 1100, max: 'xl', expected: true },
      { width: 1280, max: 'xl', expected: false },
    ] as const)('should render properly for $width with $max', ({ expected, max, width }) => {
      window.innerWidth = width;

      const { result } = renderHook(() => useResponsive());

      expect(result.current.max(max)).toBe(expected);
    });
  });

  describe('between', () => {
    it.each([
      { width: 320, min: 'xs', max: 'sm', expected: true },
      { width: 400, min: 'sm', max: 'md', expected: true },
      { width: 568, min: 'sm', max: 'md', expected: true },
      { width: 768, min: 'md', max: 'lg', expected: true },
      { width: 1024, min: 'lg', max: 'xl', expected: true },
    ] as const)(
      'should render properly for $width between $min/$max',
      ({ expected, max, min, width }) => {
        window.innerWidth = width;

        const { result } = renderHook(() => useResponsive());

        expect(result.current.between(min, max)).toBe(expected);
      },
    );
  });

  describe('custom breakpoints', () => {
    const breakpoints = {
      small: 320,
      medium: 700,
      large: 1200,
    };

    it.each([
      { width: 320, min: 'small', max: 'medium', expected: true },
      { width: 568, min: 'small', max: 'medium', expected: true },
      { width: 768, min: 'medium', max: 'large', expected: true },
      { width: 1024, min: 'medium', max: 'large', expected: true },
      { width: 1280, min: 'medium', max: 'large', expected: false },
    ] as const)(
      'should render properly for $width between $min/$max',
      ({ expected, max, min, width }) => {
        window.innerWidth = width;

        const { result } = renderHook(() => useResponsive(breakpoints));

        expect(result.current.between(min, max)).toBe(expected);
        expect(spy).toHaveBeenCalledWith('The "small" breakpoint should be 0');
      },
    );
  });

  describe('resize', () => {
    beforeAll(() => {
      window.innerWidth = 1024;
    });

    it('should update the matcher with a window.resize', async () => {
      const { rerender, result } = renderHook(() => useResponsive());

      expect(result.current.size).toBe('lg');

      await act(async () => {
        window.innerWidth = 768;
        window.dispatchEvent(new Event('resize'));
      });

      rerender();

      expect(result.current.size).toBe('md');
    });
  });
});
