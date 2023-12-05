import React from 'react';
import CustomInput from '../../../component/CustomInput';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';

type Props = {
  dataSource: Array<TUserInfo>;
  rowIndex: number;
};

const SkypeCell = ({ dataSource, rowIndex }: Props) => {
  const { updateValue } = store.getState();

  const handleOnChange = (newValue: string) => {
    updateValue(newValue, 'skype', rowIndex);
  };

  const updateInfo = () => {
    //api
  };

  return (
    <CustomInput
      value={dataSource[rowIndex].skype}
      handleOnChange={handleOnChange}
      handleOnBlur={updateInfo}
    />
  );
};

export default SkypeCell;
