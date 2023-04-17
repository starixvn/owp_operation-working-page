import React from 'react';
import { KOTimeCellProps } from '../../type/TTaskListTable';
import { isEqual } from 'lodash';

const KOTime = (props: KOTimeCellProps) => {
  const { flagElement, eventDateElement, dataSource } = props;
  const { KickOffTimeDisplay, InfoSiteTimeDisplay, OtherTimeDisplay } =
    dataSource;

  const conditionToShowInfoSiteTime =
    !isEqual(KickOffTimeDisplay, InfoSiteTimeDisplay) &&
    !isEqual(OtherTimeDisplay, InfoSiteTimeDisplay);
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
        {conditionToShowInfoSiteTime && (
          <p>
            <span className='badge-label info-site-time'>
              {InfoSiteTimeDisplay}
            </span>
          </p>
        )}
        {flagElement}
      </div>
    </>
  );
};

export default KOTime;
