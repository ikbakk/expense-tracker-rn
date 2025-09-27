import { Frown } from 'lucide-react-native';
import { FlatList } from 'react-native';
import { formattedCurrency } from '@/lib/utils';

import LinearGradients from '@/components/ui/LinearGradients';
import NoExpensesView from '@/screens/main/Expenses/NoExpensesView';
import { Button, Card, SizableText, Text, XStack, YStack } from 'tamagui';

//  TODO: change type any[]

interface Props {
  data: any[];
}

export default function RecentExpenses({ data }: Props) {
  return (
    <Card size="$4" flex={1} padded bordered>
      <YStack className="flex-1">
        <XStack className="items-center justify-between">
          <Text>Recent expenses</Text>

          {data && data.length > 1 && <Button>View all</Button>}
        </XStack>

        {data && data.length > 1 ? (
          <RecentExpensesExisted data={data} />
        ) : (
          <NoExpensesView />
        )}
      </YStack>
    </Card>
  );
}

function RecentExpensesExisted({ data }: { data: any[] }) {
  return (
    <YStack flex={1} style={{ position: 'relative', flex: 1 }}>
      <FlatList
        data={data}
        style={{ flex: 1 }}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <YStack my={2} pb={2}>
            <XStack items={'center'} justify={'space-between'}>
              <YStack>
                <SizableText size={'$4'}>{item.category}</SizableText>
                <Text>{item.description}</Text>
              </YStack>
              <SizableText size={'$4'}>
                {formattedCurrency(item.amount_cents)}
              </SizableText>
            </XStack>
          </YStack>
        )}
      />

      <LinearGradients />
    </YStack>
  );
}
