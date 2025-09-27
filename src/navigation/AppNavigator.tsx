import { NavigationContainer } from '@react-navigation/native';
import { Spinner, Text, YStack } from 'tamagui';
import { useAuth } from '../contexts/AuthContext';
import OnboardingScreen from '../screens/onboarding';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';

const AppNavigator = () => {
  const { isLoading, isSignedIn, onboardingCompleted } = useAuth();

  if (isLoading) {
    return (
      <YStack flex={1} className="items-center justify-center">
        <Text color={'aqua'}>Loading...</Text>
      </YStack>
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
