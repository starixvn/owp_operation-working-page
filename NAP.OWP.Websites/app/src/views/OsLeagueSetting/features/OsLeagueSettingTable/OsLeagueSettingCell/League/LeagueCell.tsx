import React from 'react';
import useStore from '../../../../app/store';
import { CellProps } from '../../../../typing/tableType';

const LeagueCell = (props: CellProps): JSX.Element => {
  const { setPopupType, queryLeagueDetail } = useStore(
    state => state
  );

  const { dataSource, rowIndex } = props;
  const { leagueSettingId, osLeagueName } = dataSource[rowIndex];

  const handleOpenDetailPopup = () => {
    queryLeagueDetail(leagueSettingId);
    setPopupType('edit');
  };
  return (
    <div className='league-cell' onClick={handleOpenDetailPopup}>
      <span>{osLeagueName}</span>
    </div>
  );
};

export default LeagueCell;
