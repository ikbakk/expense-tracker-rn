import AppScrollableView from "@/components/common/AppScrollableView";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Box } from "@/components/ui";

export default function ReportsScreen() {
	return (
		<AppScrollableView>
			<Box>
				<ScreenHeader
					title="Reports"
					subtitle="Weekly and category breakdown"
				/>
			</Box>
		</AppScrollableView>
	);
}
