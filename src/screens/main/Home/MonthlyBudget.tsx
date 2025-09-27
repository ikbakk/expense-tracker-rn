import { Card, Progress, Text, XStack, YStack } from 'tamagui';

export default function MonthlyBudget() {
  return (
    <Card size="$4" className="gap-2" padded bordered borderColor={'$accent5'}>
      <YStack gap={'$2'}>
        <XStack className="justify-between items-center">
          <Text>Monthly budget</Text>
          <Text>60% used</Text>
        </XStack>
        <Progress value={60}>
          <Progress.Indicator animation={'bouncy'} />
        </Progress>
        <Text>Budget: 1000 | Spent: 600</Text>
      </YStack>
    </Card>
  );
}
