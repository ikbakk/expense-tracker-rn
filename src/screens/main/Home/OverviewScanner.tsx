import { SizableText, Text, XStack, YStack } from 'tamagui';
import { CustomButton, CustomCard } from '@/components/ui';

export default function OverviewScanner() {
  return (
    <CustomCard>
      <XStack justify={'space-between'} items={'center'}>
        <YStack gap={'$2'}>
          <Text>Scan your next receipt</Text>
          <SizableText size={'$2'}>Fast OCR to auto-fill</SizableText>
        </YStack>
        <CustomButton buttonText="Open Scanner" />
      </XStack>
    </CustomCard>
  );
}
