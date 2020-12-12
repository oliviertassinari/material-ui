import * as React from 'react';
import { SxProps as SxPropsSystem } from '@material-ui/system';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import { Theme } from '../styles/createMuiTheme';

export interface BoxTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    children?: React.ReactNode | ((props: React.ComponentPropsWithRef<D>) => React.ReactNode);
    component?: React.ElementType;
    clone?: boolean;
    ref?: React.Ref<unknown>;
    sx?: SxPropsSystem<Theme>;
  };
  defaultComponent: D;
}

export type SxProps = SxPropsSystem<Theme>;

declare const Box: OverridableComponent<BoxTypeMap>;

export type BoxProps<
  D extends React.ElementType = BoxTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BoxTypeMap<P, D>, D>;

export default Box;
