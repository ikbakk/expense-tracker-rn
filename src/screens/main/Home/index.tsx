import AppView from "@/components/common/AppView";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Grid, GridItem } from "@/components/ui";
import { dummyExpenses } from "@/lib/dummyExpenses";
import SummaryCard from "./SummaryCard";
import MonthlyBudget from "./MonthlyBudget";
import OverviewScanner from "./OverviewScanner";
import RecentExpenses from "./RecentExpenses";

export default function Home() {
	return (
		<AppView>
			<ScreenHeader
				title="Overview"
				subtitle="Your week at a glance"
				showButton={true}
				buttonText="Add Expense"
			/>

			<Grid className="gap-4" _extra={{ className: "grid-cols-2" }}>
				<GridItem _extra={{ className: "col-span-1" }}>
					<SummaryCard
						variant="outline"
						smallText="This Week"
						biggerText="$100.00"
					/>
				</GridItem>
				<GridItem _extra={{ className: "col-span-1" }}>
					<SummaryCard
						variant="elevated"
						smallText="Budget Left"
						smallTextClassName="text-typography-0"
						biggerText="$100.00"
						biggerTextClassName="text-typography-0"
						className="bg-primary-500"
					/>
				</GridItem>
			</Grid>

			<MonthlyBudget />
			<OverviewScanner />
			<RecentExpenses data={[]} />
		</AppView>
	);
}
