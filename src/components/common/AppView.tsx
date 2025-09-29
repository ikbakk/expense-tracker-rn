import { YStack } from 'tamagui';

interface Props {
  children: React.ReactNode;
}

export default function AppView({ children }: Props) {
  return (
    <YStack bg={'$background'} flex={1} px="$4" pb="$12" pt="$8" gap="$4">
      {children}
    </YStack>
  );
}
