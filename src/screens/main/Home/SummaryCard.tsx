import { Card, H4, SizableText } from 'tamagui';

interface Props {
  smallText: string;
  biggerText: string;
  inverse?: boolean;
  backgroundColor?: string;
}

export default function SummaryCard({ smallText, biggerText, inverse }: Props) {
  return (
    <Card
      size="$4"
      flex={1}
      justify={'center'}
      items={'center'}
      bordered
      padded
      borderColor={'$accent5'}
    >
      <SizableText size={'$2'}>{smallText}</SizableText>
      <H4>{biggerText}</H4>
    </Card>
  );
}
