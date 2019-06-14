import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import cxFactory from '../utils/cxFactory';
import TableContext from '../Table/TableContext';
import Tablelvl2Context from '../Table/Tablelvl2Context';

/**
 * The component renders a `<th>` element when the parent context is a header
 * or otherwise a `<td>` element.
 */
const TableCell = React.forwardRef(function TableCell(props, ref) {
  const {
    align = 'inherit',
    classes,
    className,
    component,
    components = { Root: undefined },
    passProps = () => undefined,
    padding: paddingProp,
    scope: scopeProp,
    size: sizeProp,
    sortDirection,
    variant: variantProp,
    ...other
  } = props;

  const cx = cxFactory(classes, 'MuiTableCell');

  const table = React.useContext(TableContext);
  const tablelvl2 = React.useContext(Tablelvl2Context);

  let as;
  if (component) {
    as = component;
  } else {
    as = tablelvl2 && tablelvl2.variant === 'head' ? 'th' : 'td';
  }

  let scope = scopeProp;
  if (!scope && tablelvl2 && tablelvl2.variant === 'head') {
    scope = 'col';
  }
  const padding = paddingProp || (table && table.padding ? table.padding : 'default');
  const size = sizeProp || (table && table.size ? table.size : 'medium');
  const variant = variantProp || (tablelvl2 && tablelvl2.variant);

  let ariaSort = null;
  if (sortDirection) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  const Component = components.Root || as;

  return (
    <Component
      ref={ref}
      {...passProps('root', { variant, table, align, padding, size, as })}
      className={clsx(
        cx('root'),
        {
          [cx('head')]: variant === 'head',
          [cx('stickyHeader')]: variant === 'head' && table && table.stickyHeader,
          [cx('body')]: variant === 'body',
          [cx('footer')]: variant === 'footer',
          [cx('align', align)]: align !== 'inherit',
          [cx('padding', padding)]: padding !== 'default',
          [cx('size', size)]: size !== 'medium',
        },
        className,
      )}
      aria-sort={ariaSort}
      scope={scope}
      {...other}
    />
  );
});

TableCell.propTypes = {
  /**
   * Set the text-align on the table cell content.
   *
   * Monetary or generally number fields **should be right aligned** as that allows
   * you to add them up quickly in your head without having to worry about decimals.
   */
  align: PropTypes.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
  /**
   * The table cell contents.
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
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Sets the padding applied to the cell.
   * By default, the Table parent component set the value (`default`).
   */
  padding: PropTypes.oneOf(['default', 'checkbox', 'none']),
  /**
   * Set scope attribute.
   */
  scope: PropTypes.string,
  /**
   * Specify the size of the cell.
   * By default, the Table parent component set the value (`medium`).
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * Set aria-sort direction.
   */
  sortDirection: PropTypes.oneOf(['asc', 'desc', false]),
  /**
   * Specify the cell type.
   * By default, the TableHead, TableBody or TableFooter parent component set the value.
   */
  variant: PropTypes.oneOf(['head', 'body', 'footer']),
};

export default TableCell;
