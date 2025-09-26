import { useState } from "react";
import {
	Badge,
	BadgeText,
	Box,
	Button,
	ButtonText,
	Card,
	HStack,
	Input,
	InputField,
	InputIcon,
	InputSlot,
	SafeAreaView,
	ScrollView,
	Text,
	VStack,
} from "../../components/ui";

const ExploreScreen = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const categories = [
		{ id: 1, name: "Technology", count: 42 },
		{ id: 2, name: "Design", count: 28 },
		{ id: 3, name: "Business", count: 35 },
		{ id: 4, name: "Health", count: 19 },
		{ id: 5, name: "Travel", count: 24 },
		{ id: 6, name: "Food", count: 31 },
	];

	const popularItems = [
		{
			id: 1,
			title: "Getting Started with React Native",
			category: "Technology",
		},
		{ id: 2, title: "UI/UX Design Principles", category: "Design" },
		{ id: 3, title: "Building Scalable Apps", category: "Technology" },
		{ id: 4, title: "Healthy Living Tips", category: "Health" },
	];

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flex: 1 }}>
				<Box className="px-4 py-6">
					<VStack className="space-y-6">
						{/* Header */}
						<VStack className="space-y-2">
							<Text className="text-2xl font-bold text-dark-900">Explore</Text>
							<Text className="text-sm text-dark-600">
								Discover new content and categories
							</Text>
						</VStack>

						{/* Search */}
						<Input>
							<InputField
								placeholder="Search for anything..."
								value={searchQuery}
								onChangeText={setSearchQuery}
							/>
							<InputSlot className="pr-3">
								<InputIcon
									as={() => (
										<Box className="w-4 h-4 bg-coolGray-400 rounded-sm" />
									)}
								/>
							</InputSlot>
						</Input>

						{/* Categories */}
						<Card className="p-4 bg-white">
							<VStack className="space-y-4">
								<Text className="text-lg font-semibold">Browse Categories</Text>
								<VStack className="space-y-2">
									{categories.map((category) => (
										<Button
											key={category.id}
											variant="outline"
											className="border-coolGray-300 justify-between"
										>
											<ButtonText className="text-dark-700">
												{category.name}
											</ButtonText>
											<Badge
												className="ml-2 bg-primary-500"
												size="sm"
												variant="solid"
											>
												<BadgeText className="text-white">
													{category.count}
												</BadgeText>
											</Badge>
										</Button>
									))}
								</VStack>
							</VStack>
						</Card>

						{/* Popular Content */}
						<Card className="p-4 bg-white">
							<VStack className="space-y-4">
								<Text className="text-lg font-semibold">Popular Content</Text>
								<VStack className="space-y-2">
									{popularItems.map((item) => (
										<Box
											key={item.id}
											className="p-3 bg-coolGray-50 rounded-md"
										>
											<VStack className="space-y-1">
												<Text className="text-md font-medium text-dark-800">
													{item.title}
												</Text>
												<HStack className="items-center">
													<Badge
														size="xs"
														variant="outline"
														className="border-primary-300"
													>
														<BadgeText className="text-primary-600">
															{item.category}
														</BadgeText>
													</Badge>
												</HStack>
											</VStack>
										</Box>
									))}
								</VStack>
							</VStack>
						</Card>

						{/* Quick Actions */}
						<Card className="p-4 bg-white">
							<VStack className="space-y-4">
								<Text className="text-lg font-semibold">Quick Actions</Text>
								<HStack className="space-x-2">
									<Button className="flex-1 bg-primary-500">
										<ButtonText className="text-white">Create New</ButtonText>
									</Button>
									<Button
										className="flex-1 border border-coolGray-300"
										variant="outline"
									>
										<ButtonText className="text-dark-700">
											Browse All
										</ButtonText>
									</Button>
								</HStack>
							</VStack>
						</Card>
					</VStack>
				</Box>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ExploreScreen;
