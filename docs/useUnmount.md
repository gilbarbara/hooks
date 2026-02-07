# useUnmount

Executes the provided callback when the component unmounts, equivalent to `useEffect` cleanup with an empty dependency array.
Always uses the latest version of the callback.

> If you need the cleanup to fire exactly once even in StrictMode, use `useEffectOnce` instead.

## Usage

```tsx
import { useUnmount } from '@gilbarbara/hooks';

function Component() {
  useUnmount(() => {
    console.log('Component unmounted');
  });

  return <div>Some content...</div>;
}
```

## Reference

```typescript
useUnmount(callback: () => void): void;
```
