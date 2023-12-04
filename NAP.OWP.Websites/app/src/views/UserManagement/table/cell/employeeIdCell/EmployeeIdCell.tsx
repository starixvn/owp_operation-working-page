import React from 'react';
import CustomInput from '../../../component/CustomInput';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';

type Props = {
  dataSource: Array<TUserInfo>;
  rowIndex: number;
};

const EmployeeIdCell = ({ dataSource, rowIndex }: Props) => {
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
