import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface ColumnOptionType<RowData extends object> {
  resizable?: boolean;
  sortable?: boolean;
  sortingComparator?: (rowA: RowData, rowB: RowData, sort: 'asc' | 'desc') => number;
  sortingOrder?: Array<'asc' | 'desc' | null>;
}

export interface ColumnsType<RowData extends object> extends ColumnOptionType<RowData> {
  field: string;
  label?: string;
  children?: ColumnsType<RowData>[];
}

export type SortingType = Array<{
  sort: 'asc' | 'desc';
  field: string;
}>;

export interface DataProviderGetListParams {
  sorting: SortingType;
  pagination?: {
    currentPage: number;
    currentPageSize: number;
  };
}

export interface DataProviderType<RowData extends object> {
  getList: (params: DataProviderGetListParams) => Promise<RowData[]>;
  loadMoreRows?: (paginationKey: string) => Promise<string>;
}

export interface DataGridProps<RowData extends object>
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, DataGridClassKey>, Partial<PagingOptions> {
  /**
   * Manage the communication with the data store.
   */
  dataProvider?: DataProviderType<RowData>;
  /**
   * The default options that get applied to each column.
   */
  defaultColumnOptions?: ColumnOptionType<RowData>;
  /**
   * The columns configuration.
   */
  columns?: ColumnsType<RowData>[];
  /**
   * The default sorting state. (Uncontrolled)
   */
  defaultSorting?: SortingType;
  /**
   * If `true`, the loading state is displayed.
   */
  loading?: boolean;
  /**
   * Sorting state. (Controlled)
   */
  sorting?: SortingType;
  /**
   * The localization strings.
   */
  text?: any;
  /**
   * If `true`, the pagination is displayed. Defaults to false.
   */
  pagination?: boolean;
  /**
   * The initial page to be displayed. Defaults to 0.
   */
  paginationPage?: number;
  /**
   * The initial rows per page size. Defaults to 50. Must be one of the paginationPageSize options.
   */
  paginationPageSize?: 10 | 25 | 50 | 100 | 250 | 500 | number;
  /**
   * The possible pagination size options to be selected by the user. Defaults to [10, 25, 50, 100, 250, 500].
   */
  paginationRowsPerPageOptions?: number[];
  /**
   * Callback fired when the user change the column sort.
   *
   * @param {object} event The event source of the callback.
   * @param {SortingType} value The new sorting value.
   */
  onSortingChange?: (event: React.ChangeEvent<{}>, value: SortingType) => void;
  /**
   * Callback fired when the user change the rows per page.
   *
   * @param {object} event The event source of the callback.
   * @param {number} value The new rows per page value.
   */
  onRowsPerPageChange?: (event: React.ChangeEvent<{}>, value: number) => void;
  /**
   * Callback fired when the user change the rows per page.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The new page.
   */
  onPageChange?: (event: React.ChangeEvent<{}>, page: number) => void;
  /**
   * The data record array to be rendered.
   */
  rowsData?: RowData[];
}

export type DataGridClassKey = 'root';

export default function DataGrid<RowData extends object>(props: DataGridProps<RowData>): JSX.Element;