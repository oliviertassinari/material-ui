import React, { Ref } from 'react';
import clsx from 'clsx';
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) => ({
  /* Styles applied to the root element. */
  root: {},
});

interface DataGridProps extends WithStyles<typeof styles>, React.HTMLAttributes<HTMLDivElement> {

}

const DataGrid = React.forwardRef(function DataGrid(props: DataGridProps, ref: Ref<HTMLDivElement>) {
  const { children: childrenProp, classes, className, ...other } = props;

  return <div className={ clsx(classes.root, className) } ref = { ref } {...other} />;
});

export default withStyles(styles, { name: 'MuiDataGrid' })(DataGrid);
