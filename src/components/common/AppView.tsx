import { YStack } from 'tamagui';

interface Props {
  children: React.ReactNode;
}

export default function AppView({ children }: Props) {
  return (
    <YStack
      flex={1}
      paddingHorizontal="$4"
      paddingBottom="$4"
      paddingTop="$8"
      gap="$4"
    >
      {children}
    </YStack>
  );
}
