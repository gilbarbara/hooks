import { useMemo, useState } from 'react';

import { Target } from './types';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { useResizeObserver } from './useResizeObserver';
import { getElement } from './utils';

export interface ElementSize {
  height: number;
  innerHeight: number;
  innerWidth: number;
  width: number;
}

function parseFloatValue(value: string) {
  const parsed = parseFloat(value);

  return Number.isNaN(parsed) ? 0 : parsed;
}

function getElementSize(element: Element | null): ElementSize {
  if (!element) {
    return {
      height: 0,
      innerHeight: 0,
      innerWidth: 0,
      width: 0,
    };
  }

  const {
    borderBottom,
    borderLeft,
    borderRight,
    borderTop,
    height,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    width,
  } = getComputedStyle(element);

  return {
    height: parseFloatValue(height),
    innerHeight:
      parseFloatValue(height) -
      parseFloatValue(paddingTop) -
      parseFloatValue(paddingBottom) -
      parseFloatValue(borderTop) -
      parseFloatValue(borderBottom),
    innerWidth:
      parseFloatValue(width) -
      parseFloatValue(paddingLeft) -
      parseFloatValue(paddingRight) -
      parseFloatValue(borderLeft) -
      parseFloatValue(borderRight),
    width: parseFloatValue(width),
  };
}

export function useElementSize<T extends Element>(target: Target<T>, debounce = 0): ElementSize {
  const element = useMemo(() => getElement(target), [target]);
  const [dimensions, setDimensions] = useState<ElementSize>(getElementSize(element));

  const entry = useResizeObserver(element, debounce);

  useIsomorphicLayoutEffect(() => {
    if (!entry) {
      return;
    }

    const { height, width } = entry.contentRect;
    const { blockSize, inlineSize } = entry.borderBoxSize[0];

    setDimensions({ height: blockSize, innerHeight: height, innerWidth: width, width: inlineSize });
  }, [entry]);

  return dimensions;
}
