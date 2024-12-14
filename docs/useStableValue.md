# useStableValue

Provides a stable reference to a value, ensuring it only updates when the original value genuinely changes.

> Prevents unnecessary renders or re-computations when passing non-primitive values like objects, arrays, or functions as dependencies to React hooks like useEffect, useMemo, or useCallback.

## Usage

```tsx
import { useMemo } from 'react';
import { useStableValue } from '@gilbarbara/hooks';

interface Props {
  items: string[];
}

function Component({ items }: Props) {
  const stableItems = useStableValue(items);
  // The stableItems will only change when the items really change.
  
  const content = useMemo(() => {
    return stableItems.map((item) => <div key={item}>{item}</div>);
  }, [stableItems]);

  return <div>{content}</div>;
}
```

## Reference

```typescript
useStableValue<T = any>(value: T): T;
```
