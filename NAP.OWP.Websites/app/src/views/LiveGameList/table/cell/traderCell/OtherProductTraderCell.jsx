import React from 'react';
import MaxbetInfo from '../../../component/MaxbetInfo';

const OtherProductTraderCell = ({ name, maxBet, traders, others, rowSpan }) => {
  return (
    <>
      <MaxbetInfo
        name={name}
        maxbet={maxBet}
        traders={traders}
        others={others}
        rowSpan={rowSpan}
      />
    </>
  );
};

export default OtherProductTraderCell;
