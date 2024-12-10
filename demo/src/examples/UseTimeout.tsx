import { ReactNode, useState } from 'react';
import { Button, Flex, Paragraph } from '@gilbarbara/components';
import { useTimeout } from '@gilbarbara/hooks';

import Block from '../components/Block';
import BorderBox from '../components/BorderBox';
import Heading from '../components/Heading';

export default function UseTimeout() {
  const [description, setDescription] = useState('Function will be called in 5 seconds');

  const callback = () => {
    setDescription(`Callback called at ${Date.now()}`);
  };

  const { cancel, getStatus, reset } = useTimeout(callback, 5000);

  const status = getStatus();

  const cancelButtonClick = () => {
    if (status === 'pending') {
      cancel();
      setDescription(`Timer cancelled`);
    } else {
      reset();
      setDescription('Callback will be called in 5 seconds');
    }
  };

  const content: Record<string, ReactNode> = {
    button: 'Cancel',
    status: 'Pending',
  };

  if (status === 'cancelled') {
    content.button = 'Restart';
    content.status = 'Cancelled';
  } else if (status === 'completed') {
    content.button = 'Restart';
  }

  return (
    <Block>
      <Heading>useTimeout</Heading>
      <BorderBox maxWidth={400}>
        <Paragraph bold mb="md">
          {description}
        </Paragraph>
        <Flex justify="center">
          <Button onClick={cancelButtonClick} size="sm">
            {content.button} timeout
          </Button>
        </Flex>
      </BorderBox>
    </Block>
  );
}
