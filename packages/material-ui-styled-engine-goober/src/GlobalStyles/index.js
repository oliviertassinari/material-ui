import PropTypes from 'prop-types';
import { createGlobalStyles } from 'goober/global';

function isEmpty(obj) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}

const GlobalStyles = createGlobalStyles((props) => {
  const { styles, defaultTheme = {} } = props;

  if (typeof styles === 'function') {
    return styles(isEmpty(props.theme) ? defaultTheme : props.theme);
  }

  return styles;
});

export default GlobalStyles;

GlobalStyles.propTypes = {
  defaultTheme: PropTypes.object,
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
};
