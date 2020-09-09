import styled from '@emotion/styled';
import { propsToClassKey } from '@material-ui/styles';

const getStyleOverrides = (name, theme) => {
  let styleOverrides = {};

  if (
    theme &&
    theme.components &&
    theme.components[name] &&
    theme.components[name].styleOverrides
  ) {
    styleOverrides = theme.components[name].styleOverrides;
  }

  return styleOverrides;
};

const getVariantStyles = (name, theme) => {
  let variants = [];
  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }

  const variantsStyles = {};

  variants.forEach((definition) => {
    const key = propsToClassKey(definition.props);
    variantsStyles[key] = definition.style;
  });

  return variantsStyles;
};

const muiStyled = (el, params, muiConfig) => {
  const result = styled(el, params);
  const muiFunc = (...params) => {
    const theme = props.theme || defaultTheme;
    const name = muiConfig.muiName;

    if (muiConfig.overridesResolver) {
      params.push((props) =>
        muiConfig.overridesResolver(props, getStyleOverrides(name, theme), name),
      );
    }

    if (muiConfig.variantsResolver) {
      params.push((props) =>
        muiConfig.variantsResolver(props, getVariantStyles(name, theme), theme, name),
      );
    }

    return result(params);
  };
  return muiFunc;
};

export default muiStyled;
