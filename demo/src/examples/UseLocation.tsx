import { useLocation } from '@gilbarbara/hooks';

import Block from '../components/Block';
import Heading from '../components/Heading';
import TagList from '../components/TagList';

export default function UseLocation() {
  const location = useLocation();

  return (
    <Block>
      <Heading>useLocation</Heading>

      <TagList data={location} leftDistribution="start" />
    </Block>
  );
}
