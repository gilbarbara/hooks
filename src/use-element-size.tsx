import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

export type UseElementRect = Omit<DOMRectReadOnly, 'toJSON'>;

const defaultState: UseElementRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export default function useElementSize(selector: string): UseElementRect {
  const [element, setElement] = useState<Element | null>();
  const [rect, setRect] = useState<UseElementRect>(defaultState);

  useEffect(() => {
    setElement(document.querySelector(selector));
  }, [selector]);

  const observer = useMemo(
    () =>
      new window.ResizeObserver(entries => {
        if (entries[0]) {
          const { bottom, height, left, right, top, width, x, y } = entries[0].contentRect;

          setRect({ x, y, width, height, top, left, bottom, right });
        }
      }),
    [],
  );

  useLayoutEffect(() => {
    if (!element) {
      return;
    }

    observer.observe(element);

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
    };
  }, [observer, element]);

  return rect;
}
