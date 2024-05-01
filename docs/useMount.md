# useMount

Run the callback after the component is mounted.

## Usage

```tsx
import React from 'react';
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
useMount(fn: () => void): void;
```
