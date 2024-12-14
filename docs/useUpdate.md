# useUpdate

Provides a function to manually trigger a re-render of the component.  
This hook is useful for scenarios where a component needs to re-render without directly changing its state.

> Use this hook for re-rendering only. For managing data, use proper state management tools.

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
