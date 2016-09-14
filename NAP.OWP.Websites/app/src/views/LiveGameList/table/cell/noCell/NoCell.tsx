import React from 'react';
import { CellProps } from '../../../type/TableType';
import { UncontrolledTooltip } from 'reactstrap';
const NoCell = ({ rowIndex, dataSource }: CellProps): JSX.Element => {
  const { MatchNo, MatchStatus } = dataSource[rowIndex];

  const renderIcon = () => {
    const classNames = {
      'Live': 'live',
      'In-play': 'inplay',
      'Completed': 'completed',
      'Cancel': 'cancelled',
      'Postponed': 'postponed',
      'Suspended': 'suspended'
    };

    return (
      <>
        <span
          className={`badge-label ${classNames[MatchStatus]} `}
          style={{ display: 'none' }}>
          {MatchStatus}
        </span>
        {MatchStatus === 'Live' ? (
          <i className={classNames[MatchStatus]}></i>
        ) : (
          <>
            <i
              className={`icon-status icon-${classNames[MatchStatus]}`}
              id={`link-match-status-${rowIndex}`}></i>
            <UncontrolledTooltip
              placement='bottom'
              target={`link-match-status-${rowIndex}`}>
              {MatchStatus}
            </UncontrolledTooltip>
          </>
        )}
      </>
    );
  };

  return (
    <div className='no-cell'>
      {MatchNo && <span>{MatchNo}</span>}
      {renderIcon()}
    </div>
  );
};

export default NoCell;
