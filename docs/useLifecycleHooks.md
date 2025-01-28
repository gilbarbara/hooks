# useLifecycleHooks


Executes the provided callbacks when the component mounts and unmounts, respectively.  
This hook is a convenient way to handle lifecycle-specific logic without explicitly managing `useEffect`.

## Usage

```tsx
import { useLifecycleHooks } from '@gilbarbara/hooks';

function Component() {
  useLifecycleHooks(
    () => { console.log('MOUNTED') },
    () => { console.log('UNMOUNTED') },
  );

  return <div>Some content...</div>;
}
```

## Reference

```typescript
useLifecycleHooks(mount: () => void, unmount: () => void): void;
```
