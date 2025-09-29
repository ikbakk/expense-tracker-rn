import { useState } from 'react';
import AppView from '@/components/common/AppView';
import ScreenHeader from '@/components/common/ScreenHeader';

export default function ScanScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // const pickImage = async () => {
  // 	try {
  // 		// Request permissions
  // 		const { status } =
  // 			await ImagePicker.requestMediaLibraryPermissionsAsync();
  // 		if (status !== "granted") {
  // 			alert("Sorry, we need camera roll permissions to make this work!");
  // 			return;
  // 		}
  //
  // 		const result = await ImagePicker.launchImageLibraryAsync({
  // 			mediaTypes: ["images"],
  // 			allowsEditing: true,
  // 			quality: 1,
  // 		});
  //
  // 		if (!result.canceled) {
  // 			const uri = result.assets[0].uri;
  // 			setImage(uri);
  // 			// await runOCR(uri);
  // 		}
  // 	} catch (error) {
  // 		console.error("Image picker error:", error);
  // 	}
  // };
  //
  // const openCamera = async () => {
  // 	try {
  // 		// Request permissions
  // 		const { status } = await ImagePicker.requestCameraPermissionsAsync();
  // 		if (status !== "granted") {
  // 			alert("Sorry, we need camera permissions to make this work!");
  // 			return;
  // 		}
  //
  // 		const result = await ImagePicker.launchCameraAsync({
  // 			mediaTypes: ["images"],
  // 			allowsEditing: true,
  // 			aspect: [4, 3],
  // 			quality: 1,
  // 		});
  //
  // 		if (!result.canceled) {
  // 			const uri = result.assets[0].uri;
  // 			setImage(uri);
  // 			// await runOCR(uri);
  // 		}
  // 	} catch (error) {
  // 		console.error("Camera error:", error);
  // 	}
  // };

  return (
    <AppView>
      <ScreenHeader
        title="Scan Receipt"
        subtitle="Use your camera or upload a photo"
      />

      {/* <Card className="h-1/2 bg-secondary-500"> */}
      {/* 	<Box className="flex-1 border rounded-lg"> */}
      {/* 		{image ? ( */}
      {/* 			<Image */}
      {/* 				source={{ uri: image }} */}
      {/* 				resizeMode="contain" */}
      {/* 				className="flex-1 w-full" */}
      {/* 				alt="receipt" */}
      {/* 			/> */}
      {/* 		) : ( */}
      {/* 			<Center className="flex-1"> */}
      {/* 				<Text>Camera preview / Receipt image</Text> */}
      {/* 			</Center> */}
      {/* 		)} */}
      {/* 	</Box> */}
      {/* </Card> */}
      {/**/}
      {/* <VStack className="gap-4"> */}
      {/* 	<HStack className="gap-4"> */}
      {/* 		<Button */}
      {/* 			size="lg" */}
      {/* 			className="flex-1 rounded-md" */}
      {/* 			// onPress={pickImage} */}
      {/* 			disabled={isProcessing} */}
      {/* 		> */}
      {/* 			<ButtonText> */}
      {/* 				{isProcessing ? "Processing..." : "Upload Photo"} */}
      {/* 			</ButtonText> */}
      {/* 		</Button> */}
      {/* 		<Button */}
      {/* 			size="lg" */}
      {/* 			className="flex-1 rounded-md bg-secondary-500" */}
      {/* 			// onPress={openCamera} */}
      {/* 			disabled={isProcessing} */}
      {/* 		> */}
      {/* 			<ButtonText className="text-typography-500"> */}
      {/* 				{isProcessing ? "Processing..." : "Open Camera"} */}
      {/* 			</ButtonText> */}
      {/* 		</Button> */}
      {/* 	</HStack> */}
      {/**/}
      {/* 	<Box> */}
      {/* 		<Text>Detected fields (preview)</Text> */}
      {/* 		<Box className="min-h-20 p-2 border rounded bg-gray-50"> */}
      {/* 			<Text className="text-sm"> */}
      {/* 				{isProcessing */}
      {/* 					? "Processing image..." */}
      {/* 					: result || "No text detected"} */}
      {/* 			</Text> */}
      {/* 		</Box> */}
      {/* 		<Button */}
      {/* 			size="lg" */}
      {/* 			className="rounded-md mt-2" */}
      {/* 			disabled={!result || isProcessing} */}
      {/* 		> */}
      {/* 			<ButtonText>Use these details</ButtonText> */}
      {/* 		</Button> */}
      {/* 	</Box> */}
      {/* </VStack> */}
    </AppView>
  );
}
