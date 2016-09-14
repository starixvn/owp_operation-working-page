import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { CellProps } from '../../../type/TTaskListTable';

const NoCell = ({ rowIndex, dataSource }: CellProps) => {
  const { MatchNo, MatchStatus } = dataSource;
  const renderIcon = () => {
    const classNames: { [key: string]: string } = {
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
