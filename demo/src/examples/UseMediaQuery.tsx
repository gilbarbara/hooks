import { Paragraph } from '@gilbarbara/components';
import { useMediaQuery } from '@gilbarbara/hooks';

import Block from '../components/Block';
import Heading from '../components/Heading';

export default function UseMediaQuery() {
  const isLarge = useMediaQuery('(min-width: 768px)');

  return (
    <Block>
      <Heading>useMediaQuery</Heading>

      <Paragraph bold>{isLarge ? '> 768px' : '< 768px'}</Paragraph>
    </Block>
  );
}
