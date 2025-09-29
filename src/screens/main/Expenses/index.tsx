import { FlatList } from 'react-native';
import { Input, SizableText, View, XStack, YStack } from 'tamagui';
import AppView from '@/components/common/AppView';
import ScreenHeader from '@/components/common/ScreenHeader';
import { CustomButton } from '@/components/ui';
import LinearGradients from '@/components/ui/LinearGradients';
import { dummyExpenses } from '@/lib/dummyExpenses';
import { formattedCurrency } from '@/lib/utils';
import NoExpensesView from './NoExpensesView';

export default function ExpensesScreen() {
  const data = dummyExpenses;

  return (
    <AppView>
      <ScreenHeader title="Expenses" subtitle="Recent activity" />

      <YStack gap={'$2'} justify={'space-between'}>
        <Input
          size={'$4'}
          placeholder="Search..."
          bg={'$bg'}
          placeholderTextColor={'$primary'}
          borderColor={'$primary'}
        ></Input>
        <CustomButton buttonText="Search" />
      </YStack>

      {data && data.length > 1 ? (
        <ExpensesExistView data={data} />
      ) : (
        <NoExpensesView />
      )}
    </AppView>
  );
}

// TODO: change any type

function ExpensesExistView({ data }: { data: any[] }) {
  return (
    <View flex={1} position="relative">
      <FlatList
        data={data}
        style={{ flex: 1 }}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View mt={'$2'}>
            <YStack
              rounded={'$4'}
              p={6}
              borderBottomWidth={1}
              borderColor={'$outline'}
            >
              <XStack items={'center'} justify={'space-between'}>
                <YStack>
                  <SizableText
                    color={'$foreground'}
                    size={'$6'}
                    fontWeight={'700'}
                  >
                    {item.category}
                  </SizableText>
                  <SizableText color={'$mutedForeground'} size="$4">
                    {item.description}
                  </SizableText>
                </YStack>
                <SizableText color={'$destructive'} size="$6">
                  - {formattedCurrency(item.amount_cents)}
                </SizableText>
              </XStack>
            </YStack>
          </View>
        )}
      />

      <LinearGradients />
    </View>
  );
}
