# useIntersectionObserver

Observes the visibility of an element on the viewport using the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API.

> The target parameter can be a `React.RefObject`, an `Element`, or a CSS selector.

## Usage

```tsx
import { useRef } from 'react';
import { useIntersectionObserver } from '@gilbarbara/hooks';

function Component() {
  const ref = useRef<HTMLElement>(null);
  const { isIntersecting } = useIntersectionObserver(ref);

  return (
    <div>
      Some content...
      <div ref={ref}>{isIntersecting ? 'Visible' : 'Hidden'}</div>
    </div>
  );
}
```

## Reference

```typescript
interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** Delay the response update. */
  delay?: number;
  /** Trigger the observer only once. */
  once?: boolean;
}

useIntersectionObserver<T extends Element>(
  target: React.RefObject<T> | T | null | string,
  options?: UseIntersectionObserverOptions,
): IntersectionObserverEntry;
```

> If you want to support legacy browsers, install the [intersection-observer](https://www.npmjs.com/package/intersection-observer) in your app.
