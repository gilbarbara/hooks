import { ChangeEvent, useState } from 'react';
import { Box, Button, Flex, FormGroup, Input, Label, Paragraph } from '@gilbarbara/components';
import { useInterval } from '@gilbarbara/hooks';

import Block from '../components/Block';
import BorderBox from '../components/BorderBox';
import Heading from '../components/Heading';

export default function UseInterval() {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      setCount(count + 1);
    },
    isRunning ? delay : null,
  );

  return (
    <Block>
      <Heading>useInterval</Heading>
      <BorderBox maxWidth={400}>
        <Box mb="md">
          <FormGroup>
            <Label labelId="delay">Delay</Label>
            <Input
              name="delay"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setDelay(Number(event.target.value))
              }
              value={delay}
            />
          </FormGroup>
        </Box>
        <Paragraph bold mb="md" size="lg">
          count: {count}
        </Paragraph>
        <Flex justify="center">
          <Button onClick={() => setIsRunning(!isRunning)} size="sm">
            {isRunning ? 'stop' : 'start'}
          </Button>
        </Flex>
      </BorderBox>
    </Block>
  );
}
