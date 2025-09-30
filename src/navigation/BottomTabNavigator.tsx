import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'tamagui';
import CustomIcon, { type IconName } from '@/components/ui/CustomIcon';
import ExpensesScreen from '@/screens/main/Expenses';
import HomeScreen from '@/screens/main/Home';
import ReportsScreen from '@/screens/main/Reports';
import ScanLayout from '@/screens/main/Scan/layout';
import SettingsScreen from '@/screens/main/Settings';

const Tab = createBottomTabNavigator();

const tabs = [
  { name: 'Home', component: HomeScreen, icon: 'home' },
  { name: 'Expenses', component: ExpensesScreen, icon: 'receiptText' },
  { name: 'Scan', component: ScanLayout, icon: 'camera' },
  { name: 'Reports', component: ReportsScreen, icon: 'barChart3' },
  { name: 'Settings', component: SettingsScreen, icon: 'settings' },
];

export default function BottomTabs() {
  return (
    <Tab.Navigator
      backBehavior="order"
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            elevation: 0,
            borderTopWidth: 0,
            shadowOpacity: 0,
            backgroundColor: 'transparent',
            height: 70,
          },
          tabBarIcon: ({ color }) => {
            if (route.name === 'Scan') {
              const icon = tabs.find(t => t.name === 'Scan')?.icon as IconName;
              return (
                <View
                  width={60}
                  height={60}
                  justify={'center'}
                  items={'center'}
                  style={{
                    backgroundColor: '#43cdba', // your primary color
                    borderRadius: 30,
                  }}
                >
                  <CustomIcon name={icon} size={32} color="white" />
                </View>
              );
            }

            const icon = tabs.find(t => t.name === route.name)
              ?.icon as IconName;
            return (
              <CustomIcon name={icon ? icon : 'home'} size={24} color={color} />
            );
          },
        };
      }}
    >
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: tab.name === 'Scan' ? () => null : tab.name,
            tabBarActiveTintColor: '#43cdba',
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
