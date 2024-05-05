import { ReactNode } from 'react';
import { Spacer, Tag, Text } from '@gilbarbara/components';

interface Props {
  data: Record<string, any>;
  invertTag?: boolean;
}

interface Row {
  key: string;
  value: ReactNode;
}

export default function TagList({ data, invertTag }: Props) {
  const columns = Object.entries(data).reduce<{ left: Row[]; right: Row[] }>(
    (acc, [key, value], index) => {
      const isEven = index % 2 === 0;

      if (isEven) {
        acc.left.push({ key, value });
      } else {
        acc.right.push({ key, value });
      }

      return acc;
    },
    { left: [], right: [] },
  );

  return (
    <Spacer data-component-name="TagList" distribution="center">
      <Spacer direction="vertical" distribution="end">
        {columns.left.map(row => {
          const key = <Tag bg="primary.100">{row.key}</Tag>;
          const value = <Text>{row.value?.toString()}</Text>;

          return (
            <Spacer key={row.key} gap="xs">
              {invertTag ? value : key}
              {invertTag ? key : value}
            </Spacer>
          );
        })}
      </Spacer>
      <Spacer direction="vertical">
        {columns.right.map(row => (
          <Spacer key={row.key} gap="xs">
            <Tag bg="primary.100">{row.key}</Tag>
            <Text>{row.value?.toString()}</Text>
          </Spacer>
        ))}
      </Spacer>
    </Spacer>
  );
}
