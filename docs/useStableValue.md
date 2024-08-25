# useStableValue

Get a stabilized value that only changes when the original is truly different.
Useful for non-primitive values such as objects, arrays or functions.

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
