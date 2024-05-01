# @gilbarbara/hooks

[![npm version](https://badge.fury.io/js/%40gilbarbara%2Fhooks.svg)](https://badge.fury.io/js/%40gilbarbara%2Fhooks) [![CI](https://github.com/gilbarbara/hooks/actions/workflows/main.yml/badge.svg)](https://github.com/gilbarbara/hooks/actions/workflows/main.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/0bface079acbe392459c/maintainability)](https://codeclimate.com/github/gilbarbara/hooks/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/0bface079acbe392459c/test_coverage)](https://codeclimate.com/github/gilbarbara/hooks/test_coverage)

Useful React hooks.

## Setup

```bash
npm i @gilbarbara/hooks
```

## Hooks


[useClickOutside](docs/useClickOutside.md) — Handle clicks outside a specific DOM element.
[useEffectOnce](docs/useEffectOnce.md) — Run an effect only once.
[useElementSize](docs/useElementSize.md) — Get element dimensions using the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API.
[useFetch](docs/useFetch.md) — Make a request with fetch.
[useIntersectionObserver](docs/useIntersectionObserver.md) — Detects the visibility of an element on the viewport using the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API.
[useIsFirstRun](docs/useIsFirstRun.md) — Detect if it is the first execution.
[useIsMounted](docs/useIsMounted.md) — Check if the component is still mounted before changing the state.
[useIsomorphicLayoutEffect](docs/useIsomorphicLayoutEffect.md) — Returns `useLayoutEffect` in the client or `useEffect` on the server.
[useLatest](docs/useLatest.md) — Get a ref with the most recent value.
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
