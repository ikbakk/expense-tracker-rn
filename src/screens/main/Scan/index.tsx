import {
  type ImagePickerOptions,
  type ImagePickerResult,
  launchCameraAsync,
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { useState } from 'react';
import { YStack } from 'tamagui';
import AppView from '@/components/common/AppView';
import ScreenHeader from '@/components/common/ScreenHeader';
import { useAppToast } from '@/contexts/ToastProvider';
import { getReceiptAsTable, parseReceipt } from '@/lib/ocrParser';
import ImagePreview from './ImagePreview';
import OCRResult from './OCRResult';
import UploadButtons from './UploadButtons';

const imagePickerOptions: ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [3, 4],
  quality: 1,
};

const requestPermission = async (type: 'camera' | 'imagePicker') => {
  if (type === 'imagePicker') {
    const { status } = await requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Sorry, we need camera roll permissions to make this work!');
      return;
    }
  }

  if (type === 'camera') {
    const { status } = await requestCameraPermissionsAsync();
    if (status !== 'granted') {
      console.log('Sorry, we need camera permissions to make this work!');
      return;
    }
  }
};

export default function ScanScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useAppToast();

  const processImage = async (result: ImagePickerResult) => {
    setIsProcessing(true);

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const dataOcr = await parseReceipt(uri);
      const table = getReceiptAsTable(dataOcr);

      setImage(uri);

      if (table.rows.length > 1) {
        setResult(table.rows.toString());

        toast.show('Receipt Detected', {
          duration: 3000,
        });
      } else {
        setResult('');
        toast.show('Please provide a receipt image', { duration: 5000 });
      }

      setIsProcessing(false);
    }

    setIsProcessing(false);
  };

  const pickImage = async () => {
    try {
      requestPermission('imagePicker');

      const result = await launchImageLibraryAsync(imagePickerOptions);

      processImage(result);
    } catch (error) {
      toast.show('Something went wrong');
      console.log(error);
    }
  };

  const openCamera = async () => {
    try {
      requestPermission('camera');

      const result = await launchCameraAsync(imagePickerOptions);

      processImage(result);
    } catch (error) {
      console.log(error);
      toast.show('Something went wrong');
    }
  };

  return (
    <AppView>
      <ScreenHeader
        title="Scan Receipt"
        subtitle="Use your camera or upload a photo"
      />
      <ImagePreview imageUri={image} />
      <YStack gap={'$4'}>
        <UploadButtons
          isProcessing={isProcessing}
          openCamera={openCamera}
          pickImage={pickImage}
        />
        <OCRResult result={result} isProcessing={isProcessing} />
      </YStack>
    </AppView>
  );
}
