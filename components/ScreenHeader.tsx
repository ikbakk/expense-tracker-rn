import { Box, Button, ButtonText, HStack, Text } from "./ui";

interface ScreenHeaderProps {
	title: string;
	subtitle?: string;
	showButton?: boolean;
	buttonText?: string;
}

export default function ScreenHeader({
	title,
	buttonText,
	showButton,
	subtitle,
}: ScreenHeaderProps) {
	return (
		<HStack space={"lg"} className="items-center justify-between p-1">
			<Box className="w-fit">
				<Text className="text-2xl font-bold text-typography-900">{title}</Text>
				<Text className="text-typography-500">{subtitle}</Text>
			</Box>
			{showButton && (
				<Box className="">
					<Button size={"md"} className="rounded-lg ">
						<ButtonText>{buttonText}</ButtonText>
					</Button>
				</Box>
			)}
		</HStack>
	);
}
