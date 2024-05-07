# @gilbarbara/hooks

[![npm version](https://badge.fury.io/js/%40gilbarbara%2Fhooks.svg)](https://badge.fury.io/js/%40gilbarbara%2Fhooks) [![CI](https://github.com/gilbarbara/hooks/actions/workflows/main.yml/badge.svg)](https://github.com/gilbarbara/hooks/actions/workflows/main.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=gilbarbara_hooks&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=gilbarbara_hooks) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=gilbarbara_hooks&metric=coverage)](https://sonarcloud.io/summary/new_code?id=gilbarbara_hooks)

Useful React hooks.

## Setup

```bash
npm i @gilbarbara/hooks
```

## Hooks

#### Sensors

[useIntersectionObserver](docs/useIntersectionObserver.md) — Detects the visibility of an element on the viewport using the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API.  
[useLocation](docs/useLocation.md) — Track the browser's location.  
[useMeasure](docs/useMeasure.md) — Get element dimensions using the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API.  
[useMediaQuery](docs/useMediaQuery.md) — Detect media query changes.  
[useResizeObserver](docs/useResizeObserver.md) — Detect changes in an Element dimensions using the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API.  
[useWindowSize](docs/useWindowSize.md) — Get the window dimensions. Updates on resize.

#### UI

[useClickOutside](docs/useClickOutside.md) — Execute the callback when clicking outside the target element.  
[useResponsive](docs/useResponsive.md) — Get responsive breakpoints.

#### Timers

[useInterval](docs/useInterval.md) — Execute the callback repeatedly with the specified delay.  
[useTimeout](docs/useTimeout.md) — Execute the callback after the specified delay.

#### Side-effects

[useDebounce](docs/useDebounce.md) — Defer function execution until the delay has elapsed since the last invocation.  
[useLocalStorage](docs/useLocalStorage.md) — Interact with the browser localStorage API.  
[useScript](docs/useScript.md) — Create a script tag and append it to the `document.body`.  
[useThrottle](docs/useThrottle.md) — Return a throttled function that only invokes `fn` once per every `ms`.  
[useThrottleValue](docs/useThrottleValue.md) — Return a throttled value that only changes once per every `ms`.  

#### Lifecycles

[useDeepCompareEffect](docs/useDeepCompareEffect.md) — Uses deep comparison on its dependencies.  
[useEffectOnce](docs/useEffectOnce.md) — Run the effect only once.  
[useIsFirstMount](docs/useIsFirstMount.md) — Check if it's the first mount.  
[useIsMounted](docs/useIsMounted.md) — Check if the component is still mounted.  
[useIsomorphicLayoutEffect](docs/useIsomorphicLayoutEffect.md) — Returns `useLayoutEffect` in the client or `useEffect` on the server.  
[useLifecycles](docs/useLifecycles.md) — Run the callbacks when the component mounts and unmounts, respectively.  
[useMount](docs/useMount.md) — Run the callback after the component is mounted.  
[useUnmount](docs/useUnmount.md) — Run the callback when the component unmounts.  
[useUpdateEffect](docs/useUpdateEffect.md) — Doesn't run on mount.  

#### State

[useLocalStorageState](docs/useLocalStorageState.md) — State hook that persists the state in localStorage.  
[useSetState](docs/useSetState.md) — Returns a setState that merges object changes into the current state.  
[useToggle](docs/useToggle.md) — State hook to track the value of a boolean.

#### Misc

[useFetch](docs/useFetch.md) — Make a request with fetch. It supports retries, backoff, and more.  
[useLatest](docs/useLatest.md) — Get a ref with the most recent value.  
[useMergeRefs](docs/useMergeRefs.md) — Merge multiple refs into one.  
[usePrevious](docs/usePrevious.md) — Return the previous value.  
[useRenderCount](docs/useRenderCount.md) — Log how many times the component was rendered.  
[useSingleton](docs/useSingleton.md) — Run the code just once before the render.  
[useUpdate](docs/useUpdate.md) — Returns a function that re-renders the component when called.  
[useWhyDidYouUpdate](docs/useWhyDidYouUpdate.md) — Get which prop/state changes are causing a component to re-render.

## License

MIT
