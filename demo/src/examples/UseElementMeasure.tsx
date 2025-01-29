import { useRef } from 'react';
import { useElementMeasure } from '@gilbarbara/hooks';

import Block from '../components/Block';
import BorderBox from '../components/BorderBox';
import Heading from '../components/Heading';
import TagList from '../components/TagList';

export default function UseElementMeasure() {
  const sizeRef = useRef<HTMLDivElement>(null);
  const { absoluteHeight, absoluteWidth, height, width } = useElementMeasure(sizeRef, 100);

  return (
    <Block>
      <Heading>useMeasure</Heading>

      <BorderBox ref={sizeRef} maxWidth={400}>
        <TagList data={{ width, height, absoluteWidth, absoluteHeight }} />
      </BorderBox>
    </Block>
  );
}
