# useWindowSize

Tracks the current dimensions of the browser window and updates on resize.  
This hook is useful for building responsive components and layouts.

## Usage

```tsx
import { useWindowSize } from '@gilbarbara/hooks';

function Component() {
  const { width } = useWindowSize();

  return <div>{width >= 1024 ? 'Large Screen' : 'Small Screen'}</div>;
}
```

**Triggering Animations on Resize**

```tsx
import { useWindowSize } from '@gilbarbara/hooks';

function Component() {
  const { width } = useWindowSize(100);

  return (
    <div style={{ transition: 'background-color 0.5s', backgroundColor: width > 768 ? 'lightblue' : 'lightcoral' }}>
      Resize the window to see the background color change!
    </div>
  );
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
