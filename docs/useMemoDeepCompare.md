# useMemoDeepCompare

A custom `useMemo` hook that uses deep comparison on its dependencies instead of reference equality.  
This is useful when dealing with objects or arrays as dependencies, where changes in their values should trigger the effect, even if the reference remains the same.

> Deep comparisons can be expensive for large or deeply nested dependencies. Ensure this hook is necessary before using it.
> 
> For more details on `useMemo`, refer to the [React documentation](https://react.dev/reference/react/useMemo).

## Usage

```tsx
import { useState } from 'react';
import { useMemoDeepCompare } from '@gilbarbara/hooks';

function Component(props: { options: { step: number } }) {
  const { options } = props;
  const [count, setCount] = useState(0);

  // Memoize the computed next count based on deeply compared options
  const nextCount = useMemoDeepCompare(() => count + options.step, [options, count]);

  return (
    <div>
      <button onClick={() => setCount(nextCount)}>Increment</button>
      <p>useMemoDeepCompare: {count}</p>
    </div>
  );
}
```

## Reference

```typescript
useMemoDeepCompare<T>(
  factory: () => T,
  dependencies: React.DependencyList,
): void;
```
