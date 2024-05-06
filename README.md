# @gilbarbara/hooks

[![npm version](https://badge.fury.io/js/%40gilbarbara%2Fhooks.svg)](https://badge.fury.io/js/%40gilbarbara%2Fhooks) [![CI](https://github.com/gilbarbara/hooks/actions/workflows/main.yml/badge.svg)](https://github.com/gilbarbara/hooks/actions/workflows/main.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=gilbarbara_hooks&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=gilbarbara_hooks) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=gilbarbara_hooks&metric=coverage)](https://sonarcloud.io/summary/new_code?id=gilbarbara_hooks)

Useful React hooks.

## Setup

```bash
npm i @gilbarbara/hooks
```

## Hooks


[useClickOutside](docs/useClickOutside.md) — Execute the callback when clicking outside the target element.
[useDeepCompareEffect](docs/useDeepCompareEffect.md) — A custom useEffect hook that uses deep comparison on its dependencies.
[useEffectOnce](docs/useEffectOnce.md) — Run an effect only once.
[useFetch](docs/useFetch.md) — Make a request with fetch. It supports retries, backoff, and more.
[useIntersectionObserver](docs/useIntersectionObserver.md) — Detects the visibility of an element on the viewport using the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API.
[useIsFirstRun](docs/useIsFirstRun.md) — Detect if it is the first execution.
[useIsMounted](docs/useIsMounted.md) — Check if the component is still mounted before changing the state.
[useIsomorphicLayoutEffect](docs/useIsomorphicLayoutEffect.md) — Returns `useLayoutEffect` in the client or `useEffect` on the server.
[useLatest](docs/useLatest.md) — Get a ref with the most recent value.
[useMeasure](docs/useMeasure.md) — Get element dimensions using the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API.
[useMediaQuery](docs/useMediaQuery.md) — Detect media query changes.
[useMergeRefs](docs/useMergeRefs.md) — Merge multiple refs into one.
[useMount](docs/useMount.md) — Run a function after the component is mounted.
[usePrevious](docs/usePrevious.md) — Return the previous value.
[useRenderCount](docs/useRenderCount.md) — Log how many times the component was rendered.
[useResizeObserver](docs/useResizeObserver.md) — Detect changes in an Element dimensions using the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API.
[useResponsive](docs/useResponsive.md) — Get responsive breakpoints.
[useScript](docs/useScript.md) — Create a script tag and append it to the `document.body`.
[useSingleton](docs/useSingleton.md) — Run the code just once before the render.
[useThrottle](docs/useThrottle.md) — Return a throttled function that only invokes `fn` once per every `ms`.
[useThrottleValue](docs/useThrottleValue.md) — Return a throttled value that only changes once per every `ms`.
[useUnmount](docs/useUnmount.md) — Run a function when the component unmounts.
[useWhyDidYouUpdate](docs/useWhyDidYouUpdate.md) — Get which prop changes are causing a component to re-render.
[useWindowSize](docs/useWindowSize.md) — Get the window dimensions. Updates on resize.

## License

MIT
