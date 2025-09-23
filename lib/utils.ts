import { type ClassValue, clsx } from "clsx";
import { PixelRatio } from "react-native";
import { twMerge } from "tailwind-merge";

const fontScale = PixelRatio.getFontScale();

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function rem(value: number) {
	return value * 16 * fontScale;
}
