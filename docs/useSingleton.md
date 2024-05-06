# useSingleton

Run the code just once before the render.  
Similar to constructors in classes.

## Usage

```tsx
import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useSingleton } from '@gilbarbara/hooks';

function Component() {
  const node = useRef<HTMLElement | null>(null);

  useSingleton(() => {
    // this code will only be executed once.
    node.current = document.createElement('div');
    node.current.id = 'MyPortal';

    document.body.appendChild(node.current);
  });

  return node.current ? ReactDOM.createPortal(<div>Portal</div>, node.current) : null;
}
```

## Reference

```typescript
useSingleton(callback: () => void): void;
```
