import { Button, H3, SizableText, XStack, YStack } from 'tamagui';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showButton?: boolean;
  buttonText?: string;
}

export default function ScreenHeader({
  title,
  buttonText,
  showButton,
  subtitle,
}: ScreenHeaderProps) {
  return (
    <XStack justifyContent="space-between" alignItems="center">
      <YStack className="w-fit">
        <H3>{title}</H3>
        <SizableText size="$4">{subtitle}</SizableText>
      </YStack>
      {showButton && (
        <YStack className="">
          <Button size="$4">{buttonText}</Button>
        </YStack>
      )}
    </XStack>
  );
}
