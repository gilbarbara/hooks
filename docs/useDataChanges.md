# useDataChanges

Tracks changes to an object’s properties between renders and logs them by default.
This is useful for debugging unnecessary re-renders, optimizing performance, and understanding prop/state updates.

## Usage

### Basic debugging (logs changes in console)

```tsx
function Component(props: { count: number; name: string }) {
  useDataChanges(props, 'Component');

  return (
    <div>
      <p>Count: {props.count}</p>
      <p>Name: {props.name}</p>
    </div>
  );
}
```

**Capturing changes instead of logging**

```tsx
import { useDataChanges, UseDataChangesReturn } from '@gilbarbara/hooks';
import { useRef } from 'react';


function Component(props: { count: number; name: string }) {
  const differences = useRef<UseDataChangesResult<typeof props>>({});

  useDataChanges(props, { onChange: (changes) => {
      differences.current = changes;
    }});

  return (
    <div>
      <p>Count: {props.count}</p>
      <p>Name: {props.name}</p>
      <pre>{JSON.stringify(differences.current, null, 2)}</pre>
    </div>
  );
}
```

## Reference

```typescript
export interface UseDataChangesOptions<T> {
  /**
   * Determines whether to use shallow or deep comparison when checking for changes.
   * - `'shallow'` (default) follows React's behavior and only checks for reference changes.
   * - `'deep'` performs a deep comparison to detect nested changes.
   */
  comparison?: 'shallow' | 'deep';
  /**
   * An optional name to include in the console log for easier debugging.
   */
  name?: string;
  /**
   * Callback function that receives an object containing the changed values.
   * If provided, it overrides the default console log behavior.
   */
  onChange?: (changes: UseDataChangesResult<T>) => void;
  /**
   * An array of specific keys to track changes for. If omitted, all keys are tracked.
   */
  only?: (keyof T)[];
  /**
   * Suppresses console logging when changes are detected.
   * 
   * Only needed if `onChange` is **not** used.
   */
  skipLog?: boolean;
}

type UseDataChangesResult<T> = {
  [K in keyof T]?: {
    from: any;
    to: any;
  };
};

useDataChanges<T extends Record<string, any>>(
  props: T,
  nameOrOptions: string | UseDataChangesOptions = {},
): UseDataChangesResult<T>;
```
