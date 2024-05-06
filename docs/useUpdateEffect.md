# useUpdateEffect

An effect hook that doesn't run on mount.

## Usage

```tsx
import { useEffect, useState } from 'react';
import { useUpdateEffect } from '@gilbarbara/hooks';

function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useUpdateEffect(() => {
    console.log('count', count) // it will only log count 1 and above
  });

  return <div>Count: {count}</div>
}
```

## Reference

```typescript
useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void;
```
