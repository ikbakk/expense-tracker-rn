import { XStack } from 'tamagui';
import AppView from '@/components/common/AppView';
import ScreenHeader from '@/components/common/ScreenHeader';
import { dummyExpenses } from '@/lib/dummyExpenses';
import MonthlyBudget from './MonthlyBudget';
import OverviewScanner from './OverviewScanner';
import RecentExpenses from './RecentExpenses';
import SummaryCard from './SummaryCard';

export default function HomeScreen() {
  return (
    <AppView>
      <ScreenHeader
        title="Overview"
        subtitle="Your week at a glance"
        showButton={true}
        buttonText="Add Expense"
      />
      <XStack justify="space-between" gap={'$4'}>
        <SummaryCard smallText="This Week " biggerText="$100.00" />
        <SummaryCard smallText="Budget Left" biggerText="$100.00" inversed />
      </XStack>
      <MonthlyBudget />
      <OverviewScanner />
      <RecentExpenses data={dummyExpenses} />
    </AppView>
  );
}
