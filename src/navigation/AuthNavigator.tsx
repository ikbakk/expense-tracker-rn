import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '@/screens/auth/Login';
import RegisterScreen from '@/screens/auth/Register';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  console.log('i am here');
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
