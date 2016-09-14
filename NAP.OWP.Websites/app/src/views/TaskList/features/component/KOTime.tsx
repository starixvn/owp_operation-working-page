import React from 'react';
import { KOTimeCellProps } from '../../type/TTaskListTable';

const KOTime = (props: KOTimeCellProps) => {
  const { flagElement, eventDateElement, dataSource } = props;
  const { KickOffTimeDisplay, OtherTimeDisplay } = dataSource;

  return (
    <>
      <div className='ko-time-cell'>
        {eventDateElement}
        <p>{KickOffTimeDisplay}</p>
        {OtherTimeDisplay && (
          <p>
            <span className='badge-label other-time'>{OtherTimeDisplay}</span>
          </p>
        )}
        {flagElement}
      </div>
    </>
  );
};

export default KOTime;
