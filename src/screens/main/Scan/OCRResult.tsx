import { ScrollView, Text, YStack } from 'tamagui';
import { CustomButton } from '@/components/ui';

interface Props {
  isProcessing: boolean;
  result: string;
  onPress?: () => void;
}

export default function OCRResult({ isProcessing, result, onPress }: Props) {
  return (
    <YStack gap={'$2'}>
      <Text color={'$foreground'}>Summary</Text>
      <ScrollView
        contentContainerStyle={{ pb: '$6' }}
        rounded={'$4'}
        p={'$2'}
        height={'$12'}
        borderColor={'$outline'}
        borderWidth={1}
        bg={'$muted'}
      >
        <Text color={'$primaryForeground'}>
          {isProcessing ? 'Processing image...' : result || 'No text detected'}
        </Text>
      </ScrollView>

      <CustomButton
        onPress={onPress}
        disabled={!result || isProcessing}
        buttonText="Use these details"
      />
    </YStack>
  );
}
