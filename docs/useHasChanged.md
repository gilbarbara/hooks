# useHasChanged

Tracks whether a given value has changed and optionally executes a callback when a change is detected.

> The returned value is `undefined` on the initial render.

## Usage

```tsx
import { useHasChanged } from '@gilbarbara/hooks';

function Component({ value }: { value: number }) {
  const [hasChanged, previousValue] = useHasChanged(value, (previous) => {
    console.log(`Value changed from ${previous} to ${value}`);
  });

  return (
    <div>
      {hasChanged ? `Changed! Previous: ${previousValue}` : 'No Change'}
    </div>
  );
}
```

## Reference

```typescript
useHasChanged<T>(
  value: T,
  callback?: (previous: T) => void
): [hasChanged: boolean, previous: T | undefined];
```
