import { Card, type CardProps } from 'tamagui';

interface Props extends CardProps {
  children?: React.ReactNode;
}

export default function CustomCard({ children, ...rest }: Props) {
  return (
    <Card
      size={'$4'}
      padded
      bordered
      borderColor={'$outline'}
      backgroundColor={'$background0'}
      {...rest}
    >
      {children}
    </Card>
  );
}
