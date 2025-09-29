import {
  BarChart3,
  Camera,
  Home,
  type LucideIcon as LucideIconType,
  ReceiptText,
  Settings,
} from 'lucide-react-native';

const ICONS = {
  home: Home,
  settings: Settings,
  receiptText: ReceiptText,
  camera: Camera,
  barChart3: BarChart3,
};

export type IconName = keyof typeof ICONS;

interface Props {
  name: IconName;
  color?: string;
  size?: number;
}

const CustomIcon = ({ name, color = 'black', size = 24 }: Props) => {
  const LucideIcon: LucideIconType | undefined = ICONS[name];
  if (!LucideIcon) return null;
  return <LucideIcon color={color} size={size} />;
};

export default CustomIcon;
