import React from 'react';
import { DataSource } from '../type/TableType.native';
type TableBodyProps = {
  dataSource: Array<DataSource>;
};
const TableBody = (props: TableBodyProps) => {
  const { dataSource } = props;
  const renderRow = (dataSource: DataSource[]) => {
    return dataSource.map((item: DataSource, index) => (
      <tr key={`${item.userName}-${index}`}>
        <td>{index + 1}</td>
        <td>{item.userName}</td>
        <td>{item.progress}</td>
        <td>{item.target}</td>
        <td>{item.virtualMatchesGap}</td>
        <td>{item.multipleMatchesGap}</td>
        <td>{item.specialProductsGap}</td>
        <td>{item.majorLeaguesGap}</td>
        <td>{item.multipleProductGap}</td>
        <td>{item.multipleMatchesAchieved}</td>
        <td>{item.virtualMatchesAchieved}</td>
        <td>{item.specialProductsAchieved}</td>
        <td>{item.majorLeaguesAchieved}</td>
        <td>{item.multipleProductAchieved}</td>
        <td>{item.reward}</td>
      </tr>
    ));
  };

  return <>{renderRow(dataSource)}</>;
};

export default TableBody;
