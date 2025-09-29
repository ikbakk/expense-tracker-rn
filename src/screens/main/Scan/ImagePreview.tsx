import { Image, Text, View } from 'tamagui';
import { CustomCard } from '@/components/ui';

interface Props {
  imageUri: string | null;
}

export default function ImagePreview({ imageUri }: Props) {
  return (
    <CustomCard flex={1} bg={'$muted'}>
      <View
        animation={'bouncy'}
        flex={1}
        rounded={'$4'}
        overflow="hidden"
        borderColor={'$outline'}
        borderWidth={1}
      >
        {imageUri ? (
          <Image
            flex={1}
            source={{ uri: imageUri }}
            resizeMethod="auto"
            alt="receipt"
          />
        ) : (
          <View justify={'center'} items={'center'} flex={1}>
            <Text color={'$mutedForeground'}>
              Camera preview / Receipt image
            </Text>
          </View>
        )}
      </View>
    </CustomCard>
  );
}
