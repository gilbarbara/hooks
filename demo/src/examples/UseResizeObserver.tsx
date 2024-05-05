import { useEffect, useRef } from 'react';
import { Box } from '@gilbarbara/components';
import { useResizeObserver } from '@gilbarbara/hooks';

import BorderBox from '../components/BorderBox';
import Heading from '../components/Heading';
import TagList from '../components/TagList';

export default function UseResizeObserver() {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useResizeObserver(ref, 100);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log({ entry });
  }, [entry]);

  const { bottom, height, left, right, top, width, x, y } = entry?.contentRect || {};

  return (
    <Box>
      <Heading>useResizeObserver</Heading>

      <BorderBox ref={ref} maxWidth={400} minHeight="10vh">
        {entry && (
          <TagList
            data={{
              width,
              height,
              left,
              right,
              bottom,
              top,
              x,
              y,
            }}
          />
        )}
      </BorderBox>
    </Box>
  );
}
