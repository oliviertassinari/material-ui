import { darken, fade, lighten } from '../styles/colorManipulator';
import defaultTheme from '../styles/defaultTheme';

const cache = {
  key: null,
  value: null,
};

const withDefault = styles => injectedTheme => {
  let theme = injectedTheme;
  if (Object.keys(theme).length === 0) {
    theme = defaultTheme;
  }

  if (cache.key === theme) {
    return cache.value;
  }

  const t = styles(theme);
  cache.value = t;
  cache.key = theme;
  return t;
};

const styles = withDefault(theme => ({
  /* Styles applied to the root element. */
  root: {
    ...theme.typography.body2,
    display: 'table-cell',
    verticalAlign: 'inherit',
    // Workaround for a rendering bug with spanned columns in Chrome 62.0.
    // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
    borderBottom: `1px solid
    ${
      theme.palette.type === 'light'
        ? lighten(fade(theme.palette.divider, 1), 0.88)
        : darken(fade(theme.palette.divider, 1), 0.68)
    }`,
    textAlign: 'left',
    padding: 16,
  },
  /* Styles applied to the root element if `variant="head"` or `context.table.head`. */
  head: {
    color: theme.palette.text.primary,
    lineHeight: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightMedium,
  },
  /* Styles applied to the root element if `variant="body"` or `context.table.body`. */
  body: {
    color: theme.palette.text.primary,
  },
  /* Styles applied to the root element if `variant="footer"` or `context.table.footer`. */
  footer: {
    color: theme.palette.text.secondary,
    lineHeight: theme.typography.pxToRem(21),
    fontSize: theme.typography.pxToRem(12),
  },
  /* Styles applied to the root element if `size="small"`. */
  sizeSmall: {
    padding: '6px 24px 6px 16px',
    '&:last-child': {
      paddingRight: 16,
    },
    '&$paddingCheckbox': {
      width: 24, // prevent the checkbox column from growing
      padding: '0px 12px 0 16px',
      '&:last-child': {
        paddingLeft: 12,
        paddingRight: 16,
      },
      '& > *': {
        padding: 0,
      },
    },
  },
  /* Styles applied to the root element if `padding="checkbox"`. */
  paddingCheckbox: {
    width: 48, // prevent the checkbox column from growing
    padding: '0 0 0 4px',
    '&:last-child': {
      paddingLeft: 0,
      paddingRight: 4,
    },
  },
  /* Styles applied to the root element if `padding="none"`. */
  paddingNone: {
    padding: 0,
    '&:last-child': {
      padding: 0,
    },
  },
  /* Styles applied to the root element if `align="left"`. */
  alignLeft: {
    textAlign: 'left',
  },
  /* Styles applied to the root element if `align="center"`. */
  alignCenter: {
    textAlign: 'center',
  },
  /* Styles applied to the root element if `align="right"`. */
  alignRight: {
    textAlign: 'right',
    flexDirection: 'row-reverse',
  },
  /* Styles applied to the root element if `align="justify"`. */
  alignJustify: {
    textAlign: 'justify',
  },
  /* Styles applied to the root element if `context.table.stickyHeader={true}`. */
  stickyHeader: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },
}));

export default styles;
