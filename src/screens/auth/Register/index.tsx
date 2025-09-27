import type { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  Button,
  Card,
  Input,
  Label,
  ScrollView,
  Text,
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
  'Register'
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const RegisterScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { signUp } = useAuth();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await signUp(name, email, password);

    if (!result.success) {
      setError(result.error || 'Registration failed');
    }

    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
                Create Account
              </Text>
              <Text fontSize="$4" color="$color10" textAlign="center">
                Join us today and get started
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
                <Label htmlFor="name" color="$color11">
                  Full Name
                </Label>
                <Input
                  placeholder="Enter your full name"
                  value={name}
                  onChangeText={setName}
                  size="$4"
                />
              </YStack>

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
                  placeholder="Create a password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  size="$4"
                />
              </YStack>

              <YStack gap="$2">
                <Label htmlFor="confirmPassword" color="$color11">
                  Confirm Password
                </Label>
                <Input
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  size="$4"
                />
              </YStack>

              <Button
                size="$5"
                onPress={handleRegister}
                disabled={isLoading}
                backgroundColor="$blue10"
                marginTop="$4"
              >
                <Text color="white" fontWeight="600">
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </Button>
            </YStack>

            {/* Footer */}
            <XStack gap="$2" alignItems="center">
              <Text fontSize="$3" color="$color9">
                Already have an account?
              </Text>
              <Button
                variant="outlined"
                size="$2"
                onPress={() => navigation.navigate('Login')}
                borderWidth={0}
              >
                <Text color="$blue10" fontWeight="600">
                  Sign In
                </Text>
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
