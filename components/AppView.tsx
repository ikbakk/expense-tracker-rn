import { SafeAreaView } from "react-native-safe-area-context";
import { cn, rem } from "@/lib/utils";
import { Box } from "./ui";

interface Props {
	children: React.ReactNode;
	className?: string;
	safeAreClassName?: string;
}

export default function AppView({
	children,
	className,
	safeAreClassName,
	...props
}: Props) {
	return (
		<SafeAreaView className={cn("flex-1 bg-background-0", safeAreClassName)}>
			<Box
				className={cn("flex-1 px-4 pb-4 bg-background-0", className)}
				style={{
					paddingTop: rem(2.5),
				}}
				{...props}
			>
				{children}
			</Box>
		</SafeAreaView>
	);
}
