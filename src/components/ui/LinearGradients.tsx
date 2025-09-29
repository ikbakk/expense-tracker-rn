import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/contexts/ThemeProvider';

export default function LinearGradients() {
  const { theme } = useTheme();

  const cardBg = theme === 'light_teal' ? '#fcfcfc' : '#2a2a2a';

  return (
    <>
      {/* Top fade */}
      <LinearGradient
        colors={[cardBg, 'transparent']}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 16,
          zIndex: 10,
        }}
      />

      {/* Bottom fade */}
      <LinearGradient
        colors={['transparent', cardBg]}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 16,
          zIndex: 10,
        }}
      />
    </>
  );
}
