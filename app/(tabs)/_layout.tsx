import { Tabs } from "expo-router";
import {
	BarChart3,
	Camera,
	Home,
	ReceiptText,
	Settings,
} from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

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
			screenOptions={{
				headerShown: useClientOnlyValue(false, false),
			}}
		>
			{tabs.map((tab) => (
				<Tabs.Screen
					key={tab.name}
					name={tab.name}
					options={{
						title: tab.title,
						popToTopOnBlur: true,
						tabBarIcon: ({ color }) => <Icon as={tab.icon} color={color} />,
					}}
				/>
			))}
		</Tabs>
	);
}
