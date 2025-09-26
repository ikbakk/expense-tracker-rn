import React from "react";
import {
	Box,
	VStack,
	HStack,
	Text,
	Button,
	ButtonText,
	SafeAreaView,
	ScrollView,
	Card,
	Switch,
	Divider,
} from "../../components/ui";
import { useAuth } from "../../contexts/AuthContext";

const SettingsScreen = () => {
	const { user, isGuest } = useAuth();
	const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
	const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flex: 1 }}>
				<Box className="px-4 py-6">
					<VStack className="space-y-6">
						{/* Header */}
						<Text className="text-2xl font-bold text-textDark-900">
							Settings
						</Text>

						{/* App Settings */}
						<Card className="p-4 bg-white">
							<VStack className="space-y-4">
								<Text className="text-lg font-semibold">App Preferences</Text>

								<HStack className="justify-between items-center">
									<VStack className="flex-1">
										<Text className="text-md text-textDark-700">
											Push Notifications
										</Text>
										<Text className="text-sm text-textDark-500">
											Receive updates and alerts
										</Text>
									</VStack>
									<Switch
										value={notificationsEnabled}
										onValueChange={setNotificationsEnabled}
									/>
								</HStack>

								<Divider />

								<HStack className="justify-between items-center">
									<VStack className="flex-1">
										<Text className="text-md text-textDark-700">Dark Mode</Text>
										<Text className="text-sm text-textDark-500">
											Switch to dark theme
										</Text>
									</VStack>
									<Switch
										value={darkModeEnabled}
										onValueChange={setDarkModeEnabled}
									/>
								</HStack>
							</VStack>
						</Card>

						{/* Account Settings */}
						{!isGuest && (
							<Card className="p-4 bg-white">
								<VStack className="space-y-4">
									<Text className="text-lg font-semibold">Account</Text>
									<VStack className="space-y-2">
										<Button variant="outline" className="border-coolGray-300">
											<ButtonText className="text-textDark-700">
												Change Password
											</ButtonText>
										</Button>
										<Button variant="outline" className="border-coolGray-300">
											<ButtonText className="text-textDark-700">
												Manage Subscription
											</ButtonText>
										</Button>
									</VStack>
								</VStack>
							</Card>
						)}

						{/* Support */}
						<Card className="p-4 bg-white">
							<VStack className="space-y-4">
								<Text className="text-lg font-semibold">Support & Info</Text>
								<VStack className="space-y-2">
									<Button variant="outline" className="border-coolGray-300">
										<ButtonText className="text-textDark-700">
											Help Center
										</ButtonText>
									</Button>
									<Button variant="outline" className="border-coolGray-300">
										<ButtonText className="text-textDark-700">
											Privacy Policy
										</ButtonText>
									</Button>
									<Button variant="outline" className="border-coolGray-300">
										<ButtonText className="text-textDark-700">
											Terms of Service
										</ButtonText>
									</Button>
								</VStack>
							</VStack>
						</Card>

						{/* App Info */}
						<Card className="p-4 bg-coolGray-100">
							<VStack className="space-y-2 items-center">
								<Text className="text-sm text-textDark-600">
									App Version 1.0.0
								</Text>
								<Text className="text-xs text-textDark-500 text-center">
									Built with React Native & Gluestack UI
								</Text>
							</VStack>
						</Card>
					</VStack>
				</Box>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SettingsScreen;
