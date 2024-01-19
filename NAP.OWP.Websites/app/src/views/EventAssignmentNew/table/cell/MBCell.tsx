import React from 'react';
import { TCellModel } from '../../type/type';
import ReactTooltip from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid';

const MBCell = (props: TCellModel) => {
  const { dataSource, rowIndex } = props;
  const { OWPMatchId, HandicapSetting, OverUnderSetting } =
    dataSource[rowIndex];

  const renderMaxbetSpreadMbc = () => {
    const uuidKey = `${OWPMatchId}_${uuidv4()}`;
    const isDisplayHDPSetting =
      HandicapSetting?.spreadToDisplay || OverUnderSetting?.spreadToDisplay;
    const isHDPSpreadExisting = HandicapSetting?.spreadToDisplay;

    return (
      <div>
        <span data-for={uuidKey} data-tip='Maxbet/Spread of MBC'>
          {HandicapSetting?.MaxBetToDisplay}
          {isDisplayHDPSetting && (
            <span>({HandicapSetting?.spreadToDisplay}</span>
          )}
          {OverUnderSetting?.spreadToDisplay && (
            <>
              {isHDPSpreadExisting && <span>-</span>}
              {OverUnderSetting.spreadToDisplay}
            </>
          )}
          {isDisplayHDPSetting && <span>)</span>}
        </span>
        <ReactTooltip place='right' id={uuidKey} effect='solid' />
      </div>
    );
  };

  return <div className='maxbet-cell'>{renderMaxbetSpreadMbc()}</div>;
};

export default MBCell;
