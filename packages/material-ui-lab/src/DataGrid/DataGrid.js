import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {},
});

const DataGrid = React.forwardRef(function DataGrid(props, ref) {
  const { children: childrenProp, classes, className, ...other } = props;

  return <div className={clsx(classes.root, className)} ref={ref} {...other} />;
});

DataGrid.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The avatars to stack.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiDataGrid' })(DataGrid);
