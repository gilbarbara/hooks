import { useRef, useState } from 'react';
import { Box, Button, H2 } from '@gilbarbara/components';
import { useClickOutside } from '@gilbarbara/hooks';

import BorderBox from './BorderBox';

export default function UseClickOutside() {
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    setVisible(false);
  });

  return (
    <Box>
      <H2>useClickOutside</H2>
      <BorderBox ref={ref} width={290}>
        <Button
          onClick={() => {
            setVisible(!visible);
          }}
        >
          {visible ? 'Hide' : 'Show'}
        </Button>
        {visible && (
          <Box align="center" flexBox height={120} justify="center" mt="md" variant="green">
            Element
          </Box>
        )}
      </BorderBox>
    </Box>
  );
}
