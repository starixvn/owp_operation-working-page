import React from 'react';
import { TCellModel } from '../../type/type';
import ReactTooltip from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid';

const MBCell = (props: TCellModel) => {
  const { dataSource, rowIndex } = props;
  const { owpMatchId, handicapSetting, overUnderSetting } = dataSource[rowIndex];

  const renderMaxbetSpreadMbc = () => {
    const uuidKey = `${owpMatchId}_${uuidv4()}`;
    const isDisplayHDPSetting = (
      handicapSetting?.spreadToDisplay ||
      overUnderSetting?.spreadToDisplay
    );
    const isHDPSpreadExisting =
      handicapSetting?.spreadToDisplay;

    return (
      <div>
        <span data-for={uuidKey} data-tip='Maxbet/Spread of MBC'>
          {handicapSetting?.maxBetToDisplay}
          {isDisplayHDPSetting && (
            <span>({handicapSetting?.spreadToDisplay}</span>
          )}
          {overUnderSetting?.spreadToDisplay && (
            <>
              {isHDPSpreadExisting && <span>-</span>}
              {overUnderSetting.spreadToDisplay}
            </>
          )}
          {isDisplayHDPSetting && <span>)</span>}
        </span>
        <ReactTooltip place='right' id={uuidKey} effect='solid' />
      </div>
    );
  };

  return (
    <div className='maxbet-cell'>
      {renderMaxbetSpreadMbc()}
    </div>
  );
};

export default MBCell;