import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BarChart3,
  Camera,
  Home,
  ReceiptText,
  Settings,
} from 'lucide-react-native';
import ExpensesScreen from '@/screens/main/Expenses';
import HomeScreen from '@/screens/main/Home';
import ReportsScreen from '@/screens/main/Reports';
import ScanScreen from '@/screens/main/Scan';
import SettingsScreen from '@/screens/main/Settings';

const Tab = createBottomTabNavigator();

const tabs = [
  { name: 'Home', component: HomeScreen, icon: Home },
  { name: 'Expenses', component: ExpensesScreen, icon: ReceiptText },
  { name: 'Scan', component: ScanScreen, icon: Camera },
  { name: 'Reports', component: ReportsScreen, icon: BarChart3 },
  { name: 'Settings', component: SettingsScreen, icon: Settings },
];

export default function BottomTabs() {
  return (
    <Tab.Navigator
      backBehavior="order"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          elevation: 0,
          borderTopWidth: 0,
          shadowOpacity: 0,
          backgroundColor: 'transparent',
          marginTop: 18,
          bottom: 12,
        },
      }}
    >
      {tabs.map(tab => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
}
