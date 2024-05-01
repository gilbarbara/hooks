# useWhyDidYouUpdate

Get which props changes are causing a component to re-render.

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
type PlainObject<T = unknown> = Record<string | number | symbol, T>;

interface UseWhyDidYouUpdateOptions {
  name?: string;
  skipLog?: boolean;
}

useWhyDidYouUpdate<T extends PlainObject>(
  props: T,
  nameOrOptions: string | UseWhyDidYouUpdateOptions = {},
);
```
