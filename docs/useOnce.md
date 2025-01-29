# useOnce

Executes the provided callback function only once, before the component's initial render.  
This hook is similar to class constructors in React class components, allowing you to perform one-time setup tasks.

## Usage

```tsx
import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useOnce } from '@gilbarbara/hooks';

function Component() {
  const node = useRef<HTMLElement | null>(null);

  useOnce(() => {
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
useOnce(callback: () => void): void;
```
