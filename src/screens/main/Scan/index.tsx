import { useState } from 'react';
import AppView from '@/components/common/AppView';
import ScreenHeader from '@/components/common/ScreenHeader';
import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  launchCameraAsync,
  requestCameraPermissionsAsync,
} from 'expo-image-picker';
import { CustomButton, CustomCard } from '@/components/ui';
import { Image, Text, View, XStack, YStack } from 'tamagui';
import MlkitOcr from 'react-native-mlkit-ocr';

export default function ScanScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Helper function to run OCR
  const runOCR = async (uri: string) => {
    try {
      setIsProcessing(true);
      const detectedText = await MlkitOcr.detectFromUri(uri);

      // MlkitOcr returns an array of blocks
      // Flatten it into a single string
      const text = detectedText
        .map(block => block.text)
        .join('\n')
        .trim();

      setResult(text || 'No text detected');
    } catch (err) {
      console.error('OCR error:', err);
      setResult('Failed to detect text');
    } finally {
      setIsProcessing(false);
    }
  };

  const pickImage = async () => {
    try {
      // Request permissions
      const { status } = await requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log(
          'Sorry, we need camera roll permissions to make this work!',
        );
        return;
      }

      const result = await launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImage(uri);
        await runOCR(uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  const openCamera = async () => {
    try {
      // Request permissions
      const { status } = await requestCameraPermissionsAsync();
      if (status !== 'granted') {
        console.log('Sorry, we need camera permissions to make this work!');
        return;
      }

      const result = await launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImage(uri);
        await runOCR(uri);
      }
    } catch (error) {
      console.error('Camera error:', error);
    }
  };

  return (
    <AppView>
      <ScreenHeader
        title="Scan Receipt"
        subtitle="Use your camera or upload a photo"
      />

      <CustomCard flex={1} bg={'$muted'}>
        <View
          animation={'bouncy'}
          flex={1}
          rounded={'$4'}
          overflow="hidden"
          borderColor={'$outline'}
          borderWidth={1}
        >
          {image ? (
            <Image
              flex={1}
              source={{ uri: image }}
              resizeMethod="auto"
              className="flex-1 w-full"
              alt="receipt"
            />
          ) : (
            <View justify={'center'} items={'center'} flex={1}>
              <Text>Camera preview / Receipt image</Text>
            </View>
          )}
        </View>
      </CustomCard>

      <YStack gap={'$4'}>
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

        <YStack gap={'$2'}>
          <Text>Detected fields (preview)</Text>
          <View
            rounded={'$4'}
            p={'$2'}
            minH={'$10'}
            borderColor={'$outline'}
            borderWidth={1}
            bg={'$muted'}
          >
            <Text className="text-sm">
              {isProcessing
                ? 'Processing image...'
                : result || 'No text detected'}
            </Text>
          </View>

          <CustomButton
            disabled={!result || isProcessing}
            buttonText="Use these details"
          />
        </YStack>
      </YStack>
    </AppView>
  );
}
