import React from "react";
import { styled, setup } from 'goober';

setup(React.createElement);

export const ThemeContext = React.createContext({});

export default styled;

export { keyframes, css } from 'goober';
export { default as StyledEngineProvider } from './StyledEngineProvider';
export { default as GlobalStyles } from './GlobalStyles';
