import { Button, Paragraph } from '@gilbarbara/components';
import { useUpdate } from '@gilbarbara/hooks';

import Block from '../components/Block';
import BorderBox from '../components/BorderBox';
import Heading from '../components/Heading';

export default function UseUpdate() {
  const update = useUpdate();

  return (
    <Block>
      <Heading>useUpdate</Heading>
      <BorderBox maxWidth={400} mx="auto">
        <Paragraph bold mb="md">
          Time: {Date.now()}
        </Paragraph>
        <Button onClick={update} size="sm">
          Update
        </Button>
      </BorderBox>
    </Block>
  );
}
