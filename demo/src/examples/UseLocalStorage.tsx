import { Button, Paragraph, Spacer } from '@gilbarbara/components';
import { useLocalStorage } from '@gilbarbara/hooks';

import Block from '../components/Block';
import Heading from '../components/Heading';

export default function UseLocalStorage() {
  const storageKey = 'useLocalStorage';
  const [value, setValue, remove] = useLocalStorage(storageKey, [1, 2]);

  return (
    <Block>
      <Heading>useLocalStorage</Heading>
      <Paragraph bold>Value: {JSON.stringify(value, null, 2)}</Paragraph>
      <Paragraph bold mt="xxs">
        Local Storage: {localStorage.getItem(storageKey)}
      </Paragraph>
      <Spacer distribution="center" mt="md">
        <Button onClick={() => setValue([2])} size="sm">
          Change value A
        </Button>
        <Button onClick={() => setValue([2, 3])} size="sm">
          Change value B
        </Button>
        <Button onClick={() => remove()} size="sm">
          Remove
        </Button>
      </Spacer>
    </Block>
  );
}
