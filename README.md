# @gilbarbara/hooks

[![npm version](https://badge.fury.io/js/%40gilbarbara%2Fhooks.svg)](https://badge.fury.io/js/%40gilbarbara%2Fhooks) [![CI](https://github.com/gilbarbara/hooks/actions/workflows/main.yml/badge.svg)](https://github.com/gilbarbara/hooks/actions/workflows/main.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/0bface079acbe392459c/maintainability)](https://codeclimate.com/github/gilbarbara/hooks/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/0bface079acbe392459c/test_coverage)](https://codeclimate.com/github/gilbarbara/hooks/test_coverage)

Useful React hooks

## Setup

```bash
npm i @gilbarbara/hooks
```

## Hooks

### useClickOutside
Handles click events outside a specific DOM element.

```tsx
import React from 'react';
import { useClickOutside } from '@gilbarbara/hooks';

function Component() {
  const ref = React.useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => {
    console.log('clicked outside');
  });

  return (
    <div ref={ref}>
      <button type="submit">Send</button>
      <button type="button">Reset</button>
    </div>
  );
}
```

**Reference**

```typescript
useClickOutside(ref: RefObject<HTMLElement>, callback: () => void)
```

### useElementSize
Get element dimensions using a CSS selector.  
Returns a Rect object.

```tsx
import React from 'react';
import { useElementSize } from '@gilbarbara/hooks';

function Component() {
  const rect = useElementSize('.test');

  return (
    <div className="test">
      {JSON.stringify(rect, undefined, 2)}
    </div>
  );
}
```

**Reference**

```typescript
interface UseElementRect {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

useElementSize(selector: string);
```

> This hook uses a [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver), so if you want to support
legacy browsers, install the [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill) in your app.


### useFetch
Make a request with fetch.  
Returns an object with  `data`, `error` and `status`.

```tsx
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
}
```

**Reference**

```typescript
type FetchStatus = 'idle' | 'running' | 'success' | 'failure';

interface UseFetchOptions {
  headers?: PlainObject;
  method?: string;
  mode?: 'cors' | 'navigate' | 'no-cors' | 'same-origin';
  body?: BodyInit;
  type?: 'json' | 'urlencoded';
  url: string;
}

useFetch(urlOrOptions: string | UseFetchOptions, wait = false);
```

### useRenderCount
Log how many times the component was rendered.   
Useful to debug optimizations.

```tsx
import React from 'react';
import { useRenderCount } from '@gilbarbara/hooks';

function Component() {
  useRenderCount()

  return (
    <div>Something</div>
  );
}
```

**Reference**

```typescript
useRenderCount(name?: string);
```

### useResize
Execute the callback on mount and when the window is resized.

```tsx
import React from 'react';
import { useResize } from '@gilbarbara/hooks';

function Component() {
  const [isLarge, setLarge] = useState(false);
  
  useResize(width => {
    setLarge(width >= 1024);
  });

  return <div>{isLarge ? 'Large Screen' : 'Small Screen'}</div>;
}
```

**Reference**

```typescript
type Callback = (width: number) => void;

interface UseResizeOptions {
  callback?: Callback;
  debounce?: number;
}

export function useResize(callbackOrOptions: Callback | UseResizeOptions): void
```

### useResponsive

Get responsive breakpoints

```tsx
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

```tsx
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
}
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

```tsx
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

```tsx
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

```tsx
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
}
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

```tsx
function Component(props: any) {
  const changes = useWhyDidYouUpdate(props, { skipLog: true });
  // Or just log the changes
  // useWhyDidYouUpdate(props, 'Component');

  return <div>{!!changes && JSON.stringify(changes, null, 2)}</div>;
}
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
