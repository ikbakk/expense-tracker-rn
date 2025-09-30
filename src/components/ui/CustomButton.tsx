import { Button, type ButtonProps, ButtonText } from 'tamagui';

interface Props extends ButtonProps {
  buttonText: string | undefined;
}

export default function CustomButton({ buttonText, ...rest }: Props) {
  return (
    <Button bg={rest.disabled ? 'grey' : '$primary'} size="$4" {...rest}>
      <ButtonText color={rest.disabled ? '$foreground' : '$primaryForeground'}>
        {buttonText}
      </ButtonText>
    </Button>
  );
}
