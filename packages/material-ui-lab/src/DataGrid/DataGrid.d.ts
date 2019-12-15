import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface ColumnOptionType {
  sortable?: boolean;
  resizable?: boolean;
  sortingOrder?: Array<'asc' | 'desc' | null>;
}

export interface ColumnsType extends ColumnOptionType {
  field: string;
  label?: string;
  children?: ColumnsType[];
}

export type SortingType = Array<{
  sort: 'asc' | 'desc';
  field: string;
}>;

export interface DataGridProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, DataGridClassKey> {
  /**
   * The default options that get applied to each column.
   */
  defaultColumnOptions?: ColumnOptionType;
  /**
   * The columns configuration.
   */
  columns?: ColumnsType[];
  /**
   * The default sorting state. (Uncontrolled)
   */
  defaultSorting?: SortingType;
  /**
   * Sorting state. (Controlled)
   */
  sorting?: SortingType;
  /**
   * Callback fired when the user change the column sort.
   *
   * @param {object} event The event source of the callback.
   * @param {string} value The new sorting value.
   */
  onSortingChange?: (event: React.ChangeEvent<{}>, value: SortingType) => void;
  /**
   * The data record array to be rendered.
   */
  rowsData?: any[];
}

export type DataGridClassKey = 'root';

export default function DataGrid(props: DataGridProps): JSX.Element;
