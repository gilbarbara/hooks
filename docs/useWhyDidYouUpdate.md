# useWhyDidYouUpdate

A debugging hook that helps identify which props or state changes are causing a component to re-render.  
This is especially useful for optimizing performance and debugging unnecessary re-renders in React components.

## Usage

```tsx
function Component(props: { count: number; name: string }) {
  const changes = useWhyDidYouUpdate(props, 'MyComponent');

  return (
    <div>
      <p>Count: {props.count}</p>
      <p>Name: {props.name}</p>
    </div>
  );
}
```

**Skipping Logs and Inspecting Changes**

```tsx
import { useWhyDidYouUpdate } from '@gilbarbara/hooks';

function Component(props: { count: number; name: string }) {
  const changes = useWhyDidYouUpdate(props, { skipLog: true });

  return (
    <div>
      <p>Count: {props.count}</p>
      <p>Name: {props.name}</p>
      <pre>{JSON.stringify(changes, null, 2)}</pre>
    </div>
  );
}
```

## Reference

```typescript
interface UseWhyDidYouUpdateOptions {
  name?: string;
  skipLog?: boolean;
}

type UseWhyDidYouUpdateResult<T> = {
  [K in keyof T]?: {
    from: any;
    to: any;
  };
};

useWhyDidYouUpdate<T extends Record<string, any>>(
  props: T,
  nameOrOptions: string | UseWhyDidYouUpdateOptions = {},
): UseWhyDidYouUpdateResult<T>;
```
