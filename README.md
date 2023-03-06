# @gilbarbara/hooks

[![npm version](https://badge.fury.io/js/%40gilbarbara%2Fhooks.svg)](https://badge.fury.io/js/%40gilbarbara%2Fhooks) [![CI](https://github.com/gilbarbara/hooks/actions/workflows/main.yml/badge.svg)](https://github.com/gilbarbara/hooks/actions/workflows/main.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/0bface079acbe392459c/maintainability)](https://codeclimate.com/github/gilbarbara/hooks/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/0bface079acbe392459c/test_coverage)](https://codeclimate.com/github/gilbarbara/hooks/test_coverage)

Useful React hooks.

## Setup

```bash
npm i @gilbarbara/hooks
```

## Hooks

| Name                                                    | Description                                                  |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| [useClickOutside](#useclickoutside)                     | Handle clicks outside a specific DOM element.                |
| [useEffectOnce](#useeffectonce)                         | Run an effect only once.                                     |
| [useElementSize](#useelementsize)                       | Get element dimensions using the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API. |
| [useFetch](#usefetch)                                   | Make a request with fetch.                                   |
| [useIntersectionObserver](#useintersectionobserver)     | Detects the visibility of an element on the viewport using the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API. |
| [useIsMounted](#useismounted)                           | Check if the component is still mounted before changing the state. |
| [useIsomorphicLayoutEffect](#useisomorphiclayouteffect) | Returns `useLayoutEffect` in the client or `useEffect` on the server. |
| [useLatest](#uselatest)                                 | Get a ref with the most recent value.                        |
| [useMediaQuery](#usemediaquery)                         | Detect media query changes.                                  |
| [useMergeRefs](#usemergerefs)                           | Merge multiple refs into one.                                |
| [useMount](#usemount)                                   | Run a function after the component is mounted.               |
| [useRenderCount](#userendercount)                       | Log how many times the component was rendered.               |
| [useResizeObserver](#useresizeobserver)                 | Detect changes in an Element dimensions using the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API. |
| [useResponsive](#useresponsive)                         | Get responsive breakpoints.                                  |
| [useScript](#usescript)                                 | Create a script tag and append it to the `document.body`.    |
| [useSingleton](#usesingleton)                           | Run the code just once before the render.                    |
| [useThrottle](#usethrottle)                             | Return a throttled function that only invokes `fn` once per every `ms`. |
| [useThrottleValue](#usethrottlevalue)                   | Return a throttled value that only changes once per every `ms`. |
| [useWhyDidYouUpdate](#usewhydidyouupdate)               | Get which prop changes are causing a component to re-render. |
| [useWindowSize](#usewindowsize)                         | Get the window dimensions. Updates on resize.                |

## API

### useClickOutside

Handle clicks outside a specific DOM element.

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
useClickOutside(ref: RefObject<HTMLElement>, callback: () => void): void
```

### useEffectOnce
Run an effect only once.

```tsx
import React from 'react';
import { useEffectOnce } from '@gilbarbara/hooks';

function Component() {
  const [value, setValue] = React.useState(0);

  useEffectOnce(() => {
    setValue(1);
  });

  return <div data-testid="main">{value}</div>;
}
```

**Reference**

```typescript
useEffectOnce(effect: EffectCallback): void
```

### useElementSize
Get element dimensions using the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API.   
Returns an `ElementSize` object.

```tsx
import React from 'react';
import { useElementSize } from '@gilbarbara/hooks';

function Component() {
  const ref = React.useRef<HTMLDivElement>(null);
  const dimensions = useElementSize(ref);

  return (
    <div ref={ref}>
      {JSON.stringify(dimensions, undefined, 2)}
    </div>
  );
}
```

**Reference**

```typescript
interface ElementSize {
  height: number;
  innerHeight: number;
  innerWidth: number;
  width: number;
}

useElementSize<T extends Element>(
  target: RefObject<T> | T | null | string,
  debounce = 0,
): ElementSize;
```

> This hook uses a [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver), so if you want to support
legacy browsers, install the [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill) in your app.


### useFetch
Make a request with fetch.  
Returns an object with  `data`, `error`,  and `status`.

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

interface UseFetchResponse<T> {
  data?: T;
  error?: ResponseError;
  status: FetchStatus;
}

useFetch<T = unknown>(urlOrOptions: string | UseFetchOptions, wait = false): UseFetchResponse<T>;
```

### useIntersectionObserver
Detects the visibility of an element on the viewport using the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API.  
Returns an `IntersectionObserverEntry`.

```tsx
import React from 'react';
import { useIntersectionObserver } from '@gilbarbara/hooks';

function Component() {
  const ref = React.useRef<HTMLElement>(null);
  const { isIntersecting } = useIntersectionObserver(ref);

  return (
    <div>
      Some content...
      <div ref={ref}>{isIntersecting ? 'Visible' : 'Hidden'}
    </div>
  );
}
```

**Reference**

```typescript
interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /**
   * Trigger the observer only once.
   */
  once?: boolean;
}

useIntersectionObserver<T extends Element>(
  target: RefObject<T> | T | null | string,
  options?: UseIntersectionObserverOptions,
): IntersectionObserverEntry
```

### useIsMounted
Check if the component is still mounted before changing the state.  
Returns a `() => boolean`.

```tsx
import React from 'react';
import { useIsMounted } from '@gilbarbara/hooks';

function Component() {
  const [data, setData] = React.useState('loading...');
  const isMounted = useIsMounted();

  React.useEffect(() => {
    asyncFn(`...`).then(() => {
      if (isMounted()) {
        setData('ready');
      }
    });
  }, [isMounted]);

  return <div>{data}</div>;
}
```

**Reference**

```typescript
useIsMounted(): () => boolean;
```

### useIsomorphicLayoutEffect
Returns `useLayoutEffect` in the client or `useEffect` on the server.

```tsx
import React from 'react';
import { useIsomorphicLayoutEffect } from '@gilbarbara/hooks';

function Component() {
  useIsomorphicLayoutEffect(() => {
    // effect code
  }, []);

  return (
    <div>Something, something...</div>
  );
}
```

**Reference**

```typescript
useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;
```

### useLatest
Get a ref with the most recent value.  
Returns a `React.MutableRefObject` with the same type as the input.

```tsx
import React from 'react';
import { useLatest } from '@gilbarbara/hooks';

function Component({
  callback,
  element,
  name,
}: {
  callback: (e: Event) => void;
  element: HTMLElement;
  name: string;
}) {
  const callbackRef = useLatest(callback);
  const elementRef = useLatest(element);

  React.useEffect(() => {
    const currentElement = elementRef.current;
    const listen = (e: Event) => callbackRef.current(e);

    currentElement.addEventListener(name, listen);

    return () => currentElement.removeEventListener(name, listen);
  }, [name]);
  // The ESLint "react-hooks/exhaustive-deps" will warn about the refs
  // being required in dependencies, but the refs are stable, so they
  // won't trigger an update.

  return <div>Something, something...</div>;
}
```

**Reference**

```typescript
useLatest<T>(value: T): React.MutableRefObject<T>;
```

### useMediaQuery
Detect media query changes.  
Returns a `boolean`.

```tsx
import React from 'react';
import { useMediaQuery } from '@gilbarbara/hooks';

function Component() {
  const isLargeMobile = useMediaQuery('(min-width: 768px)');

  return (
    <div>
      {isLargeMobile ? 'Large' : 'Nope'}
    </div>
  );
}
```

**Reference**

```typescript
useMediaQuery(query: string): boolean;
```

### useMergeRefs
Merge multiple refs into one.  
Returns a `React.RefCallback`.

```tsx
import React from 'react';
import { useElementSize, useMergeRefs, useResizeObserver } from '@gilbarbara/hooks';

function Component() {
  const observerRef = React.useRef<HTMLDivElement>(null);
  const sizeRef = React.useRef<HTMLDivElement>(null);
  const ref = useMergeRefs(observerRef, sizeRef);
  const dimensions = useElementSize(sizeRef, 200);

  useResizeObserver(observerRef, entry => console.log(entry), 200);

  return (
    <div ref={ref}>
      <pre>{JSON.stringify(dimensions, null, 2)}</pre>
    </div>
  );
}
```

**Reference**

```typescript
useMergeRefs<T>(...refs: Ref<T>[]): RefCallback<T>
```

### useMount
Run a function after the component is mounted.

```tsx
import React from 'react';
import { useMount } from '@gilbarbara/hooks';

function Component() {
  useMount(() => {
    pageView('Home');
  });

  return <div>Some content...</div>;
}
```

**Reference**

```typescript
useMount(fn: () => void): void;
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

### useResizeObserver
Detect changes in an Element dimensions using the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API.  
Returns a `ResizeObserverEntry`.

```tsx
import React from 'react';
import { useResizeObserver } from '@gilbarbara/hooks';

function Component() {
  const ref = React.useRef<HTMLDivElement>(null);
  const entry = useResizeObserver(ref);

  console.log(entry?.contentRect.width);

  return <div ref={ref}>Some content...</div>;
}
```

**Reference**

```typescript
useResizeObserver<T extends Element>(
  target: RefObject<T> | T | null | string,
  debounce: number = 0,
): ResizeObserverEntry
```

> This hook uses a [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver), so if you want to support
legacy browsers, install the [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill) in your app.


### useResponsive

Get responsive breakpoints.  
Returns a `Responsive<T>` object.

```tsx
import React from 'react';
import { useResponsive } from '@gilbarbara/hooks';

function Component() {
  const { between, min, max, orientation, size } = useResponsive();

  return (
    <div>
      {max('sm', 'landscape') && <h1>Extra Small</h1>}
      {between('sm', 'lg') && <h1>Between small and large</h1>}
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
Run the code just once before the render.  
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

### useWindowSize
Get the window dimensions. Updates on resize.  
Returns a `WindowSize` object.

```tsx
import React from 'react';
import { useWindowSize } from '@gilbarbara/hooks';

function Component() {
  const { width } = useWindowSize();

  return <div>{width >= 1024 ? 'Large Screen' : 'Small Screen'}</div>;
}
```

**Reference**

```typescript
interface WindowSize {
  height: number;
  width: number;
}

useWindowSize(debounce?: number): WindowSize;
```

## License

MIT
