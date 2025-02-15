import { useState } from 'react';
import { Button, Flex } from '@gilbarbara/components';
import { useClickOutside } from '@gilbarbara/hooks';

import Block from '../components/Block';
import BorderBox from '../components/BorderBox';
import Heading from '../components/Heading';

export default function UseClickOutside() {
  const [isVisible, setVisible] = useState(true);

  const ref = useClickOutside<HTMLDivElement>(() => {
    setVisible(false);
  });

  return (
    <Block>
      <Heading>useClickOutside</Heading>
      <BorderBox ref={ref} maxWidth={290}>
        <Button
          disabled={isVisible}
          onClick={() => {
            setVisible(!isVisible);
          }}
          size="xs"
        >
          {isVisible ? 'Click outside the dotted line to hide it' : 'Show'}
        </Button>
        {isVisible && (
          <Flex align="center" bg="green" height={120} justify="center" mt="md">
            Element
          </Flex>
        )}
      </BorderBox>
    </Block>
  );
}
