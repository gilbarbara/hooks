# useClickOutside

Handle clicks outside a specific DOM element.

## Usage

```tsx
import React from 'react';
import { useClickOutside } from '@gilbarbara/hooks';

function Component() {
  const ref = React.useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => {
    console.log('clicked outside');
  });

  return (
    <div ref={ref}>
      <button type="submit">Send</button>
      <button type="button">Reset</button>
    </div>
  );
}
```

## Reference

```typescript
useClickOutside(ref: RefObject<HTMLElement>, callback: () => void): void
```
