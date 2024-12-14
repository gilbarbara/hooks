# useToggle

A state hook for managing a boolean value with easy-to-use methods for toggling or explicitly setting its value.

## Usage

```tsx
import { useToggle } from '@gilbarbara/hooks';

function Component() {
  const [value, { toggle, toggleOn, toggleOff }] = useToggle(true);

  return (
    <div>
      <div>{value ? 'ON' : 'OFF'}</div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={toggleOn}>set ON</button>
      <button onClick={toggleOff}>set OFF</button>
    </div>
  );
}
```

## Reference

```typescript
type UseToggleResult = [
  value: boolean,
  actions: {
    toggle: (nextValue?: boolean) => void;
    toggleOn: () => void;
    toggleOff: () => void;
  },
];

useToggle(initialValue?: boolean = true): UseToggleResult;
```
