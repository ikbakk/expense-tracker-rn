import { dummyExpenses } from "@/lib/dummyExpenses";
import { formattedCurrency } from "@/lib/utils";
import { Box, Button, ButtonText, Card, HStack, Text, VStack } from "./ui";

export default function RecentExpenses() {
	return (
		<Card variant="outline" size="lg">
			<VStack>
				<HStack className="justify-between items-center">
					<Text>Recent expenses</Text>
					<Button variant="link">
						<ButtonText>View all</ButtonText>
					</Button>
				</HStack>

				{dummyExpenses.map((expense) => (
					<Box key={expense.id} className="border-1 my-3">
						<HStack className="justify-between items-center">
							<VStack>
								<Text bold size="xl">
									{expense.category}
								</Text>
								<Text size="sm" className="text-typography-500">
									{expense.description}
								</Text>
							</VStack>
							<Text size="lg">{formattedCurrency(expense.amount_cents)}</Text>
						</HStack>
					</Box>
				))}
			</VStack>
		</Card>
	);
}
