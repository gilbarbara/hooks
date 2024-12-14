# useUnmount

Executes the provided callback when the component unmounts.  
This hook is useful for cleanup tasks like removing event listeners, canceling subscriptions, or clearing timers.

## Usage

```tsx
import { useUnmount } from '@gilbarbara/hooks';

function Component() {
  useUnmount(() => {
    console.log('Component unmounted');
    // Cleanup code here, e.g., removing event listeners or subscriptions
  });

  return <div>Some content...</div>;
}
```

## Reference

```typescript
useUnmount(callback: () => void): void;
```
