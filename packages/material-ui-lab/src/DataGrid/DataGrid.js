import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { VariableSizeList as List } from 'react-window';
import { withStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { ownerDocument, useEventCallback, useForkRef } from '@material-ui/core/utils';

export const styles = () => ({
  /* Styles applied to the root element. */
  root: {
    // overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    '& table': {
      // width: '100%',
      borderCollapse: 'collapse',
      // Faster than the default auto layout algorithm.
      tableLayout: 'fixed',
      borderSpacing: 0,
    },
    '& th': {
      position: 'relative',
      border: '1px solid red',
      padding: 0,
    },
    '& td': {
      position: 'relative',
      border: '1px solid red',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: 0,
      whiteSpace: 'nowrap',
    },
  },
  bodyContainer: {
    // overflow: 'auto',
  },
  headerLabel: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  resize: {
    cursor: 'col-resize',
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1, // Leak on the next cell
    width: 9,
    right: -6,
  },
});

// To replace with .findIndex() once we stop IE 11 support.
function findIndex(array, comp) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }

  return -1;
}

function keyBy(array, comp) {
  const output = {};

  for (let i = 0; i < array.length; i += 1) {
    const item = array[i];
    output[comp(item)] = item;
  }

  return output;
}

const defaultColumnOptionsDefault = {
  resizable: true,
  sortable: true,
  sortingOrder: ['asc', 'desc', null],
};

const DataGrid = React.forwardRef(function DataGrid(props, ref) {
  const {
    classes,
    className,
    columns = [],
    defaultColumnOptions: defaultColumnOptionsProp = defaultColumnOptionsDefault,
    defaultSorting = [],
    sorting: sortingProp,
    onSortingChange,
    rowsData = [],
    ...other
  } = props;

  const defaultColumnOptions = {
    ...defaultColumnOptionsDefault,
    ...defaultColumnOptionsProp,
  };

  const rootRef = React.useRef();
  const handleRef = useForkRef(ref, rootRef);

  const rowsHeader = [columns];

  const handleResizeMouseMove = useEventCallback(event => {});

  const handleResizeMouseUp = useEventCallback(event => {
    const doc = ownerDocument(rootRef.current);

    // Ignore previously defined value. hope it won't be an issue.
    doc.body.style.removeProperty('cursor');

    doc.removeEventListener('mousemove', handleResizeMouseMove);
    doc.removeEventListener('mouseup', handleResizeMouseUp);
  });

  const handleResizeMouseDown = event => {
    // Avoid text selection.
    event.preventDefault();

    const doc = ownerDocument(rootRef.current);

    doc.body.style.cursor = 'col-resize';

    doc.addEventListener('mousemove', handleResizeMouseMove);
    doc.addEventListener('mouseup', handleResizeMouseUp);
  };

  const handleResizeDoubleClick = () => {
    console.log('autosize');
  };

  const { current: isSortingControlled } = React.useRef(sortingProp !== undefined);
  const [sortingState, setSortingState] = React.useState(defaultSorting);
  const sorting = isSortingControlled ? sortingProp : sortingState;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (isSortingControlled !== (sortingProp != null)) {
        console.error(
          [
            `Material-UI: A component is changing ${
              isSortingControlled ? 'a ' : 'an un'
            }controlled DataGrid sorting prop to be ${isSortingControlled ? 'un' : ''}controlled.`,
            'Elements should not switch from uncontrolled to controlled (or vice versa).',
            'Decide between using a controlled or uncontrolled DataGrid ' +
              'element for the lifetime of the component.',
            'More info: https://fb.me/react-controlled-components',
          ].join('\n'),
        );
      }
    }, [sortingProp, isSortingControlled]);
  }

  const activeKeys = React.useRef([]);

  React.useEffect(() => {
    const validKeys = ['Shift'];
    const handleKeyDown = event => {
      if (validKeys.indexOf(event.key) !== -1) {
        activeKeys.current.push(event.key);
      }
    };

    const handleKeyUp = event => {
      if (validKeys.indexOf(event.key) !== -1) {
        const index = activeKeys.current.indexOf(event.key);
        activeKeys.current.splice(index, 1);
      }
    };

    // The keyUp event might not be triggered when the window lose the focus.
    const handleBlur = () => {
      activeKeys.current = [];
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  const handleSortClick = column => event => {
    const sortingOrder = column.sortingOrder || defaultColumnOptions.sortingOrder;
    const columnIndex = findIndex(sorting, sortingColumn => column.field === sortingColumn.field);

    let newSorting;

    // Multi column sort
    if (activeKeys.current.indexOf('Shift') !== -1) {
      newSorting = [...sorting];
    } else {
      newSorting = [];
    }

    if (columnIndex === -1) {
      newSorting.push({
        field: column.field,
        sort: sortingOrder[0],
      });
    } else {
      const newColumn = {
        ...sorting[columnIndex],
        sort:
          sortingOrder[(sortingOrder.indexOf(sorting[columnIndex].sort) + 1) % sortingOrder.length],
      };

      if (activeKeys.current.indexOf('Shift') !== -1) {
        newSorting[columnIndex] = newColumn;

        // Move to the end
        if (columnIndex !== sorting.length - 1) {
          newSorting.push(newSorting[columnIndex]);
          newSorting.splice(columnIndex, 1);
        }
      } else {
        newSorting = [newColumn];
      }

      // Remove last item
      if (newColumn.sort === null) {
        newSorting.splice(newSorting.length - 1, 1);
      }
    }

    setSortingState(newSorting);

    if (onSortingChange) {
      onSortingChange(event, newSorting);
    }
  };

  const sortingKeyBy = keyBy(sorting, item => item.field);

  return (
    <div className={clsx(classes.root, className)} ref={handleRef} {...other}>
      <table>
        <thead>
          {rowsHeader.map((row, index) => (
            <tr key={index}>
              {columns.map(column => {
                const sortingColumn = sortingKeyBy[column.field];
                const sortingActive = Boolean(sortingColumn);
                const label = (
                  <div className={classes.headerLabel}>
                    {column.label || column.field}
                    {sortingActive && sorting.length > 1
                      ? ` (${sorting.indexOf(sortingColumn) + 1})`
                      : ''}
                  </div>
                );

                return (
                  <th key={column.field} rowSpan={null} colSpan={null}>
                    {column.sortable || defaultColumnOptions.sortable ? (
                      <TableSortLabel
                        active={sortingActive}
                        direction={sortingColumn ? sortingColumn.sort : 'asc'}
                        onClick={handleSortClick(column)}
                      >
                        {label}
                      </TableSortLabel>
                    ) : (
                      label
                    )}
                    <div
                      aria-hidden
                      onMouseDown={handleResizeMouseDown}
                      onDoubleClick={handleResizeDoubleClick}
                      className={classes.resize}
                    />
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
      </table>
      <div className={classes.bodyContainer}>
        <List
          height={300}
          itemCount={rowsData.length}
          outerElementType="div"
          innerElementType="div"
          overscanCount={10}
          itemSize={() => {
            return 28;
          }}
          width={600}
        >
          {({ index, style }) => (
            <div key={index} style={style}>
              {columns.map(column => (
                <span key={column.field}>{rowsData[index][column.field]}</span>
              ))}
            </div>
          )}
        </List>
        {/*
           -        <table>
           -          <tbody>
           -            {rowsData.map((row, index) => (
           -              <tr key={index}>
           -                {columns.map(column => (
           -                  <td key={column.field}>{row[column.field]}</td>
           -                ))}
           -              </tr>
           -            ))}
           -          </tbody>
           -        </table>
           */}
      </div>
      <table>
        <tfoot>
          <tr>
            <TablePagination
              count={rowsData.length}
              onChangePage={() => {}}
              page={0}
              rowsPerPage={25}
            />
          </tr>
        </tfoot>
      </table>
    </div>
  );
});

DataGrid.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
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
   * The columns configuration.
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.arrayOf(PropTypes.object),
      field: PropTypes.string.isRequired,
      label: PropTypes.string,
      resizable: PropTypes.bool,
      sortable: PropTypes.bool,
      sortingOrder: PropTypes.arrayOf(PropTypes.oneOf(['asc', 'desc', null])),
    }),
  ),
  /**
   * The default options that get applied to each column.
   */
  defaultColumnOptions: PropTypes.shape({
    resizable: PropTypes.bool,
    sortable: PropTypes.bool,
    sortingOrder: PropTypes.arrayOf(PropTypes.oneOf(['asc', 'desc', null])),
  }),
  /**
   * The default sorting state. (Uncontrolled)
   */
  defaultSorting: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      sort: PropTypes.oneOf(['asc', 'desc']).isRequired,
    }),
  ),
  /**
   * Callback fired when the user change the column sort.
   *
   * @param {object} event The event source of the callback.
   * @param {string} value The new sorting value.
   */
  onSortingChange: PropTypes.func,
  /**
   * The data record array to be rendered.
   */
  rowsData: PropTypes.array,
  /**
   * Sorting state. (Controlled)
   */
  sorting: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      sort: PropTypes.oneOf(['asc', 'desc']).isRequired,
    }),
  ),
};

export default withStyles(styles, { name: 'MuiDataGrid' })(DataGrid);
