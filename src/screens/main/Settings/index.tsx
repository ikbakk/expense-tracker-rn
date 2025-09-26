import AppScrollableView from "@/components/common/AppScrollableView";
import ScreenHeader from "@/components/common/ScreenHeader";
import { Box } from "@/components/ui";

export default function Settings() {
	return (
		<AppScrollableView>
			<Box>
				<ScreenHeader title="Settings" subtitle="Profile and appearance" />
			</Box>
		</AppScrollableView>
	);
}
