import { useState } from 'react';
import { Box, Button, Flex, Input, Paragraph } from '@gilbarbara/components';
import { useDebounce } from '@gilbarbara/hooks';

import Block from '../components/Block';
import Heading from '../components/Heading';

export default function UseDebounce() {
  const [state, setState] = useState('No typing yet...');
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const { cancel } = useDebounce(
    () => {
      setState('Typing stopped');
      setDebouncedValue(value);
    },
    1000,
    [value],
  );

  return (
    <Block>
      <Heading>useDebounce</Heading>
      <Box maxWidth={400} mx="auto">
        <Input
          name="debounced-input"
          onChange={({ currentTarget }) => {
            setState('Waiting for typing to stop...');
            setValue(currentTarget.value);
          }}
          placeholder="Debounced input"
          type="text"
          value={value}
        />
        <Paragraph italic mt="xs">
          {state}
        </Paragraph>
        <Paragraph bold my="md">
          Debounced value: {debouncedValue}
        </Paragraph>
        <Flex justify="center">
          <Button
            onClick={() => {
              cancel();
              setState('Debounce canceled');
            }}
            size="sm"
          >
            Cancel debounce
          </Button>
        </Flex>
      </Box>
    </Block>
  );
}
