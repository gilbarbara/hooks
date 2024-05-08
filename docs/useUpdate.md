# useUpdate

Returns a function that re-renders the component when called.

## Usage

```tsx
import { useUpdate } from '@gilbarbara/hooks';

function Component() {
  const update = useUpdate();
  
  return (
    <>
      <div>Time: {Date.now()}</div>
      <button onClick={update}>Update</button>
    </>
  );
}
```

## Reference

```typescript
useUpdate(): () => void;
```
