import { useState } from 'react';
import { Box, Button } from '@gilbarbara/components';
import { useClickOutside } from '@gilbarbara/hooks';

import BorderBox from '../components/BorderBox';
import Heading from '../components/Heading';

export default function UseClickOutside() {
  const [isVisible, setVisible] = useState(true);

  const ref = useClickOutside<HTMLDivElement>(() => {
    setVisible(false);
  });

  return (
    <Box>
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
          <Box align="center" bg="green" flexBox height={120} justify="center" mt="md">
            Element
          </Box>
        )}
      </BorderBox>
    </Box>
  );
}
