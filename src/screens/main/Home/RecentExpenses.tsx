import { FlatList } from 'react-native';
import { SizableText, Text, XStack, YStack } from 'tamagui';
import { CustomButton, CustomCard } from '@/components/ui';
import LinearGradients from '@/components/ui/LinearGradients';
import { formattedCurrency } from '@/lib/utils';
import NoExpensesView from '@/screens/main/Expenses/NoExpensesView';

//  TODO: change type any[]
interface Props {
  data: any[];
}

export default function RecentExpenses({ data }: Props) {
  return (
    <CustomCard flex={1}>
      <YStack flex={1}>
        <XStack justify={'space-between'} items={'center'}>
          <Text>Recent expenses</Text>

          {data && data.length > 1 && (
            <CustomButton size={'$4'} buttonText={'View all'} />
          )}
        </XStack>

        {data && data.length > 1 ? (
          <RecentExpensesExisted data={data} />
        ) : (
          <NoExpensesView />
        )}
      </YStack>
    </CustomCard>
  );
}

function RecentExpensesExisted({ data }: { data: any[] }) {
  return (
    <YStack flex={1} style={{ position: 'relative' }}>
      <FlatList
        data={data}
        style={{ flex: 1 }}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <YStack my={2} pb={2}>
            <XStack items={'center'} justify={'space-between'}>
              <YStack>
                <SizableText
                  color={'$foreground'}
                  fontWeight={'700'}
                  size={'$4'}
                >
                  {item.category}
                </SizableText>
                <SizableText color={'$mutedForeground'}>
                  {item.description}
                </SizableText>
              </YStack>
              <SizableText color={'$destructive'} size={'$4'}>
                - {formattedCurrency(item.amount_cents)}
              </SizableText>
            </XStack>
          </YStack>
        )}
      />

      <LinearGradients />
    </YStack>
  );
}
