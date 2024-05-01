# useElementSize
Get element dimensions using the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API.   
Returns an `ElementSize` object.

## Usage

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

## Reference

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
