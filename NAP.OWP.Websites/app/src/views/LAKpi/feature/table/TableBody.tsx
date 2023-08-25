import React from 'react';
import { DataSource } from '../type/TableType.native';
import TableBodyRow from './TableBodyRow';
type TableBodyProps = {
  dataSource: Array<DataSource>;
};
const TableBody = (props: TableBodyProps) => {
  const { dataSource } = props;
  const renderRow = (dataSource: DataSource[]) =>
    dataSource.map((item: DataSource, index) => (
      <TableBodyRow
        key={`${item.userName}-${index}`}
        dataSource={item}
        rowIndex={index}
      />
    ));

  return <>{renderRow(dataSource)}</>;
};

export default TableBody;
