import { Frown } from "lucide-react-native";
import { FlatList } from "react-native";
import { formattedCurrency } from "@/lib/utils";
import {
	Box,
	Button,
	ButtonText,
	Card,
	Center,
	HStack,
	Icon,
	Text,
	VStack,
} from "./ui";
import LinearGradients from "./ui/LinearGradients";
import NoExpensesView from "./NoExpensesView";

//  TODO: change type any[]

interface Props {
	data: any[];
}

export default function RecentExpenses({ data }: Props) {
	return (
		<Card variant="outline" size="lg" className="flex-1">
			<VStack className="flex-1">
				<HStack className="items-center justify-between">
					<Text>Recent expenses</Text>

					{data && data.length > 1 && (
						<Button variant="link">
							<ButtonText>View all</ButtonText>
						</Button>
					)}
				</HStack>

				{data && data.length > 1 ? (
					<RecentExpensesExisted data={data} />
				) : (
					<NoExpensesView />
				)}
			</VStack>
		</Card>
	);
}

function RecentExpensesExisted({ data }: { data: any[] }) {
	return (
		<Box className="relative flex-1">
			<FlatList
				data={data}
				style={{ flex: 1 }}
				keyExtractor={(item) => item.id.toString()}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<Box className="my-2 border-b pb-2 border-outline-200">
						<HStack className="items-center justify-between">
							<VStack>
								<Text bold size="xl">
									{item.category}
								</Text>
								<Text size="sm" className="text-typography-500">
									{item.description}
								</Text>
							</VStack>
							<Text size="lg">{formattedCurrency(item.amount_cents)}</Text>
						</HStack>
					</Box>
				)}
			/>

			<LinearGradients />
		</Box>
	);
}
