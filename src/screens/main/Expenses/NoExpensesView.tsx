import { Frown } from "lucide-react-native";
import { Center, Icon, Text } from "./ui";

export default function NoExpensesView() {
	return (
		<Center className="flex-1">
			<Icon as={Frown} size={32} className="text-typography-500" />
			<Text>No recent expenses yet</Text>
		</Center>
	);
}
