import React from 'react';
import { numberWithCommas } from '../../../../helper/OsLeagueSettingHelper';
import { CellProps } from '../../../../typing/tableType';

const MaxBetCell = (props: CellProps): JSX.Element => {
  const { dataSource, rowIndex } = props;
  const { maxBetHDP, maxBetOU } = dataSource[rowIndex];
  return (
    <div className='maxbet-cell'>
      <span className='hdp-maxbet'>
        {maxBetHDP && `HDP: ${numberWithCommas(maxBetHDP)}`}
      </span>
      <span className='ou-maxbet'>
        {maxBetOU && `OU:${numberWithCommas(maxBetOU)}`}
      </span>
    </div>
  );
};

export default MaxBetCell;
