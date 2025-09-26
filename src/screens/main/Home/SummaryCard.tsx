import { cn } from "@/lib/utils";
import { Card, Heading, Text } from "./ui";

interface Props {
	smallText: string;
	smallTextClassName?: string;
	biggerText: string;
	biggerTextClassName?: string;
	className?: string;
	variant?: "outline" | "elevated" | "ghost" | "filled";
}

export default function SummaryCard({
	smallText,
	smallTextClassName,
	biggerText,
	biggerTextClassName,
	className,
	variant = "filled",
}: Props) {
	return (
		<Card
			size={"lg"}
			variant={variant}
			className={cn("justify-center gap-3", className)}
		>
			<Text size={"md"} className={smallTextClassName}>
				{smallText}
			</Text>
			<Heading size={"2xl"} className={biggerTextClassName}>
				{biggerText}
			</Heading>
		</Card>
	);
}
