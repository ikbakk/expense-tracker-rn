import { useNavigation } from '@react-navigation/native';
import { Input, Label, Theme, XStack, YStack } from 'tamagui';
import AppView from '@/components/common/AppView';
import ScreenHeader from '@/components/common/ScreenHeader';
import { CustomButton, CustomCard } from '@/components/ui';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { useTheme } from '@/contexts/ThemeProvider';
import type { ScanStackNavigation } from './layout';
import { useScanScreenStore } from '@/stores/screens';
import { useForm, Controller } from 'react-hook-form';

interface Inputs {
  amount_cents: string;
  date: string;
  merchant: string;
  category: string;
}

export default function ScanReview() {
  const { theme } = useTheme();
  const { payload } = useScanScreenStore();
  const { goBack } = useNavigation<ScanStackNavigation>();

  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      amount_cents: payload.amount_cents || '',
      date: payload.date || '',
      merchant: payload.merchant || '',
      category: 'Others',
    },
  });

  const saveExpense = (data: Inputs) => {
    console.log('saved', data);
    goBack();
  };

  return (
    <AppView>
      <ScreenHeader title="Review & save" />

      <CustomCard gap={'$2'}>
        <Theme name={theme === 'light_teal' ? 'light' : 'dark'}>
          <XStack gap="$4" justify="space-between" items="center">
            <YStack flex={1}>
              <Label>Amount</Label>
              <Controller
                control={control}
                name="amount_cents"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Amount"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />
            </YStack>

            <YStack flex={1}>
              <Label>Date</Label>
              <Controller
                control={control}
                name="date"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Date"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />
            </YStack>
          </XStack>

          <YStack>
            <YStack>
              <Label>Merchant</Label>
              <Controller
                control={control}
                name="merchant"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Merchant"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />
            </YStack>

            <YStack>
              <CustomSelect items={items} />
            </YStack>
          </YStack>
        </Theme>

        <CustomButton
          mt={'$2'}
          buttonText="Save expense"
          onPress={handleSubmit(saveExpense)}
        />
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
