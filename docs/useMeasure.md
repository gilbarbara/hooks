# useMeasure

A hook for measuring element dimensions using the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API.  
Automatically updates measurements whenever the element's size changes.

> The absoluteHeight and absoluteWidth properties include padding and border, while height and width do not.

## Usage

```tsx
import { useRef } from 'react';
import { useMeasure } from '@gilbarbara/hooks';

function Component() {
  const ref = useRef<HTMLDivElement>(null);
  const dimensions = useMeasure(ref);

  return (
    <div ref={ref}>
      {JSON.stringify(dimensions, null, 2)}
    </div>
  );
}
```

## Reference

```typescript
interface UseMeasureResult extends Omit<DOMRectReadOnly, 'toJSON'> {
  absoluteHeight: number;
  absoluteWidth: number;
}

useMeasure<T extends Element>(
  // Can be a ref, DOM element, or a CSS selector string.
  target: React.RefObject<T> | T | null | string,
  // Optional debounce delay in milliseconds. Helps optimize performance by reducing frequent updates during rapid size changes..
  debounce = 0,
): UseMeasureResult;
```

> This hook uses a [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver), so if you want to support
legacy browsers, install the [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill) in your app.
