# useMeasure
Get element measurements using the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API.

## Usage

```tsx
import React from 'react';
import { useMeasure } from '@gilbarbara/hooks';

function Component() {
  const ref = React.useRef<HTMLDivElement>(null);
  const dimensions = useMeasure(ref);

  return (
    <div ref={ref}>
      {JSON.stringify(dimensions, undefined, 2)}
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
  target: RefObject<T> | T | null | string,
  debounce = 0,
): UseMeasureResult;
```

> This hook uses a [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver), so if you want to support
legacy browsers, install the [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill) in your app.
