import { useEffect, useRef } from 'react';
import { Box, H2, Paragraph } from '@gilbarbara/components';
import { useIntersectionObserver } from '@gilbarbara/hooks';

export default function UseIntersectionObserver() {
  const ref = useRef<HTMLParagraphElement>(null);
  const intersectionEntry = useIntersectionObserver(ref);

  useEffect(() => {
    console.log({ intersectionEntry });
  }, [intersectionEntry]);

  return (
    <Box>
      <H2>useIntersectionObserver</H2>

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
