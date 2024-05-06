import React from 'react';
import { ACTION_DIVISION, ACTION_ROUND, ACTION_TVLIST } from '../../../../constants/action-type';
import { TExpression, TProps } from '../EditType';
import CommonTextArea from '../component/CommonTextArea';
import RowsExpression from '../component/RowsExpression';
import { convertResponseToCondition } from '../helper/helper';

const Condition: React.FC<TProps> = ({ data, updateSetting }) => {
  const rounds = convertResponseToCondition(data.round);
  const divisions = convertResponseToCondition(data.division);
  const iptvs = convertResponseToCondition(data.ipTv);

  const renderRoundList = (rounds: TExpression[]) => (
    <RowsExpression
      items={rounds}
      title='Round'
      inputKey={'round'}
      updateSetting={updateSetting}
    />
  );

  const renderDivisionList = (divisions: TExpression[]) => (
    <RowsExpression
      items={divisions}
      title='Division'
      inputKey={'division'}
      updateSetting={updateSetting}
    />
  );

  const renderRemark = (remark: string) => (
    <>
      <div className='content'>
        <div className='left'>Remark</div>
        <CommonTextArea
          value={remark}
          inputKey={'remark'}
          updateObject={updateSetting}
        />
      </div>
    </>
  );

  const renderIPTVList = (iptvs: TExpression[]) => (
    <RowsExpression
      items={iptvs}
      inputKey={'ipTv'}
      updateSetting={updateSetting}
    />
  );

  const renderTV = (tv: boolean, hasIpTv: boolean, iptv: TExpression[]) => (
    <>
      <div className='content'>
        <div className='left'>TV</div>
        <div className='right'>
          <label>
            <input
              type='checkbox'
              checked={tv}
            //onChange={handleCheckboxChange}
            />
            TV (check in TV list)
          </label>
          <div className='iptv'>
            <label>
              <input
                type='checkbox'
                checked={hasIpTv}
              //onChange={handleCheckboxChange}
              />
              IPTV
            </label>
            {renderIPTVList(iptv)}
          </div>
        </div>
      </div>
    </>
  );


  return (
    <div className='list'>
      <div className='title'>Condition</div>
      {renderTV(data.condition.hasTv, data.condition.hasIpTv, iptvs)}
      {renderRoundList(rounds)}
      {renderDivisionList(divisions)}
      {renderRemark(data.condition.remark)}
    </div>
  );
};

export default Condition;