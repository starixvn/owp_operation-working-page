import React from 'react';
import { CellProps } from '../../../type';
import CustomInput from '../../../component/CustomInput';
import store from '../../../app/useStoreNative';

const NickNameCell = ({ dataSource, rowIndex }: CellProps) => {
  const { updateValue } = store.getState();

  const handleOnChange = (newValue: string) => {
    updateValue(newValue, 'nickName', rowIndex);
  };

  const updateInfo = () => {
    //api
  };

  return (
    <CustomInput
      value={dataSource[rowIndex]?.nickName}
      handleOnChange={handleOnChange}
      handleOnBlur={updateInfo}
    />
  );
};

export default NickNameCell;
