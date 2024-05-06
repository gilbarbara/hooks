# useDeepCompareEffect
A custom `useEffect` hook that uses deep comparison on its dependencies instead of reference equality.

## Usage

```tsx
import { useState } from 'react';
import { useDeepCompareEffect } from '@gilbarbara/hooks';

function Component() {
  const options = { step: 2 };
  const [count, setCount] = useState(0);
  
  useEffectOnce(() => {
    setCount(s => s + options.step);
  }, [options]);

  return (
    <div>
      useDeepCompareEffect: {count}
    </div>
  );
}
```

## Reference

```typescript
useDeepCompareEffect<TDeps extends DependencyList>(
  effect: EffectCallback,
  dependencies: TDeps,
)
```
