import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";
import { GluestackUIProvider } from "./components/ui";
import { AuthProvider } from "./contexts/AuthContext";
import BottomTabs from "./navigation/BottomTabNavigator";

function App() {
	const isDarkMode = useColorScheme() === "dark";

	return (
		<GluestackUIProvider>
			<AuthProvider>
				<SafeAreaProvider>
					<StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
					<BottomTabs />
				</SafeAreaProvider>
			</AuthProvider>
		</GluestackUIProvider>
	);
}

export default App;
