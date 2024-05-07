# useThrottle

Returns a function that invokes `callback` once per every `delayMs`.  
*If you set the `trailing` argument the callback will be called again when the timer runs out.*

## Usage

```tsx
import { useThrottle } from '@gilbarbara/hooks';

function Component() {
  const updater = () => console.log('updated');
 	const throttledUpdater = useThrottle(updater, 500);

  return (
    <button type="button" onClick={throttledUpdater}>
      Update
    </button>
  );
}
```

## Reference

```typescript
useThrottle(callback: () => void, delayMs: number = 500, trailing: boolean = false): () => void;
```
