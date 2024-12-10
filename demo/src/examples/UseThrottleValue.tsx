import { ChangeEvent, useState } from 'react';
import { FormGroup, Input, Label, Paragraph } from '@gilbarbara/components';
import { useThrottleValue } from '@gilbarbara/hooks';

import Block from '../components/Block';
import BorderBox from '../components/BorderBox';
import Heading from '../components/Heading';

export default function UseThrottleValue() {
  const [text, setText] = useState('');
  const throttledText = useThrottleValue(text, 2000);

  return (
    <Block>
      <Heading>useThrottleValue</Heading>
      <BorderBox maxWidth={400}>
        <FormGroup>
          <Label labelId="text">Text</Label>
          <Input
            name="text"
            onChange={(event: ChangeEvent<HTMLInputElement>) => setText(event.target.value)}
            type="text"
            value={text}
          />
        </FormGroup>
        <Paragraph bold>Throttle value: {throttledText}</Paragraph>
      </BorderBox>
    </Block>
  );
}
