import { Button, type ButtonProps, ButtonText } from 'tamagui';

interface Props extends ButtonProps {
  buttonText: string | undefined;
}

export default function CustomButton({ buttonText, ...rest }: Props) {
  return (
    <Button bg={'$primary'} size="$4" {...rest}>
      <ButtonText color={'$primaryForeground'}>{buttonText}</ButtonText>
    </Button>
  );
}
