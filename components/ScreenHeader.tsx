import { Box, Button, ButtonText, Heading, HStack, Text } from "./ui";

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
				<Heading size={"3xl"}>{title}</Heading>
				<Text>{subtitle}</Text>
			</Box>
			{showButton && (
				<Box className="">
					<Button size={"xl"} className="rounded-lg ">
						<ButtonText>{buttonText}</ButtonText>
					</Button>
				</Box>
			)}
		</HStack>
	);
}
