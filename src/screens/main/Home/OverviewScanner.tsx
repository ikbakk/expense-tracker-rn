import {
	Button,
	ButtonText,
	Card,
	HStack,
	Text,
	VStack,
} from "@/components/ui";

export default function OverviewScanner() {
	return (
		<Card variant="outline" size="lg">
			<HStack className="justify-between items-center">
				<VStack space="xs" className="gap-2">
					<Text>Scan your next receipt</Text>
					<Text size="sm" className="text-typography-500">
						Fast OCR to auto-fill
					</Text>
				</VStack>
				<Button className="rounded-md">
					<ButtonText>Open Scanner</ButtonText>
				</Button>
			</HStack>
		</Card>
	);
}
