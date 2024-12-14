# useResizeObserver

Detect changes in an Element dimensions using the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API.

## Usage

```tsx
import { useRef } from 'react';
import { useResizeObserver } from '@gilbarbara/hooks';

function Component() {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useResizeObserver(ref);

  console.log(entry?.contentRect.width);

  return <div ref={ref}>Some content...</div>;
}
```

## Reference

```typescript
useResizeObserver<T extends Element>(
  target: React.RefObject<T> | T | null | string,
  debounce: number = 0,
): ResizeObserverEntry;
```

> If you want to support
legacy browsers, install the [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill) in your app.
