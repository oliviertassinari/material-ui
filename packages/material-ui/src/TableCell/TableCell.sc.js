import TableCell from './TableCell.unstyled';
import styled from 'styled-components';
import styles from './TableCell.styles';
import { capitalize } from '@material-ui/core/utils';

function myStyled(component, name, style) {
  return styled(component).withConfig({
    displayName: name,
  })(style);
}

function withOverride(name, key) {
  return props => {
    const theme = props.theme;
    if (!theme.overrides || !theme.overrides[name] || !theme.overrides[name][key]) {
      return null;
    }

    return theme.overrides[name][key];
  };
}

TableCell.defaultProps = {
  components: {
    Root: myStyled(TableCell, 'TableCell', [
      props => {
        const styleRules = styles(props.theme);
        return [
          styleRules.root,
          styleRules[props.variant],
          props.variant === 'head' &&
            props.table &&
            props.table.stickyHeader &&
            styleRules.stickyHeader,
          styleRules[props.variant],
          styleRules[`align${capitalize(props.align)}`],
          styleRules[`padding${capitalize(props.padding)}`],
          styleRules[`size${capitalize(props.size)}`],
        ];
      },
      withOverride('MuiTableCell', 'root'),
    ]),
  },
  passProps: (_, x) => x,
};

export default TableCell;
