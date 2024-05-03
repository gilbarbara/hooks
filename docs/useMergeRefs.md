# useMergeRefs

Merge multiple refs into one.  
Returns a `React.RefCallback`.

## Usage

```tsx
import React from 'react';
import { UseMeasure, useMergeRefs, useResizeObserver } from '@gilbarbara/hooks';

function Component() {
  const observerRef = React.useRef<HTMLDivElement>(null);
  const sizeRef = React.useRef<HTMLDivElement>(null);
  const ref = useMergeRefs(observerRef, sizeRef);
  const dimensions = UseMeasure(sizeRef, 200);

  useResizeObserver(observerRef, entry => console.log(entry), 200);

  return (
    <div ref={ref}>
      <pre>{JSON.stringify(dimensions, null, 2)}</pre>
    </div>
  );
}
```

## Reference

```typescript
useMergeRefs<T>(...refs: Ref<T>[]): RefCallback<T>
```
