import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn, rem } from "@/lib/utils";

interface Props {
	children: React.ReactNode;
	className?: string;
	safeAreClassName?: string;
}

export default function AppScrollableView({
	children,
	className,
	safeAreClassName,
	...props
}: Props) {
	return (
		<SafeAreaView className={cn("flex-1 bg-background-0", safeAreClassName)}>
			<ScrollView
				className={cn("flex-1 px-4 bg-background-0", className)}
				contentContainerStyle={{
					paddingVertical: rem(2.5),
				}}
				showsVerticalScrollIndicator={false}
				{...props}
			>
				{children}
			</ScrollView>
		</SafeAreaView>
	);
}
