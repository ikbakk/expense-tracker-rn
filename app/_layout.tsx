import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Fab, FabIcon } from "@/components/ui/fab";
import { MoonIcon, SunIcon } from "@/components/ui/icon";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		Inter: require("../assets/fonts/Inter-Regular.ttf"),
		...FontAwesome.font,
	});

	const [colorMode, setColorMode] = useState<"light" | "dark">("light");

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	return (
		<GluestackUIProvider mode={colorMode}>
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerShown: false,
						contentStyle: {
							backgroundColor:
								colorMode === "light"
									? "rgb(255, 255, 255)"
									: "rgb(21, 16, 16)",
						},
					}}
				/>
			</Stack>
			{/* <Fab */}
			{/* 	onPress={() => setColorMode(colorMode === "dark" ? "light" : "dark")} */}
			{/* 	className="m-6" */}
			{/* 	size="lg" */}
			{/* > */}
			{/* 	<FabIcon as={colorMode === "dark" ? MoonIcon : SunIcon} /> */}
			{/* </Fab> */}
		</GluestackUIProvider>
	);
}
