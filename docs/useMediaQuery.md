# useMediaQuery

Detect media query changes.

## Usage

```tsx
import { useMediaQuery } from '@gilbarbara/hooks';

function Component() {
  const isLargeMobile = useMediaQuery('(min-width: 768px)');

  return (
    <div>
      {isLargeMobile ? 'Large' : 'Nope'}
    </div>
  );
}
```

## Reference

```typescript
useMediaQuery(query: string): boolean;
```
