import React from 'react'
import { createUseStyles } from 'react-jss';
import TableCell from './TableCell.unstyled';
import styles from './TableCell.styles';

const useStyles = createUseStyles(styles);

export default props => {
  const classes = useStyles(props);
  return <TableCell classes={classes} {...props} />;
};
