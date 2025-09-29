import { XStack } from 'tamagui';
import { CustomButton } from '@/components/ui';

interface Props {
  isProcessing: boolean;
  pickImage: () => Promise<void>;
  openCamera: () => Promise<void>;
}

export default function UploadButtons({
  isProcessing,
  openCamera,
  pickImage,
}: Props) {
  return (
    <XStack gap={'$4'}>
      <CustomButton
        disabled={isProcessing}
        flex={1}
        buttonText={isProcessing ? 'Processing...' : 'Upload Photo'}
        onPress={pickImage}
      />
      <CustomButton
        disabled={isProcessing}
        flex={1}
        buttonText={isProcessing ? 'Processing...' : 'Open Camera'}
        onPress={openCamera}
      />
    </XStack>
  );
}
