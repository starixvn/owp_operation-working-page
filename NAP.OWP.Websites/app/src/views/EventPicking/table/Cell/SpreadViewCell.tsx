import React from 'react';
import Utils from '../../../Shared/Utils';

const { convertSpreadToPercent } = Utils;

// TODO:
const SpreadViewCell = ({ spread }: { spread: number | string | undefined }) => {
  return (
    <>
      {spread ? (
        <div className='spread-cell'>
          {convertSpreadToPercent(spread)}
        </div>
      ) : (
        <a className='spread__check' href='http://google.com'>
          Check
        </a>
      )}

    </>
  );
};

export default SpreadViewCell;
