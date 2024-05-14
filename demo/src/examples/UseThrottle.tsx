import { useState } from 'react';
import { Button, Paragraph } from '@gilbarbara/components';
import { useThrottle } from '@gilbarbara/hooks';

import Block from '../components/Block';
import BorderBox from '../components/BorderBox';
import Heading from '../components/Heading';

export default function UseThrottle() {
  const [time, setTime] = useState(0);

  const fn = useThrottle(() => {
    setTime(Date.now());
  }, 2000);

  return (
    <Block>
      <Heading>useThrottle</Heading>
      <BorderBox maxWidth={400}>
        <Button onClick={fn} size="sm">
          Update
        </Button>
        <Paragraph bold mt="md">
          Last run: {time}
        </Paragraph>
      </BorderBox>
    </Block>
  );
}
