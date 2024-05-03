import { useState } from 'react';
import { Box, Button, H2, Paragraph } from '@gilbarbara/components';
import { useClickOutside } from '@gilbarbara/hooks';

import BorderBox from './BorderBox';

export default function UseClickOutside() {
  const [visible, setVisible] = useState(true);

  const ref = useClickOutside<HTMLDivElement>(() => {
    setVisible(false);
  });

  return (
    <Box>
      <H2>useClickOutside</H2>
      <BorderBox ref={ref} width={290}>
        {visible ? (
          <Paragraph>Click outside the dotted line to hide it</Paragraph>
        ) : (
          <Button
            onClick={() => {
              setVisible(true);
            }}
          >
            Show
          </Button>
        )}
        {visible && (
          <Box align="center" bg="green" flexBox height={120} justify="center" mt="md">
            Element
          </Box>
        )}
      </BorderBox>
    </Box>
  );
}
