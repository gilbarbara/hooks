import { Tag } from '@gilbarbara/components';

interface Props {
  label: string;
  status: boolean;
}

export default function Status({ label, status }: Props) {
  return (
    <Tag bg={status ? 'green' : 'red'} size="xs">
      {label}
    </Tag>
  );
}
