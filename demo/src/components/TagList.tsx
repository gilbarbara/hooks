import { ReactNode } from 'react';
import { Spacer, type ChipProps, type SpacerProps, Chip } from '@gilbarbara/components';

import Code from './Code';

interface Props {
  data: Record<string, any>;
  invertLeftTag?: boolean;
  leftDistribution?: SpacerProps['distribution'];
  rightDistribution?: SpacerProps['distribution'];
  tagBg?: ChipProps['bg'];
}

interface Row {
  key: string;
  value: ReactNode;
}

export default function TagList({
  data,
  invertLeftTag = false,
  leftDistribution = 'end',
  rightDistribution = 'start',
  tagBg = 'primary.100',
}: Props) {
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
    <Spacer data-component-name="TagList" distribution="center" verticalAlign="start">
      <Spacer orientation="vertical" distribution={leftDistribution}>
        {columns.left.map(row => {
          const key = <Chip bg={tagBg}>{row.key}</Chip>;
          const value = <Code data={row.value} />;

          return (
            <Spacer key={row.key} gap="xs">
              {invertLeftTag ? value : key}
              {invertLeftTag ? key : value}
            </Spacer>
          );
        })}
      </Spacer>
      <Spacer orientation="vertical" distribution={rightDistribution}>
        {columns.right.map(row => (
          <Spacer key={row.key} gap="xs">
            <Chip bg={tagBg}>{row.key}</Chip>
            <Code data={row.value} />
          </Spacer>
        ))}
      </Spacer>
    </Spacer>
  );
}
