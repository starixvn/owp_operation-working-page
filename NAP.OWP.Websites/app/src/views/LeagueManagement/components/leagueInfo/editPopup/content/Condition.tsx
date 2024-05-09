import React, { useState } from 'react';
import { TExpression, TProps } from '../EditType';
import CommonTextArea from '../component/CommonTextArea';
import RowsExpression from '../component/RowsExpression';
import { convertResponseToCondition } from '../helper/helper';
import { useAppDispatch } from '../../app/hooks';
import { updateObject } from '../slice/editSettingSlice';

const Condition: React.FC<TProps> = ({ data }) => {
  const { condition, remark } = data;
  const { round, division, ipTv, hasTv, hasIpTv } = condition;
  const [checkedTV, setCheckedTV] = useState<boolean>(hasTv);
  const [checkedIPTV, setCheckedIPTV] = useState(hasIpTv);
  const dispatch = useAppDispatch();

  const rounds = convertResponseToCondition(round);
  const divisions = convertResponseToCondition(division);
  const iptvs = convertResponseToCondition(ipTv);

  const handleOnChangeTV = (_: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateObject({ inputKey: 'hasTv', newValue: !checkedTV }));
    setCheckedTV(!checkedTV);
  };

  const handleOnChangeIPTV = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateObject({ inputKey: 'hasIpTv', newValue: !checkedIPTV }));
    setCheckedIPTV(!checkedIPTV);

  };

  const renderRoundList = (rounds: TExpression[]) => (
    <RowsExpression
      items={rounds}
      title='Round'
      inputKey={'round'}
    />
  );

  const renderDivisionList = (divisions: TExpression[]) => (
    <RowsExpression
      items={divisions}
      title='Division'
      inputKey={'division'}
    />
  );

  const renderRemark = (remark: string) => (
    <>
      <div className='content'>
        <div className='left'>Remark</div>
        <CommonTextArea
          value={remark}
          inputKey={'remark'}
        />
      </div>
    </>
  );

  const renderIPTVList = (iptvs: TExpression[]) => (
    <RowsExpression
      items={iptvs}
      inputKey={'ipTv'}
    />
  );

  const renderTV = () => (
    <>
      <div className='content'>
        <div className='left'>TV</div>
        <div className='right'>
          <label>
            <input
              type='checkbox'
              checked={checkedTV}
              onChange={handleOnChangeTV}
            />
            TV (check in TV list)
          </label>
          <div className='iptv'>
            <label>
              <input
                type='checkbox'
                checked={checkedIPTV}
                onChange={handleOnChangeIPTV}
              />
              IPTV
            </label>
            {renderIPTVList(iptvs)}
          </div>
        </div>
      </div>
    </>
  );


  return (
    <div className='list'>
      <div className='title'>Condition</div>
      {renderTV()}
      {renderRoundList(rounds)}
      {renderDivisionList(divisions)}
      {renderRemark(remark)}
    </div>
  );
};

export default Condition;