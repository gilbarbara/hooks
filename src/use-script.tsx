import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { canUseDOM, isString } from './utils';

interface UseScriptOptions {
  async?: boolean;
  defer?: boolean;
  id?: string;
  type?: string;
}

export default function useScript(
  src: string,
  idOrOptions: string | UseScriptOptions = {},
): [loaded: boolean, error: boolean] {
  const options = useMemo(() => (isString(idOrOptions) ? { id: idOrOptions } : idOrOptions), [
    idOrOptions,
  ]);
  const script = useRef<HTMLScriptElement>();
  const [state, setState] = useState({
    loaded: false,
    error: false,
  });

  const onLoad = useCallback(() => {
    setState({
      loaded: true,
      error: false,
    });
  }, []);

  const onError = useCallback(() => {
    /* istanbul ignore else */
    if (script.current) {
      script.current.remove();
    }

    setState({
      loaded: false,
      error: true,
    });
  }, []);

  useEffect(
    () => {
      if (!canUseDOM || script.current) {
        return undefined;
      }

      const element = document.createElement('script');

      element.async = options.async ?? true;
      element.defer = options.defer ?? false;
      element.type = options.type || 'text/javascript';
      element.id = options.id || src;
      element.src = src;

      script.current = element;

      const { current } = script;

      current.addEventListener('load', onLoad);
      current.addEventListener('error', onError);

      // Add script to document body
      document.body.appendChild(current);

      return () => {
        current.removeEventListener('load', onLoad);
        current.removeEventListener('error', onError);
      };
    },
    [onError, onLoad, options, src], // Only re-run effect if script src changes
  );

  return [state.loaded, state.error];
}
