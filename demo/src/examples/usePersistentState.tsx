import { Button, Paragraph, Spacer } from '@gilbarbara/components';
import { usePersistentState } from '@gilbarbara/hooks';

import Block from '../components/Block';
import Code from '../components/Code';
import Heading from '../components/Heading';

export default function UsePersistentState() {
  const storageKey = 'usePersistentState';
  const [state, setState, remove] = usePersistentState(storageKey, {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    age: 30,
    isSubscribed: true,
    settings: {
      notifications: true,
    },
    theme: 'dark',
  });

  return (
    <Block>
      <Heading>usePersistentState</Heading>
      <Paragraph bold mb="md" size="lg">
        Value:
      </Paragraph>
      <Code bold data={state} />
      <Paragraph bold mb="md" mt="xxs" size="lg">
        Local Storage:
      </Paragraph>
      <Code bold data={localStorage.getItem(storageKey)} />
      <Spacer distribution="center" mt="md">
        <Button onClick={() => setState({ name: 'Johnny Doe' })} size="sm">
          Change name
        </Button>
        <Button
          onClick={() =>
            setState(s => ({
              settings: {
                notifications: !s.settings?.notifications,
              },
            }))
          }
          size="sm"
        >
          Toggle notifications
        </Button>
        <Button onClick={() => remove()} size="sm">
          Remove
        </Button>
      </Spacer>
    </Block>
  );
}
