import { useWindowSize } from '@gilbarbara/hooks';

import Block from '../components/Block';
import Heading from '../components/Heading';
import TagList from '../components/TagList';

export default function UseWindowSize() {
  const dimensions = useWindowSize(100);

  return (
    <Block isLast>
      <Heading>useWindowSize</Heading>

      <TagList data={dimensions} />
    </Block>
  );
}
