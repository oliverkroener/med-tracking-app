import { 
  BrandVariants, 
  createLightTheme, 
  createDarkTheme,
  Theme
} from '@fluentui/react-components';

const customBrandRamp: BrandVariants = {
    10: '#fbe9e2',
    20: '#f8d3c5',
    30: '#f5bda7',
    40: '#f2a78a',
    50: '#ef916c',
    60: '#ec7b4f',
    70: '#ea652f',
    80: '#f05722', // primary
    90: '#c9461b',
    100: '#a13715',
    110: '#79280f',
    120: '#521a09',
    130: '#3d1307',
    140: '#290c04',
    150: '#140602',
    160: '#0a0301',
};

// Define brand tokens override
const brandTokens: Partial<Theme> = {
  colorBrandBackground: '#f05722',
  colorBrandBackgroundHover: '#f2a78a',
};

// Create themes with token overrides
export const customLightTheme : Theme = {
  ...createLightTheme(customBrandRamp),
  ...brandTokens
};

export const customDarkTheme : Theme = {
  ...createDarkTheme(customBrandRamp),
  ...brandTokens
};