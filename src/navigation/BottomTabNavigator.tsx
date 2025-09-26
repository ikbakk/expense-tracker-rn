import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
	BarChart3,
	Box,
	Camera,
	Home,
	ReceiptText,
	Settings,
	Text,
} from "lucide-react-native";
import { Icon } from "@/components/ui";
import ExpensesScreen from "@/screens/main/Expenses";
import HomeScreen from "@/screens/main/Home";
import ReportsScreen from "@/screens/main/Reports";
import ScanScreen from "@/screens/main/Scan";
import SettingsScreen from "@/screens/main/Settings";

const Tab = createBottomTabNavigator();

const tabs = [
	{
		name: "Home",
		component: HomeScreen,
		icon: Home,
	},
	{
		name: "Expenses",
		component: ExpensesScreen,
		icon: ReceiptText,
	},
	{
		name: "Scan",
		component: ScanScreen,
		icon: Camera,
	},
	{
		name: "Reports",
		component: ReportsScreen,
		icon: BarChart3,
	},
	{
		name: "Settings",
		component: SettingsScreen,
		icon: Settings,
	},
];

export default function BottomTabs() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => {
					const tab = tabs.find((t) => t.name === route.name);
					if (!tab) return {};

					return {
						headerShown: false,
						tabBarStyle: {
							elevation: 0,
							borderTopWidth: 0,
							shadowOpacity: 0,
							backgroundColor: "transparent",
							marginTop: 18,
							bottom: 12,
						},
						tabBarIcon: ({ color, focused }) => {
							// Bigger styled Scan tab
							if (tab.name === "Scan") {
								return (
									<Box className="p-5 bg-primary-500 rounded-full">
										<Icon as={tab.icon} size={32} color="white" />
									</Box>
								);
							}

							// Default icon
							return <Icon as={tab.icon} size={24} color={color} />;
						},
						tabBarLabel:
							tab.name === "Scan"
								? () => null
								: ({ color }) => (
										<Text className="text-xs" style={{}}>
											{tab.name}
										</Text>
									),
					};
				}}
			>
				{tabs.map((tab) => (
					<Tab.Screen
						key={tab.name}
						name={tab.name}
						component={tab.component}
					/>
				))}
			</Tab.Navigator>
		</NavigationContainer>
	);
}
