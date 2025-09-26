import AsyncStorage from "@react-native-async-storage/async-storage";

export const StorageKeys = {
	ONBOARDING_COMPLETED: "onboarding_completed",
	USER_TOKEN: "user_token",
	USER_DATA: "user_data",
	IS_GUEST: "is_guest",
} as const;

export type StorageKey = keyof typeof StorageKeys;

export const storage = {
	async setItem<T>(key: string, value: T): Promise<void> {
		try {
			await AsyncStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error("Storage setItem error:", error);
		}
	},

	async getItem<T>(key: string): Promise<T | null> {
		try {
			const value = await AsyncStorage.getItem(key);
			return value ? (JSON.parse(value) as T) : null;
		} catch (error) {
			console.error("Storage getItem error:", error);
			return null;
		}
	},

	async removeItem(key: string): Promise<void> {
		try {
			await AsyncStorage.removeItem(key);
		} catch (error) {
			console.error("Storage removeItem error:", error);
		}
	},

	async clear(): Promise<void> {
		try {
			await AsyncStorage.clear();
		} catch (error) {
			console.error("Storage clear error:", error);
		}
	},
};
