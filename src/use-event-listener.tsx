import { useEffect, useRef, MutableRefObject } from 'react';

type Handler = (e: Event) => void;

export default function useEventListener(
  eventName: string,
  handler: Handler,
  element: Window | Document | HTMLElement = window,
) {
  const savedHandler: MutableRefObject<null | Handler> = useRef(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const { current } = savedHandler;
    const eventListener = (event: Event) => {
      /* istanbul ignore else */
      if (current) {
        current!(event);
      }
    };

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [element, eventName]);
}
