import React from 'react';
import { CellProps } from '../../../type';
import CustomInput from '../../../component/CustomInput';
import store from '../../../app/useStoreNative';
const FullNameCell = ({ dataSource, rowIndex }: CellProps) => {
  const { updateValue } = store.getState();

  const handleOnChange = (newValue: string) => {
    updateValue(newValue, 'fullName', rowIndex);
  };

  const updateInfo = () => {
    //api
  };

  return (
    <CustomInput
      value={dataSource[rowIndex].fullName}
      handleOnChange={handleOnChange}
      handleOnBlur={updateInfo}
    />
  );
};

export default FullNameCell;
