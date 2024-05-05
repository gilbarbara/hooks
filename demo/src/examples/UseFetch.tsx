import { useState } from 'react';
import { Box, Button, Paragraph, Spacer } from '@gilbarbara/components';
import { useFetch } from '@gilbarbara/hooks';

import BorderBox from '../components/BorderBox';
import Heading from '../components/Heading';
import Status from '../components/Status';

export default function UseFetch() {
  const [wait, setWait] = useState(true);
  const { data, error, isError, isFetched, isLoading, isPaused, isSuccess, refetch, status } =
    useFetch({
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      wait,
    });

  return (
    <Box>
      <Heading>useFetch</Heading>

      <BorderBox maxWidth={400}>
        <Spacer distribution="center">
          <Button disabled={!wait} onClick={() => setWait(false)} size="xs">
            {wait ? 'Execute' : 'Fetched'}
          </Button>
          <Button disabled={wait} onClick={() => refetch()} size="xs">
            Refetch
          </Button>
        </Spacer>
        <Spacer distribution="center" gapVertical="sm" mt="md">
          <Status label="isPaused" status={isPaused()} />
          <Status label="isLoading" status={isLoading()} />
          <Status label="isFetched" status={isFetched()} />
          <Status label="isSuccess" status={isSuccess()} />
          <Status label="isError" status={isError()} />
        </Spacer>
        <Spacer direction="vertical" maxWidth={400} mt="xl" mx="auto" textAlign="left">
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
            <pre style={{ margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
          </Box>
        </Spacer>
      </BorderBox>
    </Box>
  );
}
