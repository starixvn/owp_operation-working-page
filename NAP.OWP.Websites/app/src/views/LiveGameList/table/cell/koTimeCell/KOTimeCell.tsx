import React, { useRef } from 'react';
import { CellProps } from '../../../type/TableType';
import { UncontrolledTooltip } from 'reactstrap';
import TimeOfMatch from '../../../../Shared/LiveGameShared/TimeOfMatch';

const KOTimeCell = ({ rowIndex, dataSource }: CellProps): JSX.Element => {
  const ref = useRef(null);
  const {
    KickOffTimeDisplay,
    KickOffTime,
    OtherTimeDisplay,
    OtherTime,
    InfoSiteTimeDisplay,
    InfoSiteTime,
    IsPES,
    IsFIFA
  } = dataSource[rowIndex];

  const propsTime = {
    KickOffTimeDisplay,
    KickOffTime,
    OtherTimeDisplay,
    OtherTime,
    InfoSiteTimeDisplay,
    InfoSiteTime,
    rowIndex
  };

  return (
    <div className='ko-time-cell'>
      <TimeOfMatch {...propsTime} />
      {IsPES && (
        <>
          <i className='icon-match icon-pes' original-title='PES' ref={ref}></i>
          <UncontrolledTooltip placement='bottom' target={ref}>
            PES
          </UncontrolledTooltip>
        </>
      )}
      {IsFIFA && (
        <>
          <i
            className='icon-match icon-fifa'
            ref={ref}
            original-title='FIFA'></i>
          <UncontrolledTooltip placement='bottom' target={ref}>
            FIFA
          </UncontrolledTooltip>
        </>
      )}
    </div>
  );
};

export default KOTimeCell;
