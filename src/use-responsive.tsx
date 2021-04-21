import { useCallback, useEffect, useState } from 'react';

import { canUseDOM } from './utils';

const defaultBreakpoints = { xs: 0, sm: 400, md: 768, lg: 1024, xl: 1280 };

export type Breakpoints = typeof defaultBreakpoints;

export type Orientation = 'landscape' | 'portrait';

export interface Responsive<T> {
  between(min: keyof T, max: keyof T, andOrientation?: Orientation): boolean;
  max(breakpoint: keyof T, andOrientation?: Orientation): boolean;
  min(breakpoint: keyof T, andOrientation?: Orientation): boolean;
  orientation: Orientation;
  size: keyof T;
}

function useResponsiveBase<T extends Record<string, number>>(
  breakpoints: T,
  initialWidth = Infinity,
  initialHeight = Infinity,
): Responsive<T> {
  const sizes = Object.entries(breakpoints).sort(([, aSize], [, bSize]) => bSize - aSize);
  const smallestBreakpoint = sizes[sizes.length - 1];

  if (smallestBreakpoint[1] !== 0) {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`The "${smallestBreakpoint[0]}" breakpoint should be 0`);
    }

    smallestBreakpoint[1] = 0;
  }

  const getScreen = useCallback((): Responsive<T> => {
    const height = canUseDOM ? window.innerHeight : initialHeight;
    const width = canUseDOM ? window.innerWidth : initialWidth;
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

      /* istanbul ignore else */
      if (current.size !== screen.size || current.orientation !== screen.orientation) {
        setScreen(current);
      }
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [getScreen, screen, setScreen]);

  return screen;
}

export default function useResponsive<T extends Record<string, number> | Breakpoints>(
  breakpoints?: T,
  initialWidth?: number,
  initialHeight?: number,
): Responsive<T> {
  return useResponsiveBase(breakpoints || defaultBreakpoints, initialWidth, initialHeight);
}
