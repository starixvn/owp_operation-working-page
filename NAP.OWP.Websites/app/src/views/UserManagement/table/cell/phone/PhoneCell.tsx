import React from 'react';
import CustomInput from '../../../component/CustomInput';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';

type Props = {
  dataSource: Array<TUserInfo>;
  rowIndex: number;
};

const PhoneCell = ({ dataSource, rowIndex }: Props) => {
  const { updateValue } = store.getState();

  const handleOnChange = (newValue: string) => {
    updateValue(newValue, 'phone', rowIndex);
  };

  const updateInfo = () => {
    //api
  };

  return (
    <CustomInput
      value={dataSource[rowIndex].phone}
      handleOnChange={handleOnChange}
      handleOnBlur={updateInfo}
    />
  );
};

export default PhoneCell;
