import type { ReactNode } from 'react';
import { Card, Text, YStack } from 'tamagui';

interface Props {
  title: string;
  description: string;
  icon: ReactNode;
  backgroundColor: string | undefined;
}

const OnboardingSlide = ({
  title,
  description,
  icon,
  backgroundColor = '$background',
}: Props) => {
  return (
    <Card
      flex={1}
      padding="$6"
      backgroundColor={backgroundColor}
      justifyContent="center"
      alignItems="center"
      borderRadius={0}
    >
      <YStack gap="$6" alignItems="center" maxWidth={320}>
        {/* Icon/Image Container */}
        {icon && (
          <YStack
            width="$20"
            height="$20"
            backgroundColor="$blue3"
            borderRadius="$12"
            justifyContent="center"
            alignItems="center"
          >
            {icon}
          </YStack>
        )}

        {/* Title */}
        <Text
          fontSize="$9"
          fontWeight="bold"
          textAlign="center"
          color="$color12"
        >
          {title}
        </Text>

        {/* Description */}
        <Text fontSize="$5" textAlign="center" color="$color10" lineHeight="$6">
          {description}
        </Text>
      </YStack>
    </Card>
  );
};

export default OnboardingSlide;
