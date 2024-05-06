# useEffectOnce

Run the effect only once.

## Usage


```tsx
import { useEffectOnce } from '@gilbarbara/hooks';

function Component() {
  useEffectOnce(() => {
    console.log('Running effect once on mount')

    return () => {
      console.log('Running clean-up of effect on unmount')
    }
  });

  return null;
}
```

## Reference

```typescript
useEffectOnce(effect: EffectCallback): void;
```
