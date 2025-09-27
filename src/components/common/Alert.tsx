import { Button, Card, Text, XStack, YStack } from 'tamagui';

interface Props {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  onClose: () => void;
  actions: unknown[];
  showIcon: boolean;
}

const Alert = ({
  type = 'info',
  title,
  message,
  onClose,
  actions = [],
  showIcon = true,
}: Props) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '$green3',
          borderColor: '$green6',
          iconColor: '$green10',
          textColor: '$green11',
          icon: '✓',
        };
      case 'warning':
        return {
          backgroundColor: '$orange3',
          borderColor: '$orange6',
          iconColor: '$orange10',
          textColor: '$orange11',
          icon: '!',
        };
      case 'error':
        return {
          backgroundColor: '$red3',
          borderColor: '$red6',
          iconColor: '$red10',
          textColor: '$red11',
          icon: '✕',
        };
      default:
        return {
          backgroundColor: '$blue3',
          borderColor: '$blue6',
          iconColor: '$blue10',
          textColor: '$blue11',
          icon: 'i',
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <Card
      padding="$4"
      backgroundColor={styles.backgroundColor}
      borderColor={styles.borderColor}
      borderWidth="$0.5"
      borderRadius="$4"
    >
      <YStack gap="$3">
        <XStack gap="$3" alignItems="flex-start">
          {showIcon && (
            <Text color={styles.iconColor} fontSize="$5" fontWeight="bold">
              {styles.icon}
            </Text>
          )}

          <YStack flex={1} gap="$2">
            {title && (
              <Text color={styles.textColor} fontSize="$5" fontWeight="600">
                {title}
              </Text>
            )}

            {message && (
              <Text color={styles.textColor} fontSize="$4" lineHeight="$5">
                {message}
              </Text>
            )}
          </YStack>

          {onClose && (
            <Button
              size="$2"
              circular
              variant="outlined"
              borderWidth={0}
              onPress={onClose}
            >
              <Text color={styles.textColor}>×</Text>
            </Button>
          )}
        </XStack>

        {actions.length > 0 && (
          <XStack gap="$2" justifyContent="flex-end">
            {actions.map((action, index) => (
              <Button
                key={`${index}+${2}`}
                size="$3"
                variant="outlined"
                borderColor={styles.borderColor}
                onPress={action.onPress}
              >
                <Text color={styles.textColor} fontSize="$3">
                  {action.label}
                </Text>
              </Button>
            ))}
          </XStack>
        )}
      </YStack>
    </Card>
  );
};

export default Alert;
