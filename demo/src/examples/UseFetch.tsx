import { useState } from 'react';
import { Box, Button, Flex, Paragraph } from '@gilbarbara/components';
import { useFetch } from '@gilbarbara/hooks';

import Block from '../components/Block';
import BorderBox from '../components/BorderBox';
import Code from '../components/Code';
import Heading from '../components/Heading';
import Status from '../components/Status';

export default function UseFetch() {
  const [wait, setWait] = useState(true);
  const { data, error, isError, isFetched, isLoading, isPaused, isSuccess, refetch, status } =
    useFetch<Record<string, any>>({
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      wait,
    });

  return (
    <Block>
      <Heading>useFetch</Heading>

      <BorderBox maxWidth={400}>
        <Flex gap="md" justify="center">
          <Button disabled={!wait} onClick={() => setWait(false)} size="sm">
            {wait ? 'Execute' : 'Fetched'}
          </Button>
          <Button disabled={wait} onClick={() => refetch()} size="sm">
            Refetch
          </Button>
        </Flex>
        <Flex gap="sm" justify="center" mt="md" wrap="wrap">
          <Status label="isPaused" status={isPaused()} />
          <Status label="isLoading" status={isLoading()} />
          <Status label="isFetched" status={isFetched()} />
          <Status label="isSuccess" status={isSuccess()} />
          <Status label="isError" status={isError()} />
        </Flex>
        <Flex direction="column" gap="sm" maxWidth={400} mt="xl" mx="auto" textAlign="left">
          <Box>
            <Paragraph bold>Status</Paragraph>
            <Paragraph mt="xxs">{status}</Paragraph>
          </Box>
          <Box>
            <Paragraph bold>Error</Paragraph>
            <Paragraph mt="xxs">{error?.toString() ?? '—'}</Paragraph>
          </Box>
          <Box>
            <Paragraph bold>Data</Paragraph>
            <Code data={data} />
          </Box>
        </Flex>
      </BorderBox>
    </Block>
  );
}
