import React from 'react';
import Chance from 'chance';
import DataGrid, { DataProviderType } from '@material-ui/lab/DataGrid';

const chance = new Chance();

const data = Array.from(new Array(100)).map(() => ({
  name: chance.name(),
  phone: chance.phone(),
  address: chance.address(),
  country: chance.country(),
  rating: chance.integer({ min: 1, max: 5 }),
}));

export default function LoadingPagination() {
  const [rowsData, setRowData] = React.useState(data);

  const dataProvider: DataProviderType = React.useMemo(() => ({
    getList: params => new Promise(resolve => {
      const newRowsData = [...rowsData];
      resolve(newRowsData.splice(params.pagination.paginationPage * params.pagination.paginationPageSize, params.pagination.paginationPageSize));
    }),
    loadMoreRows: (paginationKey: string) => new Promise(resolve => {
      setRowData(prevData => [...prevData, ...data]);
      resolve('Next Key');
    })
  }), [rowsData]);
  return (
    <DataGrid
      dataProvider={dataProvider}
      style={{ maxHeight: 300, width: '100%' }}
      columns={
        [
          { field: 'name', label: 'Name' },
          { field: 'rating', label: 'Rating' },
          { field: 'address', label: 'Address' },
          { field: 'phone', label: 'Phone' },
          { field: 'country', label: 'Country' },
        ]}
      rowsData={rowsData}
      defaultColumnOptions={{ resizable: true }}
    />
  );
}
