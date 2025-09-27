import AppView from '@/components/common/AppView';
import ScreenHeader from '@/components/common/ScreenHeader';
import { Grid, GridItem } from '@/components/ui';
import { dummyExpenses } from '@/lib/dummyExpenses';
import SummaryCard from './SummaryCard';
import MonthlyBudget from './MonthlyBudget';
import OverviewScanner from './OverviewScanner';
import RecentExpenses from './RecentExpenses';
import { XStack } from 'tamagui';

export default function HomeScreen() {
  console.log('i am home');
  return (
    <AppView>
      <ScreenHeader
        title="Overview"
        subtitle="Your week at a glance"
        showButton={true}
        buttonText="Add Expense"
      />

      <XStack justifyContent="space-between">
        <SummaryCard smallText="This Week" biggerText="$100.00" />
        <SummaryCard
          smallText="Budget Left"
          smallTextClassName="text-typography-0"
          biggerText="$100.00"
          biggerTextClassName="text-typography-0"
          className="bg-primary-500"
        />
      </XStack>
      {/**/}
      {/* <MonthlyBudget /> */}
      {/* <OverviewScanner /> */}
      {/* <RecentExpenses data={[]} /> */}
    </AppView>
  );
}
