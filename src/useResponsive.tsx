import { useCallback, useEffect, useState } from 'react';

import { canUseDOM, off, on } from './utils';

const defaultBreakpoints = { xs: 0, sm: 400, md: 768, lg: 1024, xl: 1280 };

export type Breakpoints = typeof defaultBreakpoints;

export type UseResponsiveOrientation = 'landscape' | 'portrait';

export interface UseResponsiveResult<T> {
  between(min: keyof T, max: keyof T, andOrientation?: UseResponsiveOrientation): boolean;
  max(breakpoint: keyof T, andOrientation?: UseResponsiveOrientation): boolean;
  min(breakpoint: keyof T, andOrientation?: UseResponsiveOrientation): boolean;
  orientation: UseResponsiveOrientation;
  size: keyof T;
}

function useResponsiveBase<T extends Record<string, number>>(
  breakpoints: T,
  initialWidth = Infinity,
  initialHeight = Infinity,
): UseResponsiveResult<T> {
  const sizes = Object.entries(breakpoints).sort(([, aSize], [, bSize]) => bSize - aSize);
  const smallestBreakpoint = sizes[sizes.length - 1];

  if (smallestBreakpoint[1] !== 0) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`The "${smallestBreakpoint[0]}" breakpoint should be 0`);
    }

    smallestBreakpoint[1] = 0;
  }

  const getScreen = useCallback((): UseResponsiveResult<T> => {
    const height = canUseDOM() ? window.innerHeight : initialHeight;
    const width = canUseDOM() ? window.innerWidth : initialWidth;
    const size = sizes.find(([, s]) => s <= width) || sizes[0];
    const orientation = width > height ? 'landscape' : 'portrait';

    return {
      between(min, max, andOrientation) {
        return (
          width >= breakpoints[min] &&
          width < breakpoints[max] &&
          (!andOrientation || andOrientation === orientation)
        );
      },
      min(breakpoint, andOrientation) {
        return (
          width >= breakpoints[breakpoint] && (!andOrientation || andOrientation === orientation)
        );
      },
      max(breakpoint, andOrientation) {
        return (
          width < breakpoints[breakpoint] && (!andOrientation || andOrientation === orientation)
        );
      },
      orientation,
      size: size[0] as keyof T,
    };
  }, [breakpoints, initialHeight, initialWidth, sizes]);

  const [screen, setScreen] = useState(getScreen());

  useEffect(() => {
    const onResize = () => {
      const current = getScreen();

      if (current.size !== screen.size || current.orientation !== screen.orientation) {
        setScreen(current);
      }
    };

    on(window, 'resize', onResize);

    return () => {
      off(window, 'resize', onResize);
    };
  }, [getScreen, screen, setScreen]);

  return screen;
}

export function useResponsive<T extends Record<string, number> | Breakpoints>(
  breakpoints?: T,
  initialWidth?: number,
  initialHeight?: number,
): UseResponsiveResult<T> {
  return useResponsiveBase(breakpoints || defaultBreakpoints, initialWidth, initialHeight);
}
