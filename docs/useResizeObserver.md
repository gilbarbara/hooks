# useResizeObserver

Detect changes in an Element dimensions using the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API.  
Returns a `ResizeObserverEntry`.

## Usage

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

## Reference

```typescript
useResizeObserver<T extends Element>(
  target: RefObject<T> | T | null | string,
  debounce: number = 0,
): ResizeObserverEntry
```

> This hook uses a [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver), so if you want to support
legacy browsers, install the [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill) in your app.
