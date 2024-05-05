import { useEffect, useRef } from 'react';
import { Box, Paragraph } from '@gilbarbara/components';
import { useIntersectionObserver } from '@gilbarbara/hooks';

import Heading from '../components/Heading';

export default function UseIntersectionObserver() {
  const ref = useRef<HTMLParagraphElement>(null);
  const intersectionEntry = useIntersectionObserver(ref);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log({ intersectionEntry });
  }, [intersectionEntry]);

  return (
    <Box>
      <Heading>useIntersectionObserver</Heading>

      <Paragraph bold mb="xxl">
        {intersectionEntry?.isIntersecting ? 'Visible' : 'Hidden'}
      </Paragraph>
      <Paragraph ref={ref}>
        Consectetur cillum duis mollit labore. Minim ex id commodo ullamco labore laborum id. Irure
        voluptate pariatur voluptate pariatur tempor. Commodo ea magna qui elit culpa.
      </Paragraph>
    </Box>
  );
}
