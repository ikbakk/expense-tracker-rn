import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import { FlatList } from "react-native";
import { dummyExpenses } from "@/lib/dummyExpenses";
import { formattedCurrency } from "@/lib/utils";
import { Box, Button, ButtonText, Card, HStack, Text, VStack } from "./ui";

export default function RecentExpenses() {
	const { colorScheme } = useColorScheme();
	const cardBg =
		colorScheme === "light" ? "rgb(255, 255, 255)" : "rgb(21, 16, 16)";
	return (
		<Card variant="outline" size="lg" className="flex-1">
			<VStack className="flex-1">
				<HStack className="items-center justify-between">
					<Text>Recent expenses</Text>
					<Button variant="link">
						<ButtonText>View all</ButtonText>
					</Button>
				</HStack>

				<Box className="relative flex-1">
					<FlatList
						data={dummyExpenses}
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

					{/* Top fade */}
					<LinearGradient
						colors={[cardBg, "transparent"]}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							height: 16,
							zIndex: 10,
						}}
					/>

					{/* Bottom fade */}
					<LinearGradient
						colors={["transparent", cardBg]}
						style={{
							position: "absolute",
							bottom: 0,
							left: 0,
							right: 0,
							height: 16,
							zIndex: 10,
						}}
					/>
				</Box>
			</VStack>
		</Card>
	);
}
