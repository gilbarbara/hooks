# useClickOutside

Triggers the callback function when a click occurs outside the specified target element.

## Usage

```tsx
import { useState } from 'react';
import { useClickOutside } from '@gilbarbara/hooks';

function Component() {
  const [isActive, setActive]= useState(false);
  const ref = useClickOutside(() => {
    console.log('Clicked outside the element');
    setActive(false);
  });
  
  const handleClick = () => {
    setActive(true);
  };
  
  const style = {
    backgroundColor: isActive ? 'rgba(255, 0, 0, 0.3)' : 'transparent',
    padding: 30
  };

  return (
    <div ref={ref} style={style}>
      <button onClick={handleClick} type="submit">Send</button>
      <button onClick={handleClick} type="button">Reset</button>
    </div>
  );
}
```

## Reference

```typescript
useClickOutside<T extends Element = HTMLElement>(callback: () => void): React.RefObject<T>;
```
