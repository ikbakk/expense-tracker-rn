import AppScrollableView from "@/components/AppScrollableView";
import ScreenHeader from "@/components/ScreenHeader";
import { Box } from "@/components/ui";

export default function Reports() {
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
