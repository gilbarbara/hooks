# useEffectOnce

Run an effect only once.

## Usage


```tsx
import React from 'react';
import { useEffectOnce } from '@gilbarbara/hooks';

function Component() {
  const [value, setValue] = React.useState(0);

  useEffectOnce(() => {
    setValue(1);
  });

  return <div data-testid="main">{value}</div>;
}
```

## Reference

```typescript
useEffectOnce(effect: EffectCallback): void
```
