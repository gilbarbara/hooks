import { ChangeEvent, useState } from 'react';
import { Box, Button, FormGroup, Input, Label, Paragraph } from '@gilbarbara/components';
import { useInterval } from '@gilbarbara/hooks';

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
    <Box>
      <Heading>useInterval</Heading>
      <BorderBox maxWidth={400}>
        <Box mb="md">
          <FormGroup>
            <Label htmlFor="delay">Delay</Label>
            <Input
              name="delay"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setDelay(Number(event.target.value))}
              value={delay}
            />
          </FormGroup>
        </Box>
        <Paragraph bold mb="md" size="lg">
          count: {count}
        </Paragraph>
        <div>
          <Button onClick={() => setIsRunning(!isRunning)} size="sm">
            {isRunning ? 'stop' : 'start'}
          </Button>
        </div>
      </BorderBox>
    </Box>
  );
}
