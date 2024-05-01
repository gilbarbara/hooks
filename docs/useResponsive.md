# useResponsive

Get responsive breakpoints.  
Returns a `Responsive<T>` object.

## Usage

```tsx
import React from 'react';
import { useResponsive } from '@gilbarbara/hooks';

function Component() {
  const { between, min, max, orientation, size } = useResponsive();

  return (
    <div>
      {max('sm', 'landscape') && <h1>Extra Small</h1>}
      {between('sm', 'lg') && <h1>Between small and large</h1>}
      <p>Extra Small {min('xs') ? '✔' : '✖️'}</p>
      <p>Small {min('sm') ? '✔' : '✖️'}</p>
      <p>Medium {min('md') ? '✔' : '✖️'}</p>
      <p>Large {min('lg') ? '✔' : '✖️'}</p>
      <p>Extra Large {min('xl') ? '✔' : '✖️'}</p>
      <footer>
        {size} - {orientation}
      </footer>
    </div>
  );
}
```

## Reference

```typescript
const defaultBreakpoints = { xs: 0, sm: 400, md: 768, lg: 1024, xl: 1280 };

interface Responsive<T> {
  between(min: keyof T, max: keyof T, andOrientation?: Orientation): boolean;
  min(breakpoint: keyof T, andOrientation?: Orientation): boolean;
  max(breakpoint: keyof T, andOrientation?: Orientation): boolean;
  orientation: Orientation;
  size: keyof T;
}

useResponsive<T extends Record<string, number> | typeof defaultBreakpoints>(
  breakpoints?: T,
  initialWidth = Infinity,
  initialHeight = Infinity
): Responsive<T>;
```
