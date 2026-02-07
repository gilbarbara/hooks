# useEffectOnce

Executes the provided effect exactly once, even in React's StrictMode.
Uses a ref guard to bypass StrictMode's double-invocation in development mode.

> If you want standard `useEffect` behavior with an empty dependency array (StrictMode-compatible), use `useEffect` directly or `useMount`/`useUnmount`.

## Usage

```tsx
import { useEffectOnce } from '@gilbarbara/hooks';

function Component() {
  useEffectOnce(() => {
    // Runs exactly once, even in StrictMode
    console.log('Running effect once on mount')

    return () => {
      // Cleanup runs once on unmount
      // ⚠️ In StrictMode dev mode, this fires during the simulated
      // unmount and will NOT fire on the actual unmount.
      console.log('Running clean-up of effect on unmount')
    }
  });

  return null;
}
```

## Reference

```typescript
useEffectOnce(effect: React.EffectCallback): void;
```
