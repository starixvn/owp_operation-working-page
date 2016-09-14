import React from 'react';
import { KOTimeCellProps, PesOrFiFa } from '../type/TTaskListTable';
import FlagFactory from '../features/factory/FlagFactory';
import KOTime from '../features/component/KOTime';

const KOTimeToday = (props: KOTimeCellProps) => {
  const { dataSource } = props;
  const { rowIndex } = props;
  const { IsFIFA, IsPES, EventDateDisplay } = dataSource;

  const flagsProps: PesOrFiFa = {
    IsFIFA,
    IsPES,
    rowIndex
  };
  return (
    <KOTime
      eventDateElement={
        <span className='badge-label cancelled'>{EventDateDisplay}</span>
      }
      rowIndex={rowIndex}
      dataSource={dataSource}
      flagElement={<FlagFactory {...flagsProps} />}
    />
  );
};

export default KOTimeToday;
