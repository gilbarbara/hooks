# useWhyDidYouUpdate

Get which props/state changes are causing a component to re-render.

## Usage

```tsx
function Component(props: any) {
  const changes = useWhyDidYouUpdate(props, { skipLog: true });
  // Or just log the changes
  // useWhyDidYouUpdate(props, 'Component');

  return <div>{!!changes && JSON.stringify(changes, null, 2)}</div>;
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
