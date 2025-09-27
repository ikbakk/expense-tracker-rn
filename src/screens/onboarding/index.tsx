import { useState } from 'react';
import { Button, Circle, Text, XStack, YStack } from 'tamagui';
import OnboardingSlide from '@/components/common/OnboardingSlide';
import { useAuth } from '@/contexts/AuthContext';

interface OnBoardingData {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  backgroundColor: string;
}

const onboardingData: OnBoardingData[] = [
  {
    id: 1,
    title: 'Welcome to Our App',
    description: 'Discover amazing features and connect with others',
    icon: (
      <Text fontSize="$8" color="$blue10">
        🚀
      </Text>
    ),
    backgroundColor: '$blue1',
  },
  {
    id: 2,
    title: 'Stay Connected',
    description: 'Keep in touch with friends and family',
    icon: (
      <Text fontSize="$8" color="$green10">
        💬
      </Text>
    ),
    backgroundColor: '$green1',
  },
  {
    id: 3,
    title: 'Get Started',
    description: 'Ready to begin your journey with us?',
    icon: (
      <Text fontSize="$8" color="$purple10">
        ✨
      </Text>
    ),
    backgroundColor: '$purple1',
  },
];

export default function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const { completeOnboarding } = useAuth();

  const currentPageData = (currentPage: number) => {
    const data = onboardingData[currentPage] || onboardingData[0];

    return data;
  };

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <YStack flex={1}>
      {/* Main Content */}
      <YStack flex={1}>
        <OnboardingSlide
          title={currentPageData(currentPage)?.title ?? ''}
          description={currentPageData(currentPage)?.description ?? ''}
          icon={currentPageData(currentPage)?.icon}
          backgroundColor={currentPageData(currentPage)?.backgroundColor ?? ''}
        />
      </YStack>

      {/* Bottom Controls */}
      <YStack paddingHorizontal="$6" paddingVertical="$6" gap="$6">
        {/* Pagination Dots */}
        <XStack justifyContent="center" gap="$2">
          {onboardingData.map((_, index) => (
            <Circle
              key={`${index}-${_.title}`}
              size="$1"
              backgroundColor={index === currentPage ? '$blue10' : '$gray6'}
              onPress={() => setCurrentPage(index)}
              cursor="pointer"
            />
          ))}
        </XStack>

        {/* Navigation Buttons */}
        <XStack justifyContent="space-between" alignItems="center">
          <XStack gap="$3">
            {currentPage > 0 && (
              <Button
                variant="outlined"
                onPress={handlePrevious}
                borderColor="$gray8"
                size="$4"
              >
                <Text color="$color10">Back</Text>
              </Button>
            )}

            <Button
              variant="outlined"
              onPress={handleSkip}
              borderColor="$gray8"
              size="$4"
            >
              <Text color="$color10">Skip</Text>
            </Button>
          </XStack>

          <Button
            onPress={handleNext}
            backgroundColor="$blue10"
            size="$4"
            paddingHorizontal="$6"
          >
            <Text color="white" fontWeight="600">
              {currentPage === onboardingData.length - 1
                ? 'Get Started'
                : 'Next'}
            </Text>
          </Button>
        </XStack>

        {/* Progress Text */}
        <Text fontSize="$3" color="$color9" textAlign="center">
          {currentPage + 1} of {onboardingData.length}
        </Text>
      </YStack>
    </YStack>
  );
}
