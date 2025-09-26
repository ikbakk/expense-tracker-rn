import { Tabs } from "expo-router";
import {
	BarChart3,
	Camera,
	Home,
	ReceiptText,
	Settings,
} from "lucide-react-native";
import { Box, Icon } from "@/components/ui";
const tabs = [
	{
		name: "home/index",
		title: "Home",
		icon: Home,
	},
	{
		name: "expenses/index",
		title: "Expenses",
		icon: ReceiptText,
	},
	{
		name: "scan/index",
		title: "Scan",
		icon: Camera,
	},
	{
		name: "reports/index",
		title: "Reports",
		icon: BarChart3,
	},
	{
		name: "settings/index",
		title: "Settings",
		icon: Settings,
	},
];

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={({ route }) => {
				const tab = tabs.find((t) => route.name.includes(t.name));
				if (!tab) return {};

				return {
					headerShown: false,
					tabBarStyle: {
						elevation: 0,
						borderTopWidth: 0,
						shadowOpacity: 0,
						bottom: 12,
						marginTop: 18,
						backgroundColor: "transparent",
					},
					tabBarIcon: ({ color }) => {
						// Bigger middle/focused tab
						if (tab.name === "scan/index") {
							return (
								<Box className="p-5 bg-primary-500 rounded-full">
									<Icon as={tab.icon} size={32} color="white" />
								</Box>
							);
						}

						// Default icon
						return <Icon as={tab.icon} size={24} color={color} />;
					},

					tabBarLabel: tab.name === "scan/index" ? () => null : tab.title,
				};
			}}
		>
			{tabs.map((tab) => (
				<Tabs.Screen
					key={tab.name}
					name={tab.name}
					options={{ title: tab.title }}
				/>
			))}
		</Tabs>
	);
}
