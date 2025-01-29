# useMemoizedValue

Provides a memoized reference to a value, ensuring it only updates when the original value genuinely changes.

> Prevents unnecessary renders or re-computations when passing non-primitive values like objects, arrays, or functions as dependencies to React hooks like useEffect, useMemo, or useCallback.

## Usage

```tsx
import { useMemo } from 'react';
import { useMemoizedValue } from '@gilbarbara/hooks';

interface Props {
  items: string[];
}

function Component({ items }: Props) {
  const memoizedItems = useMemoizedValue(items);
  // The memoizedItems will only change when the items really change.
  
  const content = useMemo(() => {
    return memoizedItems.map((item) => <div key={item}>{item}</div>);
  }, [memoizedItems]);

  return <div>{content}</div>;
}
```

## Reference

```typescript
useMemoizedValue<T = any>(value: T): T;
```
