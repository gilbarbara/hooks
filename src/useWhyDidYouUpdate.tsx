import { useEffect, useRef, useState } from 'react';

import { PlainObject } from './types';
import { isString } from './utils';

export type UseWhyDidYouUpdateResult<T> = {
  [K in keyof T]?: {
    from: any;
    to: any;
  };
};

export interface UseWhyDidYouUpdateOptions {
  name?: string;
  skipLog?: boolean;
}

export function useWhyDidYouUpdate<T extends PlainObject<any>>(
  props: T,
  nameOrOptions: string | UseWhyDidYouUpdateOptions = {},
): UseWhyDidYouUpdateResult<T> | false {
  type K = keyof T;

  const [changes, setChanges] = useState<UseWhyDidYouUpdateResult<T>>({});
  const previousProps = useRef<T>();

  const { name, skipLog = false } = isString(nameOrOptions)
    ? { name: nameOrOptions }
    : nameOrOptions;

  useEffect(() => {
    const { current } = previousProps;

    setChanges({});

    if (current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...current, ...props }) as K[];

      // Use this object to keep track of changed props
      const changesObject: UseWhyDidYouUpdateResult<T> = {};

      // Iterate through keys
      allKeys.forEach(key => {
        if (current[key] !== props[key]) {
          changesObject[key] = {
            from: current[key],
            to: props[key],
          };
        }
      });

      // If changesObj not empty then output to console
      if (Object.keys(changesObject).length) {
        setChanges(changesObject);

        if (!skipLog) {
          const nameToken = name ? `: ${name}` : '';

          console.log(`[why-did-you-update${nameToken}]`, changesObject); // eslint-disable-line no-console
        }
      }
    }

    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  }, [name, props, skipLog]);

  return Object.keys(changes).length ? changes : false;
}
