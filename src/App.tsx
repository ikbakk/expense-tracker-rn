import '../global.css';
import { defaultConfig } from '@tamagui/config/v4'; // for quick config install this
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createTamagui, TamaguiProvider } from 'tamagui';
import { AuthProvider } from './contexts/AuthContext';
import AppNavigator from './navigation/AppNavigator';

const config = createTamagui(defaultConfig);

function App() {
  return (
    <TamaguiProvider config={config}>
      <AuthProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <AppNavigator />
        </SafeAreaView>
      </AuthProvider>
    </TamaguiProvider>
  );
}

export default App;
