import { Breakpoints, BreakpointsOptions } from './createBreakpoints';
import { Mixins, MixinsOptions } from './createMixins';
import { Palette, PaletteOptions } from './createPalette';
import { Typography, TypographyOptions } from './createTypography';
import { Shadows } from './shadows';
import { Shape, ShapeOptions } from './shape';
import { Spacing, SpacingOptions } from './createSpacing';
import { Transitions, TransitionsOptions } from './transitions';
import { ZIndex, ZIndexOptions } from './zIndex';
import { Overrides } from './overrides';
import { ComponentsProps } from './props';
import { string } from 'prop-types';

export type Direction = 'ltr' | 'rtl';

export interface Localization {
  formatNumber: (number: number) => string;
}

export interface LocalizationOptions extends Partial<Localization> {}

export interface ThemeOptions {
  localization?: LocalizationOptions;
  shape?: ShapeOptions;
  breakpoints?: BreakpointsOptions;
  direction?: Direction;
  mixins?: MixinsOptions;
  overrides?: Overrides;
  palette?: PaletteOptions;
  props?: ComponentsProps;
  shadows?: Shadows;
  spacing?: SpacingOptions;
  transitions?: TransitionsOptions;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  zIndex?: ZIndexOptions;
}

export interface Theme {
  localization: Localization;
  shape: Shape;
  breakpoints: Breakpoints;
  direction: Direction;
  mixins: Mixins;
  overrides?: Overrides;
  palette: Palette;
  props?: ComponentsProps;
  shadows: Shadows;
  spacing: Spacing;
  transitions: Transitions;
  typography: Typography;
  zIndex: ZIndex;
}

export default function createMuiTheme(options?: ThemeOptions, ...args: object[]): Theme;
