import { useEffect, useState } from 'react';

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

const defaultState: ElementSize = {
  height: 0,
  innerHeight: 0,
  innerWidth: 0,
  width: 0,
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

    const { height, width } = entry.contentRect;
    const { blockSize, inlineSize } = entry.borderBoxSize[0];

    setDimensions({ height: blockSize, innerHeight: height, innerWidth: width, width: inlineSize });
  }, [entry]);

  return dimensions;
}
