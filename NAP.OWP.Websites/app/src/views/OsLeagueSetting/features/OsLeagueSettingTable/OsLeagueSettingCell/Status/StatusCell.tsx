import React from 'react';
import { CellProps } from '../../../../typing/tableType';
import { UncontrolledTooltip } from 'reactstrap';
import { activeIcon, inactiveIcon } from '../../TableSchema.json';

const StatusCell = (props: CellProps): JSX.Element => {
  const { dataSource, rowIndex } = props;
  const { isActive, leagueSettingId } = dataSource[rowIndex];

  const getIconStatus = () => {
    return isActive ? (
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path d={activeIcon} fill='#1E88E5' />
      </svg>
    ) : (
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path d={inactiveIcon} fill='#AB383B' />
      </svg>
    );
  };
  return (
    <div className='status-cell' id={`status-${leagueSettingId}`}>
      {getIconStatus()}
      <UncontrolledTooltip
        placement='right'
        target={`status-${leagueSettingId}`}>
        {isActive ? 'Active' : 'Inactive'}
      </UncontrolledTooltip>
    </div>
  );
};

export default StatusCell;
