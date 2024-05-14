# useRenderCount

Log how many times the component was rendered.   
Useful to debug optimizations.

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

## Reference

```typescript
useRenderCount(name?: string): number;
```
