import { useEffect, useState } from 'react';

import { Target } from './types';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { useResizeObserver } from './useResizeObserver';
import { getElement } from './utils';

export type ElementSize = Omit<DOMRectReadOnly, 'toJSON'> & {
  blockSize: number;
  inlineSize: number;
};

const defaultState: ElementSize = {
  blockSize: 0,
  bottom: 0,
  height: 0,
  inlineSize: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
};

export function useElementSize<T extends Element>(target: Target<T>, debounce = 0): ElementSize {
  const [element, setElement] = useState<Element | null>(null);
  const [dimensions, setDimensions] = useState<ElementSize>(defaultState);

  const entry = useResizeObserver(element, debounce);

  useEffect(() => {
    const targetElement = getElement(target);

    if (!targetElement) {
      return;
    }

    setElement(targetElement);
  }, [target]);

  useIsomorphicLayoutEffect(() => {
    if (!entry) {
      return;
    }

    const { bottom, height, left, right, top, width, x, y } = entry.contentRect;
    const { blockSize, inlineSize } = entry.borderBoxSize[0];

    setDimensions({ blockSize, bottom, height, inlineSize, left, right, top, width, x, y });
  }, [entry]);

  return dimensions;
}
