import { Input, Label, Theme, XStack, YStack } from 'tamagui';
import AppView from '@/components/common/AppView';
import ScreenHeader from '@/components/common/ScreenHeader';
import { CustomButton, CustomCard } from '@/components/ui';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { useTheme } from '@/contexts/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import type { ScanStackNavigation } from './layout';

export default function ScanReview() {
  const { theme } = useTheme();
  const { goBack } = useNavigation<ScanStackNavigation>();

  const saveExpense = () => {
    console.log('saved');

    goBack();
  };
  return (
    <AppView>
      <ScreenHeader title="Review & save" />

      <CustomCard flex={1}>
        <Theme name={theme === 'light_teal' ? 'light' : 'dark'}>
          <XStack gap={'$4'} justify={'space-between'} items={'center'}>
            <YStack flex={1}>
              <Label>Amount</Label>
              <Input placeholder="Amount" />
            </YStack>
            <YStack flex={1}>
              <Label>Date</Label>
              <Input placeholder="Date" />
            </YStack>
          </XStack>

          <YStack flex={1}>
            <YStack>
              <Label>Merchant</Label>
              <Input placeholder="Merchant" />
            </YStack>
            <YStack>
              <CustomSelect items={items} />
            </YStack>
          </YStack>
        </Theme>
        <CustomButton buttonText={'Save expense'} onPress={saveExpense} />
      </CustomCard>
    </AppView>
  );
}

const items = [
  { name: 'Apple' },
  { name: 'Pear' },
  { name: 'Blackberry' },
  { name: 'Peach' },
  { name: 'Apricot' },
  { name: 'Melon' },
  { name: 'Honeydew' },
];
