import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import type {
  AuthAction,
  AuthContextValue,
  AuthState,
  User,
} from '../types/auth';
import { StorageKeys, storage } from '../utils/storage';

const AuthContext = createContext<AuthContextValue | undefined>(
  {} as AuthContextValue,
);

const initialState: AuthState = {
  isLoading: true,
  isSignedIn: false,
  isGuest: false,
  user: null,
  onboardingCompleted: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        isLoading: false,
        isSignedIn: action.isSignedIn,
        isGuest: action.isGuest,
        user: action.user,
        onboardingCompleted: action.onboardingCompleted,
      };
    case 'SIGN_IN':
      return { ...state, isSignedIn: true, isGuest: false, user: action.user };
    case 'GUEST_LOGIN':
      return {
        ...state,
        isSignedIn: true,
        isGuest: true,
        user: { name: 'Guest User', email: 'guest@example.com' },
      };
    case 'SIGN_OUT':
      return { ...state, isSignedIn: false, isGuest: false, user: null };
    case 'COMPLETE_ONBOARDING':
      return { ...state, onboardingCompleted: true };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const [token, userData, isGuest, onboardingCompleted] =
          await Promise.all([
            storage.getItem(StorageKeys.USER_TOKEN),
            storage.getItem(StorageKeys.USER_DATA),
            storage.getItem(StorageKeys.IS_GUEST),
            storage.getItem(StorageKeys.ONBOARDING_COMPLETED),
          ]);

        dispatch({
          type: 'RESTORE_TOKEN',
          isSignedIn: !!(token || isGuest),
          isGuest: !!isGuest,
          user: userData,
          onboardingCompleted: !!onboardingCompleted,
        });
      } catch (error) {
        console.error('Auth restore error:', error);
        dispatch({
          type: 'RESTORE_TOKEN',
          isSignedIn: false,
          isGuest: false,
          user: null,
          onboardingCompleted: false,
        });
      }
    };

    restoreAuth();
  }, []);

  const signIn: AuthContextValue['signIn'] = async (email, password) => {
    try {
      const mockUser: User = { name: 'John Doe', email };
      const mockToken = 'mock-jwt-token';

      await Promise.all([
        storage.setItem(StorageKeys.USER_TOKEN, mockToken),
        storage.setItem(StorageKeys.USER_DATA, mockUser),
        storage.removeItem(StorageKeys.IS_GUEST),
      ]);

      dispatch({ type: 'SIGN_IN', user: mockUser });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signUp: AuthContextValue['signUp'] = async (name, email, password) => {
    try {
      const mockUser: User = { name, email };
      const mockToken = 'mock-jwt-token';

      await Promise.all([
        storage.setItem(StorageKeys.USER_TOKEN, mockToken),
        storage.setItem(StorageKeys.USER_DATA, mockUser),
        storage.removeItem(StorageKeys.IS_GUEST),
      ]);

      dispatch({ type: 'SIGN_IN', user: mockUser });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const guestLogin: AuthContextValue['guestLogin'] = async () => {
    try {
      await storage.setItem(StorageKeys.IS_GUEST, true);
      dispatch({ type: 'GUEST_LOGIN' });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signOut: AuthContextValue['signOut'] = async () => {
    try {
      await Promise.all([
        storage.removeItem(StorageKeys.USER_TOKEN),
        storage.removeItem(StorageKeys.USER_DATA),
        storage.removeItem(StorageKeys.IS_GUEST),
      ]);
      dispatch({ type: 'SIGN_OUT' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const completeOnboarding: AuthContextValue['completeOnboarding'] =
    async () => {
      try {
        await storage.setItem(StorageKeys.ONBOARDING_COMPLETED, true);
        dispatch({ type: 'COMPLETE_ONBOARDING' });
      } catch (error) {
        console.error('Complete onboarding error:', error);
      }
    };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        guestLogin,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
