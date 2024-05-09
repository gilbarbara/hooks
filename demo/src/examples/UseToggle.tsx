import { Button, Paragraph, Spacer } from '@gilbarbara/components';
import { useToggle } from '@gilbarbara/hooks';

import Block from '../components/Block';
import BorderBox from '../components/BorderBox';
import Heading from '../components/Heading';

export default function UseToggle() {
  const [value, { toggle, toggleOff, toggleOn }] = useToggle(true);

  return (
    <Block>
      <Heading>useToggle</Heading>
      <BorderBox maxWidth={400} mx="auto">
        <Paragraph bold mb="md">
          {value ? 'ON' : 'OFF'}
        </Paragraph>
        <Spacer distribution="center">
          <Button onClick={() => toggle()} size="sm">
            Toggle
          </Button>
          <Button onClick={toggleOn} size="sm">
            set ON
          </Button>
          <Button onClick={toggleOff} size="sm">
            set OFF
          </Button>
        </Spacer>
      </BorderBox>
    </Block>
  );
}
