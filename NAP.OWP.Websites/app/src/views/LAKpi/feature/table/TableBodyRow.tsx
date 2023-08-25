import React, { Fragment } from 'react';
import { DataSource } from '../type/TableType.native';
import { keyOfDataSource } from './TableConst.json';
import { uniqueId } from 'lodash';

type TableBodyRowProps = {
  dataSource: DataSource;
  rowIndex: number;
};

const TableBodyRow = (props: TableBodyRowProps) => {
  const { dataSource, rowIndex } = props;
  return (
    <tr>
      <td>{rowIndex + 1}</td>
      {keyOfDataSource.map(x => (
        <Fragment key={uniqueId()}>
          <td>{dataSource[x as keyof DataSource]}</td>
        </Fragment>
      ))}
    </tr>
  );
};
export default TableBodyRow;
