import { Button, H3, SizableText, Switch, XStack, YStack } from 'tamagui';
import { useTheme } from '@/contexts/ThemeProvider';

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
  const { toggleTheme, theme } = useTheme();
  return (
    <XStack justify={'space-between'} items={'center'}>
      <YStack className="w-fit">
        <H3 color={'$color9'}>{title}</H3>
        <SizableText size="$4">{subtitle}</SizableText>
      </YStack>
      <XStack gap={'$2'} items={'center'}>
        {showButton && (
          <YStack>
            <Button size="$4">{buttonText}</Button>
          </YStack>
        )}
        <Switch
          size="$2"
          checked={theme === 'dark_teal'}
          onCheckedChange={toggleTheme}
        >
          <Switch.Thumb animation={'quicker'} />
        </Switch>
      </XStack>
    </XStack>
  );
}
