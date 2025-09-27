import {
	Card,
	HStack,
	Progress,
	ProgressFilledTrack,
	Text,
} from "@/components/ui";

export default function MonthlyBudget() {
	return (
		<Card variant="outline" size="lg" className="gap-2">
			<HStack className="justify-between items-center">
				<Text size="lg">Monthly budget</Text>
				<Text>60% used</Text>
			</HStack>
			<Progress value={60} orientation="horizontal">
				<ProgressFilledTrack />
			</Progress>
			<Text>Budget: 1000 | Spent: 600</Text>
		</Card>
	);
}
