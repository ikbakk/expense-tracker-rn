import AppScrollableView from "@/components/AppScrollableView";
import ScreenHeader from "@/components/ScreenHeader";
import SummaryCard from "@/components/SummaryCard";
import { Box, Grid, GridItem, HStack } from "@/components/ui";

export default function Home() {
	return (
		<AppScrollableView>
			<Box className="gap-4">
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
			</Box>
		</AppScrollableView>
	);
}
