import { H4, SizableText } from 'tamagui';
import { CustomCard } from '@/components/ui';

interface Props {
  smallText: string;
  biggerText: string;
  inversed?: boolean;
}

export default function SummaryCard({
  smallText,
  biggerText,
  inversed,
}: Props) {
  return (
    <>
      {inversed ? (
        <CustomCard
          flex={1}
          bg={'$primary'}
          justify={'center'}
          items={'center'}
        >
          <SizableText color={'$primaryForeground'} size={'$2'}>
            {smallText}
          </SizableText>
          <H4 color={'$primaryForeground'}>{biggerText}</H4>
        </CustomCard>
      ) : (
        <CustomCard flex={1} justify={'center'} items={'center'}>
          <SizableText size={'$2'}>{smallText}</SizableText>
          <H4>{biggerText}</H4>
        </CustomCard>
      )}
    </>
  );
}
