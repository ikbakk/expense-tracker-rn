// components/AppToastProvider.tsx
import {
  Toast,
  ToastProvider,
  ToastViewport,
  useToastController,
  useToastState,
} from '@tamagui/toast';
import { createContext, type ReactNode, useContext } from 'react';
import { YStack } from 'tamagui';

// Context to expose the toast controller globally
const ToastContext = createContext<ReturnType<
  typeof useToastController
> | null>(null);
export const useAppToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useAppToast must be used within AppToastProvider');
  return ctx;
};

/**
 * AppToastProvider keeps ToastProvider at root and exposes controller via context.
 * Important: useToastController() and useToastState() are used only inside ToastManager
 * (which is rendered inside <ToastProvider>).
 */
export const AppToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ToastProvider>
      <ToastManager>{children}</ToastManager>
      {/* ToastViewport must be a child of ToastProvider — place where you want to show toasts */}
      <ToastViewport
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-end"
        width="100%"
        bottom={12}
        left={0}
        position="absolute"
        padding="$4"
        gap="$2"
      />
    </ToastProvider>
  );
};

function ToastManager({ children }: { children: ReactNode }) {
  // Now these hooks are safe because ToastManager is inside <ToastProvider>
  const toast = useToastController();
  const currentToast = useToastState();

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Optional: custom render for the current toast (if not handled natively) */}
      {currentToast && !currentToast.isHandledNatively && (
        <Toast
          key={currentToast.id}
          animation="200ms"
          duration={currentToast.duration}
          enterStyle={{ opacity: 0, transform: [{ translateY: 100 }] }}
          exitStyle={{ opacity: 0, transform: [{ translateY: 100 }] }}
          transform={[{ translateY: 0 }]}
          opacity={1}
          scale={1}
          viewportName={currentToast.viewportName}
        >
          <YStack>
            <Toast.Title>{currentToast.title}</Toast.Title>
            {!!currentToast.message && (
              <Toast.Description>{currentToast.message}</Toast.Description>
            )}
          </YStack>
        </Toast>
      )}
    </ToastContext.Provider>
  );
}
