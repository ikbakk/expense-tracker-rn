import AppScrollableView from "@/components/AppScrollableView";
import ScreenHeader from "@/components/ScreenHeader";
import { Box } from "@/components/ui";

export default function Scan() {
	return (
		<AppScrollableView>
			<Box>
				<ScreenHeader
					title="Scan Receipt"
					subtitle="Use your camera or upload a photo"
				/>
			</Box>
		</AppScrollableView>
	);
}
