import { useState } from 'react';
import { Button, Flex, Paragraph } from '@gilbarbara/components';
import { useHasChanged } from '@gilbarbara/hooks';

import Block from '../components/Block';
import BorderBox from '../components/BorderBox';
import Heading from '../components/Heading';

export default function UseHasChanged() {
  const [count, setCount] = useState(0);
  const [isRunning, setRunning] = useState(false);
  const [hasChanged, previous] = useHasChanged(isRunning);

  return (
    <Block>
      <Heading>useHasChanged</Heading>
      <BorderBox maxWidth={400}>
        <Paragraph bold>hasChanged: {hasChanged.toString()}</Paragraph>
        <Paragraph mt="xs">
          Previous value: {typeof previous !== 'boolean' ? '--' : previous?.toString()} / Current
          value: {isRunning.toString()}
        </Paragraph>
        <Flex justify="center" mt="xs">
          <Button onClick={() => setRunning(!isRunning)} size="xs">
            Update value
          </Button>
        </Flex>
        <Paragraph bold mt="lg">
          count: {count}
        </Paragraph>
        <Flex gap="sm" justify="center" mt="xs">
          <Button onClick={() => setCount(count - 1)} size="xs">
            Decrement
          </Button>
          <Button onClick={() => setCount(count + 1)} size="xs">
            Increment
          </Button>
        </Flex>
      </BorderBox>
    </Block>
  );
}
