# useIntersectionObserver

Detects the visibility of an element on the viewport using the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API.  
Returns an `IntersectionObserverEntry`.

## Usage

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

## Reference

```typescript
interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** Delay the response update. */
  delay?: number;
  /** Trigger the observer only once. */
  once?: boolean;
}

useIntersectionObserver<T extends Element>(
  target: RefObject<T> | T | null | string,
  options?: UseIntersectionObserverOptions,
): IntersectionObserverEntry
```
