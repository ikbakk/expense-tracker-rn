import { createThemes } from '@tamagui/config/v4';
import * as Colors from '@tamagui/colors';

// Light mode (from your OKLCH reference)
const lightPalette = [
  '#ffffff', // background
  '#f5f5f5', // muted
  '#e8e8e8', // border
  '#dcdcdc', // subtle
  '#cfcfcf', // mid
  '#bfbfbf',
  '#a5a5a5',
  '#808080', // muted-foreground
  '#555555',
  '#2f2f2f', // foreground
  '#191919',
  '#0a0a0a',
];

// Dark mode (from your OKLCH reference)
const darkPalette = [
  '#2a2a2a', // background
  '#3f3f3f', // muted
  '#4a4a4a', // border
  '#555555',
  '#6a6a6a',
  '#7c7c7c',
  '#8f8f8f',
  '#b5b5b5', // muted-foreground
  '#d0d0d0',
  '#f9f9f9', // foreground
  '#fafafa',
  '#ffffff',
];

// Primary (teal from OKLCH)
const tealLight = [
  '#fcfcfc',
  '#b5f7f2',
  '#8af0e8',
  '#5fe9df',
  '#35e2d6',
  '#41bbaa', // main primary
  '#00938f',
  '#007f7b',
  '#006b67',
  '#005653',
  '#00423f',
  '#002e2b',
];

const tealDark = [
  '#2a2a2a',
  '#00423f',
  '#005653',
  '#006b67',
  '#007f7b',
  '#00938f',
  '#43cdba', // main primary
  '#35e2d6',
  '#5fe9df',
  '#8af0e8',
  '#b5f7f2',
  '#e0fdfa',
];

// Accent (amber from OKLCH)
const amberLight = [
  '#fff9eb',
  '#ffe8b5',
  '#ffd57f',
  '#ffc14a',
  '#ffae14',
  '#ffb32d', // main accent
  '#e6a028',
  '#cc8c23',
  '#b3781e',
  '#996419',
  '#805014',
  '#663c0f',
];

const amberDark = [
  '#332107',
  '#4d320b',
  '#66440f',
  '#805514',
  '#996619',
  '#b3781e',
  '#cc8c23',
  '#e6a028',
  '#ffb32d', // main accent
  '#ffc14a',
  '#ffd57f',
  '#ffe8b5',
];

// Shadows (kept same structure)
const lightShadows = {
  shadow1: 'rgba(0,0,0,0.04)',
  shadow2: 'rgba(0,0,0,0.08)',
  shadow3: 'rgba(0,0,0,0.16)',
  shadow4: 'rgba(0,0,0,0.24)',
  shadow5: 'rgba(0,0,0,0.32)',
  shadow6: 'rgba(0,0,0,0.4)',
};

const darkShadows = {
  shadow1: 'rgba(0,0,0,0.2)',
  shadow2: 'rgba(0,0,0,0.3)',
  shadow3: 'rgba(0,0,0,0.4)',
  shadow4: 'rgba(0,0,0,0.5)',
  shadow5: 'rgba(0,0,0,0.6)',
  shadow6: 'rgba(0,0,0,0.7)',
};

// Create the teal + amber theme suite
export const tealThemes = createThemes({
  base: {
    palette: {
      dark: darkPalette,
      light: lightPalette,
    },
    extra: {
      light: {
        ...Colors.red,
        ...Colors.green,
        ...Colors.blue,
        ...lightShadows,
        shadowColor: lightShadows.shadow1,

        primary: '#41bbaa',
        primaryForeground: '#0d0d0d',
        bg: '#fcfcfc',
        bgGradient: '#fcfcfc',
        foreground: '#141414',
        outline: '#e4e4e4',
        muted: '#f5f5f5',
        mutedForeground: '#808080',
        accent: '#ffb32d',
        accentForeground: '#292929',
        destructive: '#d23c2c',
        destructiveForeground: '#ffffff',
      },
      dark: {
        ...Colors.redDark,
        ...Colors.greenDark,
        ...Colors.blueDark,
        ...darkShadows,
        shadowColor: darkShadows.shadow1,
        primary: '#43cdba',
        primaryForeground: '#0d0d0d',
        foreground: '#f8f8f8',
        bg: '#2a2a2a',
        bgGradient: '#2a2a2a',
        outline: '#242424',
        primaryBg: '#2a2a2a',
        muted: '#f5f5f5',
        mutedForeground: '#b5b5b5',
        accent: '#ff9f1c',
        accentForeground: '#292929',
        destructive: '#b92d23',
        destructiveForeground: '#292929',
      },
    },
  },

  accent: {
    palette: {
      dark: amberDark,
      light: amberLight,
    },
  },

  childrenThemes: {
    teal: {
      palette: {
        dark: tealDark,
        light: tealLight,
      },
    },
    amber: {
      palette: {
        dark: amberDark,
        light: amberLight,
      },
    },
  },
});

export type TealThemes = typeof tealThemes;
export const themes: TealThemes = tealThemes;
