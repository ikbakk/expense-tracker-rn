import AppScrollableView from "@/components/AppScrollableView";
import AppView from "@/components/AppView";
import NoExpensesView from "@/components/NoExpensesView";
import ScreenHeader from "@/components/ScreenHeader";
import {
	Box,
	Button,
	ButtonText,
	FlatList,
	HStack,
	Input,
	InputField,
	InputIcon,
	InputSlot,
	Text,
	ScrollView,
	VStack,
} from "@/components/ui";
import LinearGradients from "@/components/ui/LinearGradients";
import { dummyExpenses } from "@/lib/dummyExpenses";
import { formattedCurrency } from "@/lib/utils";
import { Search } from "lucide-react-native";

export default function Expenses() {
	const data = dummyExpenses;

	return (
		<AppView>
			<Box>
				<ScreenHeader title="Expenses" subtitle="Recent activity" />
			</Box>

			<Box className="justify-between gap-2">
				<Input size={"md"} variant={"outline"}>
					<InputSlot style={{ paddingLeft: 12 }}>
						<InputIcon as={Search} />
					</InputSlot>
					<InputField placeholder="Search item..." />
				</Input>
				<Button className="rounded-md">
					<ButtonText>Search</ButtonText>
				</Button>
			</Box>

			{data && data.length > 1 ? (
				<ExpensesExistView data={data} />
			) : (
				<NoExpensesView />
			)}
		</AppView>
	);
}

function ExpensesExistView({ data }: { data: any[] }) {
	return (
		<Box className="relative flex-1">
			<FlatList
				data={data}
				style={{ flex: 1 }}
				keyExtractor={(item) => item.id.toString()}
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={() => <Box className="h-4" />}
				renderItem={({ item }) => (
					<Box className="mb-4">
						<Box className=" border p-6 rounded-lg border-outline-200">
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
					</Box>
				)}
			/>

			<LinearGradients />
		</Box>
	);
}
