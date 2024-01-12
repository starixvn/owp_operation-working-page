import React from 'react';
import { TCellModel } from '../../type/type';
import TimeOfMatch from '../../../Shared/LiveGameShared/TimeOfMatch';

const KOTimeCell = (props: TCellModel) => {
  const { rowIndex, dataSource } = props;
  const {
    otherTime,
    otherTimeStr,
    kickOffTime,
    kickOffTimeStr,
    infoSiteTime,
    infoSiteTimeDisplay
  } = dataSource[rowIndex];
  const propsTime = {
    KickOffTimeDisplay: kickOffTime,
    KickOffTime: kickOffTimeStr,
    InfoSiteTimeDisplay: infoSiteTimeDisplay,
    InfoSiteTime: infoSiteTime,
    OtherTimeDisplay: otherTime,
    OtherTime: otherTimeStr,
    rowIndex
  };
  return (
    <div className='kickoff-cell'>
      <span className='time-cell'>
        <TimeOfMatch {...propsTime} />
      </span>
    </div>
  );
};

export default KOTimeCell;