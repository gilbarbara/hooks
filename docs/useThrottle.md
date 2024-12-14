# useThrottle

Creates a throttled version of a function that limits how often the `callback` can be executed. The `callback` will be invoked at most once every `delayMs`.  

If `trailing` is set to `true`, the `callback` will also be called one final time when the timer expires.

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
