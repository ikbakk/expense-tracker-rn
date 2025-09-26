import { useState } from "react";
import {
	Box,
	Button,
	ButtonText,
	HStack,
	Pressable,
	Text,
	VStack,
} from "../../components/ui";
import { useAuth } from "../../contexts/AuthContext";

const onboardingData = [
	{
		id: 1,
		title: "Welcome to Our App",
		description: "Discover amazing features and connect with others",
	},
	{
		id: 2,
		title: "Stay Connected",
		description: "Keep in touch with friends and family",
	},
	{
		id: 3,
		title: "Get Started",
		description: "Ready to begin your journey with us?",
	},
];

const OnboardingScreen = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const { completeOnboarding } = useAuth();

	const handleNext = () => {
		if (currentPage < onboardingData.length - 1) {
			setCurrentPage(currentPage + 1);
		} else {
			completeOnboarding();
		}
	};

	const handleSkip = () => {
		completeOnboarding();
	};

	return (
		<Box className="flex-1 px-5 py-12 justify-between">
			{/* Slide Content */}
			<VStack className="flex-1 justify-center items-center">
				<Text className="text-2xl text-center mb-4 " bold>
					{onboardingData[currentPage].title}
				</Text>
				<Text size="md" className="text-center">
					{onboardingData[currentPage].description}
				</Text>
			</VStack>

			{/* Pagination Dots */}
			<HStack className="justify-center my-6" space="sm">
				{onboardingData.map((_, index) => (
					<Box
						key={index}
						className="w-3 h-3 rounded-full"
						style={{
							backgroundColor:
								index === currentPage ? "$blue600" : "$trueGray400",
						}}
					/>
				))}
			</HStack>

			{/* Buttons */}
			<HStack className="justify-between items-center">
				<Pressable onPress={handleSkip}>
					<Text size="md" bold>
						Skip
					</Text>
				</Pressable>

				<Button size="md" action="primary" onPress={handleNext}>
					<ButtonText>
						{currentPage === onboardingData.length - 1 ? "Get Started" : "Next"}
					</ButtonText>
				</Button>
			</HStack>
		</Box>
	);
};

export default OnboardingScreen;
