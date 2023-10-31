import React from 'react';
import MaxbetInfo from '../../../component/MaxbetInfo';

const FirstHalfOuTraderCell = ({ dataSource, rowSpan, rowIndex }) => {
  const { MatchSetting, Assignment } = dataSource[rowIndex];
  const { OverUnder1st } = MatchSetting;

  return (
    <>
      <MaxbetInfo
        name={null}
        maxbet={OverUnder1st}
        traders={Assignment.OverUnder1st}
        others={Assignment.OverUnder1stOthers}
        rowSpan={rowSpan}
      />
    </>
  );
};

export default FirstHalfOuTraderCell;
