# useBreakpoint

A hook for determining responsive breakpoints based on screen size and orientation.  
This hook is useful for implementing adaptive UI layouts and conditional rendering across multiple screen sizes.

## Usage

```tsx
import { useBreakpoint } from '@gilbarbara/hooks';

function Component() {
  const { between, min, max, orientation, size } = useBreakpoint();

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

**Custom breakpoints**
```tsx
import { useBreakpoint } from '@gilbarbara/hooks';

function Component() {
  const { size } = useBreakpoint({ tiny: 0, small: 320, large: 1024 });

  return <p>Current breakpoint: {size}</p>;
}
```

```tsx

## Reference

```typescript
const defaultBreakpoints = { xs: 0, sm: 400, md: 768, lg: 1024, xl: 1280 };

type UseBreakpointOrientation = 'landscape' | 'portrait';

interface UseBreakpointResult<T> {
  /**
   * Returns true if the screen size is between the specified breakpoints and matches the optional orientation.
   */
  between(min: keyof T, max: keyof T, andOrientation?: UseBreakpointOrientation): boolean;
  /**
   * Returns true if the screen size is less than or equal to the specified breakpoint and matches the optional orientation.
   */
  max(breakpoint: keyof T, andOrientation?: UseBreakpointOrientation): boolean;
  /**
   * Returns true if the screen size is greater than or equal to the specified breakpoint and matches the optional orientation.
   */
  min(breakpoint: keyof T, andOrientation?: UseBreakpointOrientation): boolean;
  /**
   * The current screen orientation, either portrait or landscape.
   */
  orientation: UseBreakpointOrientation;
  /**
   * The current active breakpoint, based on the defined breakpoints.
   */
  size: keyof T;
}

useBreakpoint<T extends Record<string, number> | typeof defaultBreakpoints>(
  customBreakpoints?: T,
  initialWidth = Infinity,
  initialHeight = Infinity
): UseBreakpointResult<T>;
```
