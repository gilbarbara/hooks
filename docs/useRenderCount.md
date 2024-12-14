# useRenderCount

Tracks and logs the number of times a component has rendered.  
This hook is helpful for debugging performance optimizations or identifying unnecessary renders.

## Usage

```tsx
import { useRenderCount } from '@gilbarbara/hooks';

function Component() {
  useRenderCount();

  return (
    <div>Something</div>
  );
}
```

**Debugging a component’s render behavior**

```tsx
import { useRenderCount } from '@gilbarbara/hooks';

function DebugComponent() {
  const count = useRenderCount('DebugComponent');

  return (
    <div>
      <p>This component has rendered {count} times.</p>
    </div>
  );
}
```

**Comparing render counts in Parent and Child components**

```tsx
import { useRenderCount } from '@gilbarbara/hooks';

function Parent() {
  useRenderCount('Parent');

  return (
    <div>
      <h1>Parent Component</h1>
      <Child />
    </div>
  );
}

function Child() {
  const count = useRenderCount('Child');

  return <p>Child has rendered {count} times.</p>;
}
```

## Reference

```typescript
useRenderCount(name?: string): number;
```
