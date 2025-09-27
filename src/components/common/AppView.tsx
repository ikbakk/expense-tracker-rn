import { useTheme, YStack } from 'tamagui';

interface Props {
  children: React.ReactNode;
}

export default function AppView({ children }: Props) {
  const theme = useTheme();
  return (
    <YStack
      style={{ backgroundColor: theme.background.get() }}
      flex={1}
      px="$4"
      pb="$4"
      pt="$8"
      gap="$4"
    >
      {children}
    </YStack>
  );
}
