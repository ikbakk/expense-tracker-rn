import AppView from '@/components/common/AppView';
import ScreenHeader from '@/components/common/ScreenHeader';
import { dummyExpenses } from '@/lib/dummyExpenses';
import SummaryCard from './SummaryCard';
import MonthlyBudget from './MonthlyBudget';
import OverviewScanner from './OverviewScanner';
import RecentExpenses from './RecentExpenses';
import { XStack } from 'tamagui';
import { useTheme } from '@/contexts/ThemeProvider';

export default function HomeScreen() {
  const { theme } = useTheme();

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
        <SummaryCard smallText="Budget Left" biggerText="$100.00" />
      </XStack>

      <MonthlyBudget />
      <OverviewScanner />
      <RecentExpenses data={dummyExpenses} />
    </AppView>
  );
}
