import React, { useRef } from 'react';
import { CellProps } from '../../../type/TableType';
import { UncontrolledTooltip } from 'reactstrap';

const KOTimeCell = ({ rowIndex, dataSource }: CellProps): JSX.Element => {
  const ref = useRef(null);
  const { KickOffTimeDisplay, OtherTime, IsPES, IsFIFA } = dataSource[rowIndex];
  return (
    <div className='ko-time-cell'>
      <p>{KickOffTimeDisplay}</p>
      {OtherTime && (
        <p>
          <span className='badge-label other-time'>{OtherTime}</span>
        </p>
      )}
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
