import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';
import { themes as tealTheme } from './src/lib/themes';

const appConfig = createTamagui({
  themes: { ...tealTheme },
  tokens: {
    ...defaultConfig.tokens,
  },
  media: defaultConfig.media,
  shorthands: {
    ...defaultConfig.shorthands,
  },
  fonts: defaultConfig.fonts,
  animations: defaultConfig.animations,
  settings: defaultConfig.settings,
});

export type AppConfig = typeof appConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
