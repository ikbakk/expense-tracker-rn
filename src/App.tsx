import { NewAppScreen } from "@react-native/new-app-screen";
import { StatusBar, StyleSheet, useColorScheme, View } from "react-native";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import "./global.css";
import { GluestackUIProvider } from "./components/ui";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
	const isDarkMode = useColorScheme() === "dark";

	return (
		<GluestackUIProvider>
			<AuthProvider>
				<SafeAreaProvider>
					<StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
					<AppContent />
				</SafeAreaProvider>
			</AuthProvider>
		</GluestackUIProvider>
	);
}

function AppContent() {
	const safeAreaInsets = useSafeAreaInsets();

	return (
		<View style={styles.container}>
			<NewAppScreen
				templateFileName="App.tsx"
				safeAreaInsets={safeAreaInsets}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
