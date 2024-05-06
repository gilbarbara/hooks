# useMergeRefs

Merge multiple refs into one.

## Usage

```tsx
import { useRef } from 'react';
import { UseMeasure, useMergeRefs, useResizeObserver } from '@gilbarbara/hooks';

function Component() {
  const observerRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);
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
useMergeRefs<T>(...refs: Ref<T>[]): React.RefCallback<T>
```
