import { Check, ChevronDown, ChevronUp } from 'lucide-react-native';
import { useId, useState } from 'react';

import type { FontSizeTokens, SelectProps } from 'tamagui';
import { Adapt, getFontSize, Label, Select, Sheet, YStack } from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';

export interface SelectItem {
  name: string;
}

interface Props {
  items: SelectItem[];
}

interface SelecContentsProps extends SelectProps {
  trigger?: React.ReactNode;
  items: SelectItem[];
}

export function CustomSelect({ items }: Props) {
  const id = useId();
  return (
    <YStack>
      <Label htmlFor={id}>Category</Label>
      <SelectContents id={id} items={items} />
    </YStack>
  );
}

export function SelectContents({
  items,
  trigger,
  ...props
}: SelecContentsProps) {
  const [val, setVal] = useState('Select a category');

  return (
    <Select
      value={val}
      onValueChange={setVal}
      disablePreventBodyScroll
      defaultValue="Select a category"
      {...props}
    >
      {trigger || (
        <Select.Trigger iconAfter={ChevronDown}>
          <Select.Value placeholder="Select a category" />
        </Select.Trigger>
      )}

      <Adapt when="maxMd" platform="touch">
        <Sheet
          native={!!props.native}
          dismissOnSnapToBottom
          modal
          animation="quicker"
          snapPoints={[30, 15, 25]}
          snapPointsMode="percent"
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            bg="$shadowColor"
            animation="quicker"
            enterStyle={{ opacity: 1 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.FocusScope loop trapped focusOnIdle>
        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton
            items="center"
            justify="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack z={10}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$primary', 'transparent']}
              rounded="$4"
            />
          </Select.ScrollUpButton>

          <Select.Viewport
          // to do animations:
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ o: 0, y: -10 }}
          // exitStyle={{ o: 0, y: 10 }}
          >
            <Select.Group bg={'$muted'}>
              <Select.Label>Fruits</Select.Label>
              {/* for longer lists memoizing these is useful */}
              {items?.map((item, i) => {
                return (
                  <Select.Item
                    index={i}
                    key={item.name}
                    value={item.name.toLowerCase()}
                  >
                    <Select.ItemText>{item.name}</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                );
              })}
            </Select.Group>
            {/* Native gets an extra icon */}
            {props.native && (
              <YStack
                position="absolute"
                r={0}
                t={0}
                b={0}
                items="center"
                justify="center"
                width={'$4'}
                pointerEvents="none"
              >
                <ChevronDown
                  size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
                />
              </YStack>
            )}
          </Select.Viewport>

          <Select.ScrollDownButton
            items="center"
            justify="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack z={10}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['transparent', '$primary']}
              rounded="$4"
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.FocusScope>
    </Select>
  );
}
