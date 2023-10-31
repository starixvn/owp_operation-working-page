import React from 'react';
import MaxbetInfo from '../../../component/MaxbetInfo';

const FirstHalfHdpTraderCell = ({ dataSource, rowSpan, rowIndex }) => {
  const { MatchSetting, Assignment } = dataSource[rowIndex];
  const { Handicap1st } = MatchSetting;

  return (
    <>
      <MaxbetInfo
        name={null}
        maxbet={Handicap1st}
        traders={Assignment.Handicap1st}
        others={Assignment.Handicap1stOthers}
        rowSpan={rowSpan}
      />
    </>
  );
};

export default FirstHalfHdpTraderCell;
