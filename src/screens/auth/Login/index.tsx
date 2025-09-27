import type { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  Button,
  Card,
  Input,
  Label,
  ScrollView,
  Separator,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui';
import { useAuth } from '@/contexts/AuthContext';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: Props) {
  console.log('i want login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, guestLogin } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await signIn(email, password);

    if (!result.success) {
      setError(result.error || 'Login failed');
    }

    setIsLoading(false);
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    const result = await guestLogin();
    setIsLoading(false);
  };

  return (
    <ScrollView flex={1} contentContainerStyle={{ flexGrow: 1 }}>
      <YStack
        flex={1}
        paddingHorizontal="$6"
        paddingVertical="$8"
        justifyContent="center"
      >
        <YStack gap="$6" alignItems="center">
          {/* Header */}
          <YStack gap="$2" alignItems="center">
            <Text fontSize="$8" fontWeight="bold" color="$color12">
              Welcome Back
            </Text>
            <Text fontSize="$4" color="$color10" textAlign="center">
              Sign in to your account to continue
            </Text>
          </YStack>

          {/* Form */}
          <YStack gap="$4" width="100%">
            {error ? (
              <Card padding="$3" backgroundColor="$red3" borderColor="$red6">
                <Text color="$red11" fontSize="$3">
                  {error}
                </Text>
              </Card>
            ) : null}

            <YStack gap="$2">
              <Label htmlFor="email" color="$color11">
                Email
              </Label>
              <Input
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                size="$4"
              />
            </YStack>

            <YStack gap="$2">
              <Label htmlFor="password" color="$color11">
                Password
              </Label>
              <Input
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                size="$4"
              />
            </YStack>

            <Button
              size="$5"
              onPress={handleLogin}
              disabled={isLoading}
              backgroundColor="$blue10"
              marginTop="$4"
            >
              <Text color="white" fontWeight="600">
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </Button>

            <YStack alignItems="center" gap="$2">
              <Separator />
              <Text fontSize="$3" color="$color9">
                or
              </Text>
            </YStack>

            <Button
              variant="outlined"
              size="$5"
              onPress={handleGuestLogin}
              disabled={isLoading}
              borderColor="$gray8"
            >
              <Text color="$color11">Continue as Guest</Text>
            </Button>
          </YStack>

          {/* Footer */}
          <XStack gap="$2" alignItems="center">
            <Text fontSize="$3" color="$color9">
              Don't have an account?
            </Text>
            <Button
              variant="outlined"
              size="$2"
              onPress={() => navigation.navigate('Register')}
              borderWidth={0}
            >
              <Text color="$blue10" fontWeight="600">
                Sign Up
              </Text>
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
