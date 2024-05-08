# useLifecycles

Run the callbacks when the component mounts and unmounts, respectively.

## Usage

```tsx
import { useLifecycles } from '@gilbarbara/hooks';

function Component() {
  useLifecycles(
    () => { console.log('MOUNTED') },
    () => { console.log('UNMOUNTED') },
  );

  return <div>Some content...</div>;
}
```

## Reference

```typescript
useLifecycles(mount: () => void, unmount: () => void): void;
```
