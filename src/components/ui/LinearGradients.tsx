import LinearGradient from "react-native-linear-gradient";
import { useColorScheme } from "nativewind";

export default function LinearGradients() {
	const { colorScheme } = useColorScheme();

	const cardBg =
		colorScheme === "light" ? "rgb(255, 255, 255)" : "rgb(21, 16, 16)";

	return (
		<>
			{/* Top fade */}
			<LinearGradient
				colors={[cardBg, "transparent"]}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					height: 16,
					zIndex: 10,
				}}
			/>

			{/* Bottom fade */}
			<LinearGradient
				colors={["transparent", cardBg]}
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					height: 16,
					zIndex: 10,
				}}
			/>
		</>
	);
}
