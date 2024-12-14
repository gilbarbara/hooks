# useMergeRefs

Merges multiple refs into a single `ref`, allowing multiple references to a single DOM element or component.  
This hook is useful when you need to combine refs for different purposes, such as observing dimensions, handling events, or controlling component state.

> Don't mutate the `current` property directly. This hook is intended for read-only access to the latest value.

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
useMergeRefs<T>(...refs: React.Ref<T>[]): React.RefCallback<T>
```
