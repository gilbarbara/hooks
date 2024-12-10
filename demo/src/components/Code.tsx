import { Flex, Props, Text } from '@gilbarbara/components';

import { isPlainObject } from '../modules/helpers';

interface CodeProps extends Omit<Props.BoxProps, 'data'> {
  bold?: boolean;
  data: any;
  skipWrapper?: boolean;
}

export default function Code({ bold, data, skipWrapper, ...rest }: CodeProps) {
  const content = isPlainObject(data) ? (
    <pre style={{ fontWeight: bold ? 'bold' : 'normal', margin: 0, textAlign: 'left' }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  ) : (
    <Text bold={bold} size="sm">
      {data}
    </Text>
  );

  if (skipWrapper) {
    return content;
  }

  return (
    <Flex justify="center" mx="auto" {...rest}>
      {content}
    </Flex>
  );
}
