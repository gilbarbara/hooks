import { useState } from 'react';

import { defaultElementDimensions } from './defaults';
import { Target } from './types';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { useResizeObserver } from './useResizeObserver';
import { canUseDOM, getElement } from './utils';

export interface UseMeasureResult extends Omit<DOMRectReadOnly, 'toJSON'> {
  absoluteHeight: number;
  absoluteWidth: number;
}

function parseFloatValue(value: string) {
  const parsed = parseFloat(value);

  return Number.isNaN(parsed) ? 0 : parsed;
}

function getElementMeasure(element: Element | null): UseMeasureResult {
  if (!canUseDOM() || !element) {
    return defaultElementDimensions;
  }

  const { bottom, height, left, right, top, width, x, y } = element.getBoundingClientRect();

  const {
    borderBottom,
    borderLeft,
    borderRight,
    borderTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
  } = getComputedStyle(element);

  return {
    absoluteHeight:
      height -
      parseFloatValue(paddingTop) -
      parseFloatValue(paddingBottom) -
      parseFloatValue(borderTop) -
      parseFloatValue(borderBottom),
    absoluteWidth:
      width -
      parseFloatValue(paddingLeft) -
      parseFloatValue(paddingRight) -
      parseFloatValue(borderLeft) -
      parseFloatValue(borderRight),
    bottom,
    height,
    left,
    right,
    top,
    width,
    x,
    y,
  };
}

export function useMeasure<T extends Element>(target: Target<T>, debounce = 0): UseMeasureResult {
  const [element, setElement] = useState(getElement(target));
  const [dimensions, setDimensions] = useState<UseMeasureResult>(getElementMeasure(element));

  const entry = useResizeObserver(element, debounce);

  useIsomorphicLayoutEffect(() => {
    const nextElement = getElement(target);

    setElement(nextElement);
    setDimensions(getElementMeasure(nextElement));
  }, [target]);

  useIsomorphicLayoutEffect(() => {
    if (!entry) {
      return;
    }

    const { bottom, height, left, right, top, width, x, y } = entry.contentRect;
    const { blockSize, inlineSize } = entry.borderBoxSize[0];

    setDimensions({
      absoluteHeight: blockSize,
      absoluteWidth: inlineSize,
      bottom,
      height,
      left,
      right,
      top,
      width,
      x,
      y,
    });
  }, [entry]);

  return dimensions;
}
