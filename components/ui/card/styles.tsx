import { tva } from "@gluestack-ui/utils/nativewind-utils";
import { isWeb } from "@gluestack-ui/utils/nativewind-utils";
const baseStyle = isWeb ? "flex flex-col relative z-0" : "";

export const cardStyle = tva({
	base: baseStyle,
	variants: {
		size: {
			sm: "p-3 rounded",
			md: "p-4 rounded-md",
			lg: "p-6 rounded-xl",
		},
		variant: {
			elevated: "bg-card-0",
			outline: "border bg-card-500 border-outline-400 ",
			ghost: "rounded-none",
			filled: "bg-card-50",
		},
	},
});
