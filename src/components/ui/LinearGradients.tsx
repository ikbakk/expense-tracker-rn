import { LinearGradient } from 'tamagui/linear-gradient';

export default function LinearGradients() {
  return (
    <>
      {/* Top fade */}
      <LinearGradient
        colors={['$bgGradient', 'transparent']}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 16,
          zIndex: 10,
        }}
      />

      <LinearGradient
        colors={['transparent', '$bgGradient']}
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
