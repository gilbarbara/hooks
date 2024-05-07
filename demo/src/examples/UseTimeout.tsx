import { ReactNode, useState } from 'react';
import { Box, Button, Paragraph } from '@gilbarbara/components';
import { useTimeout } from '@gilbarbara/hooks';

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
    <Box>
      <Heading>useTimeout</Heading>
      <BorderBox maxWidth={400}>
        <Paragraph bold mb="md">
          {description}
        </Paragraph>
        <Button onClick={cancelButtonClick} size="sm">
          {content.button} timeout
        </Button>
      </BorderBox>
    </Box>
  );
}
