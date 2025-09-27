import { Button, Card, SizableText, Text, XStack, YStack } from 'tamagui';

export default function OverviewScanner() {
  return (
    <Card
      size={'$4'}
      padded
      bordered
      borderColor={'$outlineColor'}
      backgroundColor={'$background0'}
    >
      <XStack justify={'space-between'} items={'center'}>
        <YStack gap={'$2'}>
          <Text>Scan your next receipt</Text>
          <SizableText size={'$2'}>Fast OCR to auto-fill</SizableText>
        </YStack>
        <Button>Open Scanner</Button>
      </XStack>
    </Card>
  );
}
