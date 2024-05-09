# useToggle

State hook to track the value of a boolean.

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
  boolean,
  {
    toggle: (nextValue?: boolean) => void;
    toggleOn: () => void;
    toggleOff: () => void;
  },
];

useToggle(initialValue?: boolean = true): UseToggleResult;
```
