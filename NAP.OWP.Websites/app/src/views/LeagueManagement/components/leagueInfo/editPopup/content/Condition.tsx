import React from 'react';
import RoundList from '../condition/RoundList';
import DivisionList from '../condition/DivisionList';
import { TProps } from '../EditType';
import Converter from '../../../../../Shared/Converter';
import RowsExpression from '../component/RowsExpression';
import { ACTION_DIVISION, ACTION_ROUND } from '../../../../constants/action-type';

const Condition: React.FC<TProps> = ({ data }) => {
  const rounds = Converter.convertResponseToRound(data.condition.round);
  const divisions = Converter.convertResponseToRound(data.condition.division);

  const renderRoundList = (rounds) => (
    <RowsExpression
      items={rounds}
      title='Round'
      actionType={ACTION_ROUND}
    />
  );

  const renderDivisionList = (divisions) => (
    <RowsExpression
      items={divisions}
      title='Division'
      actionType={ACTION_DIVISION}
    />
  );

  const renderRemark = (remark) => (
    <>
      <div className='content'>
        <div className='label'>Remark</div>

        <textarea
          className='remark'
          value={remark}
        />
      </div>
    </>
  );

  return (
    <div className='list'>
      <div className='title'>Condition</div>
      {renderRoundList(rounds)}
      {renderDivisionList(divisions)}
      {renderRemark(data.condition.remark)}
    </div>
  );
};

export default Condition;