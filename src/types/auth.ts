export interface User {
	name: string;
	email: string;
}

export interface AuthState {
	isLoading: boolean;
	isSignedIn: boolean;
	isGuest: boolean;
	user: User | null | unknown;
	onboardingCompleted: boolean;
}

export type AuthAction =
	| {
			type: "RESTORE_TOKEN";
			isSignedIn: boolean;
			isGuest: boolean;
			user: User | null | unknown;
			onboardingCompleted: boolean;
	  }
	| { type: "SIGN_IN"; user: User }
	| { type: "GUEST_LOGIN" }
	| { type: "SIGN_OUT" }
	| { type: "COMPLETE_ONBOARDING" };

export interface AuthContextValue extends AuthState {
	signIn: (
		email: string,
		password: string,
	) => Promise<{ success: boolean; error?: string }>;
	signUp: (
		name: string,
		email: string,
		password: string,
	) => Promise<{ success: boolean; error?: string }>;
	signOut: () => Promise<void>;
	guestLogin: () => Promise<{ success: boolean; error?: string }>;
	completeOnboarding: () => Promise<void>;
}
