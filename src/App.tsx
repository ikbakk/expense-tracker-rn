import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TamaguiProvider, useTheme as useTamaguiTheme } from 'tamagui';
import appConfig from '../tamagui.config';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeProvider';
import AppNavigator from './navigation/AppNavigator';

function AppContent() {
  const { theme } = useTheme();
  const tamaguiTheme = useTamaguiTheme();

  // Set StatusBar style based on theme
  const barStyle = theme === 'dark_teal' ? 'light-content' : 'dark-content';

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: tamaguiTheme.background.get() }}
    >
      <StatusBar barStyle={barStyle} />
      <AppNavigator />
    </SafeAreaView>
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
