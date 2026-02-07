# useMount

Executes the provided callback when the component mounts, equivalent to `useEffect` with an empty dependency array.

> If you need the callback to run exactly once even in StrictMode, use `useEffectOnce` instead.

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
