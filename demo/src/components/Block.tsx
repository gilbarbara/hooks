import { Box, Props } from '@gilbarbara/components';

interface BlockProps extends Props.BoxProps {
  isLast?: boolean;
}

export default function Block({ children, isLast, ...rest }: BlockProps) {
  return (
    <Box
      border={{ side: 'bottom', color: 'gray.400', style: 'dotted', size: isLast ? 0 : 1 }}
      py="xxxl"
      {...rest}
    >
      {children}
    </Box>
  );
}
