# useWindowSize

Get the window dimensions. Updates on resize.  

## Usage

```tsx
import { useWindowSize } from '@gilbarbara/hooks';

function Component() {
  const { width } = useWindowSize();

  return <div>{width >= 1024 ? 'Large Screen' : 'Small Screen'}</div>;
}
```

## Reference

```typescript
interface UseWindowSizeResult {
  height: number;
  width: number;
}

useWindowSize(debounce?: number): UseWindowSizeResult;
```
