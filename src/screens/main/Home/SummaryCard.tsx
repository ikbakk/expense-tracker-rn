import { cn } from '@/lib/utils';
import { Card, H2, H4, H5, Text } from 'tamagui';

interface Props {
  smallText: string;
  biggerText: string;
  biggerTextClassName?: string;
  className?: string;
}

export default function SummaryCard({
  smallText,
  biggerText,
  biggerTextClassName,
  className,
}: Props) {
  return (
    <Card size="$4" bordered padded theme={'alt2'}>
      <Card.Header>
        <Text>{smallText}</Text>
      </Card.Header>
      <H4 className={biggerTextClassName}>{biggerText}</H4>

      <Card.Background />
    </Card>
  );
}
