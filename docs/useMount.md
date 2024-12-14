# useMount

Executes the provided effect once, similar to `useEffect` with an empty dependency array.
Ideal for running initialization logic like API calls or subscriptions.

> For more details on `useEffect`, refer to the [React documentation](https://react.dev/reference/react/useEffect).

## Usage

```tsx
import { useMount } from '@gilbarbara/hooks';

function Component() {
  useMount(() => {
    pageView('Home');
  });

  return <div>Some content...</div>;
}
```

## Reference

```typescript
useMount(callback: () => void):void;
```
