import { Progress, SizableText, Text, XStack, YStack } from 'tamagui';
import { CustomCard } from '@/components/ui';

export default function MonthlyBudget() {
  return (
    <CustomCard>
      <YStack gap={'$2'}>
        <XStack justify={'space-between'} items={'center'}>
          <SizableText size={'$2'}>Monthly budget</SizableText>
          <SizableText size={'$2'}>60% used</SizableText>
        </XStack>
        <Progress bg={'$outline'} value={60}>
          <Progress.Indicator bg={'$primary'} animation={'bouncy'} />
        </Progress>
        <Text>Budget: 1000 | Spent: 600</Text>
      </YStack>
    </CustomCard>
  );
}
