# useMediaQuery

Detect media query changes.  
Returns a `boolean`.

## Usage

```tsx
import React from 'react';
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
