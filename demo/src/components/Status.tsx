import { Chip } from '@gilbarbara/components';

interface Props {
  label: string;
  status: boolean;
}

export default function Status({ label, status }: Props) {
  return (
    <Chip bg={status ? 'green' : 'gray.200'} size="xs">
      {label}
    </Chip>
  );
}
