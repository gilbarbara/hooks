# useDeepCompareEffect
A custom `useEffect` hook that uses deep comparison on its dependencies instead of reference equality.  
This is useful when dealing with objects or arrays as dependencies, where changes in their values should trigger the effect, even if the reference remains the same.

> Deep comparisons can be expensive for large or deeply nested dependencies. Ensure this hook is necessary before using it.
> 
> For more details on `useEffect`, refer to the [React documentation](https://react.dev/reference/react/useEffect).

## Usage

```tsx
import { useState } from 'react';
import { useDeepCompareEffect } from '@gilbarbara/hooks';

function Component(props: { options: { step: number } }) {
  const { options } = props;
  const [count, setCount] = useState(0);

  useDeepCompareEffect(() => {
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
useDeepCompareEffect<TDeps extends React.DependencyList>(
  effect: React.EffectCallback,
  dependencies: TDeps,
): void;
```
