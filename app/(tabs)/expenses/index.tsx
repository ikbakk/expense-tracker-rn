import AppScrollableView from "@/components/AppScrollableView";
import ScreenHeader from "@/components/ScreenHeader";
import { Box } from "@/components/ui";

export default function Expenses() {
	return (
		<AppScrollableView>
			<Box>
				<ScreenHeader title="Expenses" subtitle="Recent activity" />
			</Box>
		</AppScrollableView>
	);
}
