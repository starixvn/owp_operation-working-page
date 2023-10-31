import React from 'react';
import MaxbetInfo from '../../../component/MaxbetInfo';

const FtHdpTraderCell = ({ dataSource, rowSpan, rowIndex }) => {
  const { MatchSetting, Assignment } = dataSource[rowIndex];
  const { Handicap } = MatchSetting;

  return (
    <>
      <MaxbetInfo
        name='HDP'
        maxbet={Handicap}
        traders={Assignment.Handicap}
        others={Assignment.HandicapOthers}
        rowSpan={rowSpan}
      />
    </>
  );
};

export default FtHdpTraderCell;
