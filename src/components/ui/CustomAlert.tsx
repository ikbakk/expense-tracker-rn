import { forwardRef, useImperativeHandle, useState } from 'react';
import { AlertDialog, Button, Text } from 'tamagui';

export interface CustomAlertRef {
  open: (options: { title: string; description: string }) => void;
}

const CustomAlert = forwardRef<CustomAlertRef>((_, ref) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useImperativeHandle(ref, () => ({
    open: ({ title, description }) => {
      setTitle(title);
      setDescription(description);
      setOpen(true);
    },
  }));

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          opacity={0.8}
          key={'overlay'}
          animation={'quick'}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <AlertDialog.Title>
            <Text>{title}</Text>
          </AlertDialog.Title>
          <AlertDialog.Description>
            <Text>{description}</Text>
          </AlertDialog.Description>
          <Button onPress={() => setOpen(false)}>Close</Button>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
});

export default CustomAlert;
