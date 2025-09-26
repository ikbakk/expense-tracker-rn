import { NavigationContainer } from "@react-navigation/native";
import { Spinner, Center } from "../components/ui";
import { useAuth } from "../contexts/AuthContext";
import OnboardingScreen from "../screens/onboarding";
import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";

const AppNavigator = () => {
	const { isLoading, isSignedIn, onboardingCompleted } = useAuth();

	if (isLoading) {
		return (
			<Center className="flex-1 ">
				<Spinner size="large" />
			</Center>
		);
	}

	return (
		<NavigationContainer>
			{!onboardingCompleted ? (
				<OnboardingScreen />
			) : !isSignedIn ? (
				<AuthNavigator />
			) : (
				<BottomTabNavigator />
			)}
		</NavigationContainer>
	);
};

export default AppNavigator;
