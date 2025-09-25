import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Stack, usePathname } from "expo-router";
import { Fab, FabIcon } from "@/components/ui/fab";
import { MoonIcon, SunIcon } from "@/components/ui/icon";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		Inter: require("../assets/fonts/Inter-Regular.ttf"),
		...FontAwesome.font,
	});

	const [styleLoaded, setStyleLoaded] = useState(false);
	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);
	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const pathname = usePathname();
	const [colorMode, setColorMode] = useState<"light" | "dark">("light");

	return (
		<GluestackUIProvider mode={colorMode}>
			<ThemeProvider value={colorMode === "dark" ? DarkTheme : DefaultTheme}>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="/home" />
				</Stack>
				{pathname !== "/" && (
					<Fab
						onPress={() =>
							setColorMode(colorMode === "dark" ? "light" : "dark")
						}
						className="m-6"
						size="lg"
					>
						<FabIcon as={colorMode === "dark" ? MoonIcon : SunIcon} />
					</Fab>
				)}
			</ThemeProvider>
		</GluestackUIProvider>
	);
}
