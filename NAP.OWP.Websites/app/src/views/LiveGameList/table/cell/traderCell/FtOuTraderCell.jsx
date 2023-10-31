import React from 'react';
import MaxbetInfo from '../../../component/MaxbetInfo';

const FtHdpTraderCell = ({ dataSource, rowSpan, rowIndex }) => {
  const { MatchSetting, Assignment } = dataSource[rowIndex];
  const { OverUnder } = MatchSetting;

  return (
    <>
      <MaxbetInfo
        name='OU'
        maxbet={OverUnder}
        traders={Assignment.OverUnder}
        others={Assignment.OverUnderOthers}
        rowSpan={rowSpan}
      />
    </>
  );
};

export default FtHdpTraderCell;
