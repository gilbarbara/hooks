# @gilbarbara/hooks

[![npm version](https://badge.fury.io/js/%40gilbarbara%2Fhooks.svg)](https://badge.fury.io/js/%40gilbarbara%2Fhooks) [![CI](https://github.com/gilbarbara/hooks/actions/workflows/main.yml/badge.svg)](https://github.com/gilbarbara/hooks/actions/workflows/main.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=gilbarbara_hooks&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=gilbarbara_hooks) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=gilbarbara_hooks&metric=coverage)](https://sonarcloud.io/summary/new_code?id=gilbarbara_hooks)

A collection of React hooks designed to simplify state management, side effects, and UI interactions.

## Setup

```bash
npm i @gilbarbara/hooks
```

Requires React 16.8+ (Hooks support). TypeScript support is included.

## Features

- Built-in debouncing and throttling for smooth performance (`useDebounce`, `useThrottle`).
- Advanced state management (`useSetState`, `useToggle`, `useLocalStorageState`).
- Debugging tools to optimize re-renders (`useWhyDidYouUpdate`, `useRenderCount`).
- Flexible API integrations (`useFetch` with retries and backoff support).

## Example

Here's an example of using `useToggle`, `useThrottle`, and `useFetch` together:

```tsx
import { useToggle, useThrottle, useFetch } from '@gilbarbara/hooks';

function Component() {
  const [isEnabled, { toggle }] = useToggle(false);
  const throttledFetch = useThrottle(() => {
    fetch('/api/data');
  }, 1000);
  const { data, error } = useFetch('/api/data');

  return (
    <div>
      <button onClick={toggle}>{isEnabled ? 'Disable' : 'Enable'}</button>
      <button onClick={throttledFetch}>Fetch Data</button>
      {error ? <p>Error: {error.message}</p> : <p>Data: {JSON.stringify(data)}</p>}
    </div>
  );
}
```

## Hooks

### State

Hooks for managing and persisting application state.

[useSetState](docs/useSetState.md) — Returns a setState that merges object changes into the current state.  
[useToggle](docs/useToggle.md) — State hook to track the value of a boolean.  
[useLocalStorageState](docs/useLocalStorageState.md) — State hook that persists the state in localStorage.  

### Effects

Hooks for managing side effects and extending React’s useEffect.

[useDeepCompareEffect](docs/useDeepCompareEffect.md) — Uses deep comparisons of its dependencies.  
[useEffectOnce](docs/useEffectOnce.md) — Execute the effect only once.  
[useHasChanged](docs/useHasChanged.md) — Detect value changes and optionally trigger a callback.  
[useIsomorphicLayoutEffect](docs/useIsomorphicLayoutEffect.md) — Use useLayoutEffect on the client and useEffect on the server.  
[useUpdateEffect](docs/useUpdateEffect.md) — A custom useEffect that doesn’t run on mount.  

### Lifecycles

Hooks for managing component lifecycle events such as mounting and unmounting.

[useMount](docs/useMount.md) — Execute a callback when the component is mounted.  
[useUnmount](docs/useUnmount.md) — Execute a callback when the component is unmounted.  
[useLifecycles](docs/useLifecycles.md) — Execute callbacks during mount and unmount phases.  
[useIsMounted](docs/useIsMounted.md) — Check if the component is still mounted.  
[useIsFirstMount](docs/useIsFirstMount.md) — Check if it’s the first mount.  

### Refs and DOM

Hooks for managing refs and interacting with the DOM.

[useLatest](docs/useLatest.md) — Get a ref containing the most recent value.  
[useMergeRefs](docs/useMergeRefs.md) — Merge multiple refs into one.  
[usePrevious](docs/usePrevious.md) — Track the previous value of a variable.

### UI and Interactions

Hooks for managing user interactions and responsive design.

[useClickOutside](docs/useClickOutside.md) — Execute the callback when clicking outside the target element.
[useMediaQuery](docs/useMediaQuery.md) — Detect media query changes.  
[useIntersectionObserver](docs/useIntersectionObserver.md) — Detects the visibility of an element on the viewport using the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API.  
[useResizeObserver](docs/useResizeObserver.md) — Get element dimensions using the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API.  
[useMeasure](docs/useMeasure.md) — Get element dimensions using the ResizeObserver API.  
[useResponsive](docs/useResponsive.md) — Get responsive breakpoints for adaptive layouts.  
[useWindowSize](docs/useWindowSize.md) — Get the window dimensions. Updates on resize.  

### Performance and Optimization

Hooks for optimizing performance by reducing unnecessary renders or controlling execution frequency.

[useDebounce](docs/useDebounce.md) — Defer function execution until the delay has elapsed since the last invocation.  
[useThrottle](docs/useThrottle.md) — Return a throttled function that invokes fn once per every ms.  
[useThrottleValue](docs/useThrottleValue.md) — Return a throttled value that changes only once per every ms.  
[useStableValue](docs/useStableValue.md) — Get a stabilized value that only updates when the original value is truly different.

### Timers

Hooks for managing time-based operations.

[useInterval](docs/useInterval.md) — Execute the callback repeatedly with the specified delay.  
[useTimeout](docs/useTimeout.md) — Execute the callback after the specified delay.

### Data Fetching

Hooks for working with APIs and third-party scripts.

[useFetch](docs/useFetch.md) — Make a request with fetch. It supports dynamic URLs, caching, retries, and much more.  
[useScript](docs/useScript.md) — Dynamically load a script tag and append it to the document.body.


### Debugging and Development

Hooks for debugging, monitoring, and optimizing component behavior.

[useRenderCount](docs/useRenderCount.md) — Log how many times the component has rendered.  
[useWhyDidYouUpdate](docs/useWhyDidYouUpdate.md) — Detect which prop/state changes are causing a component to re-render.  
[useUpdate](docs/useUpdate.md) — Return a function that re-renders the component when called.

### Utilities
[useLocalStorage](docs/useLocalStorage.md) — Interact with the browser’s localStorage API.  
[useLocation](docs/useLocation.md) — Track the browser’s location.  
[useSingleton](docs/useSingleton.md) — Execute code just once before the component renders.

## License

MIT
