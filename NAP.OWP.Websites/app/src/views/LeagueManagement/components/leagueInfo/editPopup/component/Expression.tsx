import React from 'react';
import Select from 'react-select-ts';
import MaxbetConst from '../../../../constants/MaxbetConst';
import { TExpression, TOption } from '../EditType';

interface ExpressionProps {
  item: TExpression;
  index: number;
  hasWrite: boolean;
  updateSetting: Function;
}

const Expression: React.FC<ExpressionProps> = ({ item, index, hasWrite = true, updateSetting }) => {
  const { expression } = item;

  const handleChangeExpression = (selectedOption: TOption | null) => {
    //expression.value !== selectedOption?.value && updateSetting('', selectedOption?.value);
    expression.value !== selectedOption?.value && updateSetting('', selectedOption?.value);
  };

  return (
    <Select
      isDisabled={!hasWrite}
      options={MaxbetConst.expressionOption}
      defaultValue={item.expression}
      className='basic-multi-select'
      classNamePrefix='select'
      name='list-condition'
      onChange={handleChangeExpression}
    />
  );
};

export default Expression;
