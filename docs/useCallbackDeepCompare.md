# useCallbackDeepCompare

A custom `useCallback` hook that uses deep comparison on its dependencies instead of reference equality.  
This is useful when dealing with objects or arrays as dependencies, where changes in their values should trigger the effect, even if the reference remains the same.

> Deep comparisons can be expensive for large or deeply nested dependencies. Ensure this hook is necessary before using it.
> 
> For more details on `useCallback`, refer to the [React documentation](https://react.dev/reference/react/useCallback).

## Usage

```tsx
import { useState } from 'react';
import { useCallbackDeepCompare } from '@gilbarbara/hooks';

function Component(props: { options: { step: number } }) {
  const { options } = props;
  const [count, setCount] = useState(0);

  const increment = useCallbackDeepCompare(() => {
    setCount(s => s + options.step);
  }, [options]);

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <p>useCallbackDeepCompare: {count}</p>
    </div>
  );
}
```

## Reference

```typescript
useCallbackDeepCompare<T extends (...arguments: any[]) => any>(
  callback: T,
  dependencies: React.DependencyList,
): void;
```
