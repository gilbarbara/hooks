# @gilbarbara/hooks

[![npm version](https://badge.fury.io/js/%40gilbarbara%2Fhooks.svg)](https://badge.fury.io/js/%40gilbarbara%2Fhooks) [![build status](https://travis-ci.com/gilbarbara/hooks.svg)](https://travis-ci.com/gilbarbara/hooks) [![Maintainability](https://api.codeclimate.com/v1/badges/0bface079acbe392459c/maintainability)](https://codeclimate.com/github/gilbarbara/hooks/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/0bface079acbe392459c/test_coverage)](https://codeclimate.com/github/gilbarbara/hooks/test_coverage)

Collection of useful React hooks

## Setup

```bash
npm i @gilbarbara/hooks
```

## Hooks

### useFetch
Make a request with fetch.  
Returns an object with  `data`, `error` and `status`.

```typescript
import React from 'react';
import { useFetch } from '@gilbarbara/hooks';

function Component() {
  const { data, error, status } = useFetch(
    'https://api.github.com/search/repositories?q=react&sort=stars',
    true // you can delay the request until something finishes
  );

  return (
    <div>
      {status === 'failure' && <p>{error?.toString()}</p>}
      {status === 'success' && <p>{data}</p>}
      {status === 'running' && <p>Loading</p>}
    </div>
  );
};
```

**Reference**

```typescript
type FetchStatus = 'idle' | 'running' | 'success' | 'failure';

interface useFetchOptions {
  headers?: PlainObject;
  method?: string;
  mode?: 'cors' | 'navigate' | 'no-cors' | 'same-origin';
  body?: BodyInit;
  type?: 'json' | 'urlencoded';
  url: string;
}

useFetch(urlOrOptions: string | useFetchOptions, wait = false);
```

### useRenderCount
Log how many times the component was rendered.   
Useful to debug optimizations.

```typescript
import React from 'react';
import { useRenderCount } from '@gilbarbara/hooks';

function Component() {
  useRenderCount()

  return (
    <div>Something</div>
  );
};
```

**Reference**

```typescript
useScript(name?: string);
```

### useResponsive
Get responsive breakpoints

```typescript
import React from 'react';
import { useResponsive } from '@gilbarbara/hooks';

function Component() {
  const { between, min, max, orientation, size } = useResponsive();

  return (
    <div>
      {max('sm', 'landscape') && <h1>Extra Small</h1>}
      {between('sm', 'lg') && <h1>Small to Large</h1>}
      <p>Extra Small {min('xs') ? '✔' : '✖️'}</p>
      <p>Small {min('sm') ? '✔' : '✖️'}</p>
      <p>Medium {min('md') ? '✔' : '✖️'}</p>
      <p>Large {min('lg') ? '✔' : '✖️'}</p>
      <p>Extra Large {min('xl') ? '✔' : '✖️'}</p>
      <footer>
        {size} - {orientation}
      </footer>
    </div>
  );
}
```

**Reference**

```typescript
const defaultBreakpoints = { xs: 0, sm: 400, md: 768, lg: 1024, xl: 1280 };

interface Responsive<T> {
  between(min: keyof T, max: keyof T, andOrientation?: Orientation): boolean;
  min(breakpoint: keyof T, andOrientation?: Orientation): boolean;
  max(breakpoint: keyof T, andOrientation?: Orientation): boolean;
  orientation: Orientation;
  size: keyof T;
}

useResponsive<T extends Record<string, number> | typeof defaultBreakpoints>(
  breakpoints?: T,
  initialWidth = Infinity,
  initialHeight = Infinity
): Responsive<T>;
```

### useScript
Create a script tag and append it to the `document.body`.  
Returns an array with `loaded` and `error` properties.

```typescript
import React from 'react';
import { useScript } from '@gilbarbara/hooks';

function Component() {
  const [loaded, error] = useScript(
    'https://maps.googleapis.com/maps/api/js?key=Ab2S23Bd&callback=initMap',
    'google-maps'
  );

  return (
    <div>
      {loaded && <div id="maps"/>}
      {error && <span>error</span>}
    </div>
  );
};
```

**Reference**

```typescript
interface UseScriptOptions {
  async?: boolean;
  defer?: boolean;
  id?: string;
  type?: string;
}

useScript(src: string, idOrOptions: string | UseScriptOptions = {});
```

### useSingleton
Run the code just once, before the render.  
Similar to constructors in classes.

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import { useSingleton } from '@gilbarbara/hooks';

function Component() {
  const node = React.useRef<HTMLElement | null>(null);

  useSingleton(() => {
    // this code will only be executed once.
    node.current = document.createElement('div');
    node.current.id = 'MyPortal';

    document.body.appendChild(node.current);
  });

  return node.current ? ReactDOM.createPortal(<div>Portal</div>, node.current) : null;
}
```

**Reference**

```typescript
useSingleton(cb: () => void);
```


### useThrottle
Return a throttled function that only invokes `fn` once per every `ms`.  
*Unless you set the `trailing` option that will call it again when the timer runs out.*

```typescript
import React from 'react';
import { useThrottle } from '@gilbarbara/hooks';

function Component() {
  const updater = () => console.log('updated');
 	const throttledUpdater = useThrottle(updater, 500);

  return (
    <button type="button" onClick={throttledUpdater}>
      Update
    </button>
  );
}
```

**Reference**

```typescript
interface UseThrottleOptions {
  leading?: boolean; // default: true
  trailing?: boolean; // default: false
}

useThrottle(fn: () => void, ms = 500, options?: UseThrottleOptions):
```



### useThrottleValue
Return a throttled value that only changes once per every `ms`.  
*Unless you set the `trailing` option that will call it again when the timer runs out.*

```typescript
import React, { useCallback, useEffect, useState } from 'react';
import { useThrottleValue } from '@gilbarbara/hooks';

function Component() {
  const [text, setText] = useState('');
  const throttledText = useThrottleValue(text, 500, options);

  const updater = (value) => console.log(value);
  
  useEffect(() => {
    throttledText && updater(throttledText);
  }, [throttledText]);

  return (
    <div>
      <input type="text" onChange={e => setText(e.target.value)} />
      <p>Actual value: {text}</p>
      <p>Throttle value: {throttledText}</p>
    </div>
  );
};
```

**Reference**

```typescript
interface UseThrottleOptions {
  leading?: boolean; // default: true
  trailing?: boolean; // default: false
}

useThrottleValue(value: string, ms = 500, options?: UseThrottleOptions):
```

### useWhyDidYouUpdate
Get which prop changes are causing a component to re-render.

```typescript
const Component = (props: any) => {
  const changes = useWhyDidYouUpdate(props, { skipLog: true });
  // Or just log the changes
  // useWhyDidYouUpdate(props, 'Component');

  return <div>{!!changes && JSON.stringify(changes, null, 2)}</div>;
};
```

**Reference**

```typescript
type PlainObject<T = unknown> = Record<string | number | symbol, T>;

interface UseWhyDidYouUpdateOptions {
  name?: string;
  skipLog?: boolean;
}

useWhyDidYouUpdate<T extends PlainObject>(
  props: T,
  nameOrOptions: string | UseWhyDidYouUpdateOptions = {},
);
```
## License

MIT
