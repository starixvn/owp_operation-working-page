import React from 'react';
import CustomInput from '../../../component/CustomInput';
import { CellProps } from '../../../type';
import store from '../../../app/useStoreNative';

const EmployeeIdCell = ({ dataSource, rowIndex }: CellProps) => {
  const { updateValue } = store.getState();

  const handleOnChange = (newValue: string) => {
    updateValue(newValue, 'employeeId', rowIndex);
  };

  const updateInfo = () => {
    //api
  };

  return (
    <CustomInput
      value={dataSource[rowIndex].employeeId}
      handleOnChange={handleOnChange}
      handleOnBlur={updateInfo}
    />
  );
};

export default EmployeeIdCell;
