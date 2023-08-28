import React from 'react';
import { KOTimeCellProps, PesOrFiFa } from '../type/TTaskListTable';
import FlagFactory from '../features/factory/FlagFactory';
import KOTime from '../features/component/KOTime';

const KOTimeToday = (props: KOTimeCellProps) => {
  const { dataSource, rowIndex } = props;
  const { IsFIFA, IsPESOther, IsPES23 } = dataSource;

  const flagsProps: PesOrFiFa = {
    IsFIFA,
    IsPES23,
    IsPESOther,
    rowIndex
  };

  return (
    <>
      <KOTime
        rowIndex={rowIndex}
        dataSource={dataSource}
        flagElement={<FlagFactory {...flagsProps} />}
      />
    </>
  );
};

export default KOTimeToday;
