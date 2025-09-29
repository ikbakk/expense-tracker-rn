import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import appConfig from '../tamagui.config';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeProvider';
import AppNavigator from './navigation/AppNavigator';

function AppContent() {
  const { theme } = useTheme();

  // Set StatusBar style based on theme
  const barStyle = theme === 'dark_teal' ? 'light-content' : 'dark-content';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={barStyle} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <TamaguiProvider config={appConfig}>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
