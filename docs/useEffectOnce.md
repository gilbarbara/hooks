# useEffectOnce

Executes the provided effect once, similar to `useEffect` with an empty dependency array.  
Ideal for running initialization logic like API calls or subscriptions.

> For more details on `useEffect`, refer to the [React documentation](https://react.dev/reference/react/useEffect).

## Usage

```tsx
import { useEffectOnce } from '@gilbarbara/hooks';

function Component() {
  useEffectOnce(() => {
    // Runs only once when the component mounts
    console.log('Running effect once on mount')

    return () => {
      // Runs when the component unmounts
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
