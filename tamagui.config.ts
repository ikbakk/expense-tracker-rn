import { createTamagui } from 'tamagui';

export const config = createTamagui({
  tokens: {
    size: { sm: 8, md: 12, lg: 20 },
    space: { sm: 4, md: 8, lg: 12 },
    radius: { none: 0, sm: 4, md: 8 },
    fontSize: { sm: 12, md: 16, lg: 20, xl: 24 },
    color: {
      white: '#ffffff',
      black: '#000000',
      gray100: '#f2f2f2',
      gray900: '#111111',
      primary: '#1e90ff',
      secondary: '#ff6347',
      accent: '#ffd700',
    },
  },

  themes: {
    light: {
      background: '$gray100',
      text: '$black',
      primary: '$primary',
      secondary: '$secondary',
      accent: '$accent',
    },
    dark: {
      background: '$gray900',
      text: '$white',
      primary: '$primary',
      secondary: '$secondary',
      accent: '$accent',
    },
  },

  media: {
    sm: { maxWidth: 860 },
    gtSm: { minWidth: 861 },
  },

  shorthands: {
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    mx: 'marginHorizontal',
    my: 'marginVertical',
  },

  settings: {
    disableSSR: true,
    allowedStyleValues: 'somewhat-strict-web',
  },
});

// Type-safe config
type OurConfig = typeof config;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends OurConfig {}
}
