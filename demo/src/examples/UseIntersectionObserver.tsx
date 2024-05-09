import { useEffect, useRef } from 'react';
import { Box, Paragraph } from '@gilbarbara/components';
import { useIntersectionObserver } from '@gilbarbara/hooks';

import Block from '../components/Block';
import Heading from '../components/Heading';

export default function UseIntersectionObserver() {
  const ref = useRef<HTMLParagraphElement>(null);
  const intersectionEntry = useIntersectionObserver(ref);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log({ intersectionEntry });
  }, [intersectionEntry]);

  return (
    <Block>
      <Heading>useIntersectionObserver</Heading>

      <Paragraph bold mb="xxl">
        {intersectionEntry?.isIntersecting ? 'Visible' : 'Hidden'}
      </Paragraph>
      <Box ref={ref} maxWidth={640} mx="auto">
        <Paragraph>
          Laborum magna laboris enim et reprehenderit consequat. Dolor occaecat commodo laboris
          eiusmod commodo minim. Sunt commodo mollit qui reprehenderit fugiat. Quis non laborum
          deserunt. Laboris do esse nulla enim incididunt dolore esse pariatur voluptate est sunt
          aute enim. Ut do ipsum aute nostrud id amet officia fugiat cillum laborum nisi sint.
        </Paragraph>
        <Paragraph>
          Irure esse exercitation laboris reprehenderit culpa est officia fugiat id. Elit quis
          nostrud eu laborum deserunt officia labore consequat qui excepteur eiusmod ullamco
          excepteur. Commodo ipsum elit labore commodo deserunt ad dolore nostrud aliqua veniam.
          Sint commodo consequat deserunt. Minim voluptate velit culpa. Ut non tempor aliquip
          proident duis occaecat.
        </Paragraph>
      </Box>
    </Block>
  );
}
