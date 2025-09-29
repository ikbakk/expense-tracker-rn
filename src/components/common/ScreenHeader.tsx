import { H3, SizableText, Switch, XStack, YStack } from 'tamagui';
import { CustomButton } from '../ui';
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
  const { theme, toggleTheme } = useTheme();
  return (
    <XStack justify={'space-between'} items={'center'}>
      <YStack className="w-fit">
        <H3 color={'$primary'}>{title}</H3>
        <SizableText color={'$mutedForeground'} size="$4">
          {subtitle}
        </SizableText>
      </YStack>
      <XStack gap={'$2'} items={'center'}>
        {showButton && (
          <YStack>
            <CustomButton buttonText={buttonText} />
          </YStack>
        )}
        <Switch
          size="$4"
          checked={theme === 'dark_teal'}
          onCheckedChange={toggleTheme}
        >
          <Switch.Thumb animation={'quicker'} />
        </Switch>
      </XStack>
    </XStack>
  );
}
