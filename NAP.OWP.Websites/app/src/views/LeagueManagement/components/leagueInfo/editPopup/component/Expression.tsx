import React from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select-ts';
import MaxbetConst from '../../../../constants/MaxbetConst';
import { TConditions, TExpression, TOption } from '../EditType';
import { handleUpdateRounds } from '../slice/editSettingSlice';

interface ExpressionProps {
  item: TExpression;
  index: number;
  hasWrite: boolean;
  inputKey: keyof TConditions;
}

const Expression: React.FC<ExpressionProps> = ({ item, index, hasWrite = true, inputKey }) => {
  const dispatch = useDispatch();

  const handleChangeExpression = (selectedOption: TOption | null) => {
    dispatch(
      handleUpdateRounds({
        property: inputKey,
        key: 'type',
        value: selectedOption!.value,
        index
      })
    );
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
