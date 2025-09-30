import type { NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScanReview from './ScanReview';
import ScanScreen from './ScanScreen';

export type ScanScreenNames = ['Scan', 'ScanReview'];
export type ScanStackParamList = Record<ScanScreenNames[number], undefined>;
export type ScanStackNavigation = NavigationProp<ScanStackParamList>;

const Stack = createStackNavigator<ScanStackParamList>();

export default function ScanLayout() {
  return (
    <Stack.Navigator
      initialRouteName="Scan"
      screenOptions={{ headerShown: false, freezeOnBlur: true }}
    >
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="ScanReview" component={ScanReview} />
    </Stack.Navigator>
  );
}
