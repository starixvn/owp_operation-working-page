import React from 'react';
import KOTimeToday from '../../today/KOTimeToday';
import { CellProps } from '../../type/TTaskListTable';
import KOTimeYesterday from '../../yesterday/KOTimeYesterday';

const KOTimeCellFactory = (props: CellProps) => {
  const { dataSource, rowIndex } = props;
  console.log(dataSource);
  return dataSource.IsTodayEvent ? (
    <KOTimeToday dataSource={dataSource} rowIndex={rowIndex} />
  ) : (
    <KOTimeYesterday dataSource={dataSource} rowIndex={rowIndex} />
  );
};

export default KOTimeCellFactory;
