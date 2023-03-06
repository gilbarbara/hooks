import { useEffect, useRef } from 'react';
import { Box, H2 } from '@gilbarbara/components';
import { useResizeObserver } from '@gilbarbara/hooks';

import BorderBox from './BorderBox';
import TagList from './TagList';

export default function UseResizeObserver() {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useResizeObserver(ref, 100);

  useEffect(() => {
    console.log({ entry });
  }, [entry]);

  const { bottom, height, left, right, top, width, x, y } = entry?.contentRect || {};

  return (
    <Box>
      <H2>useResizeObserver</H2>

      <BorderBox ref={ref} minHeight="10vh" width="50vw">
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
