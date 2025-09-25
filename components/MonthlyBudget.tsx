import { Card, HStack, Progress, ProgressFilledTrack, Text } from "./ui";

export default function MonthlyBudget() {
	return (
		<Card variant="outline" size="lg" className="gap-4">
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
